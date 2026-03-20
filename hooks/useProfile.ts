"use client";

import { useCallback, useMemo, useState } from "react";
import { apiRequest } from "@/lib/api-client";

export type ProfileUser = {
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string | null;
};

type UploadAvatarResponse = {
  avatarUrl?: string | null;
};

function fallbackProfileFromAuth(authUser: { fullName?: string; email?: string } | null): ProfileUser {
  return {
    fullName: authUser?.fullName ?? "",
    email: authUser?.email ?? "",
    phone: "",
    avatarUrl: null,
  };
}

function safeLocalGet<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function safeLocalSet<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

async function fileToDataUrl(file: File): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export function useProfile(authUser: { fullName?: string; email?: string } | null) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initial = useMemo(() => fallbackProfileFromAuth(authUser), [authUser]);

  const loadProfile = useCallback(async (): Promise<ProfileUser> => {
    setError(null);
    setLoading(true);
    try {
      // Optional API integration. If endpoint isn't available yet, we fall back to auth data.
      const data = await apiRequest<ProfileUser>("/api/profile/me", { method: "GET" });
      const local = safeLocalGet<Partial<ProfileUser>>("homepro_profile_local");
      return {
        fullName: data.fullName ?? initial.fullName,
        email: data.email ?? initial.email,
        phone: data.phone ?? local?.phone ?? "",
        avatarUrl: data.avatarUrl ?? local?.avatarUrl ?? null,
      };
    } catch (e) {
      const message = (e as { message?: string })?.message || "Unable to load profile.";
      // UI fallback: merge auth values with localStorage so profile editing works instantly.
      setError(null);
      const local = safeLocalGet<Partial<ProfileUser>>("homepro_profile_local");
      return {
        ...initial,
        phone: local?.phone ?? initial.phone ?? "",
        avatarUrl: local?.avatarUrl ?? initial.avatarUrl ?? null,
        fullName: local?.fullName ?? initial.fullName,
        email: local?.email ?? initial.email,
      };
    } finally {
      setLoading(false);
    }
  }, [initial]);

  const updateProfile = useCallback(async (payload: { fullName: string; email: string; phone?: string }) => {
    setError(null);
    setLoading(true);
    try {
      const data = await apiRequest<ProfileUser>("/api/profile/update", {
        method: "PUT",
        body: payload,
      });
      return data;
    } catch (e) {
      // Fallback to localStorage so the UI remains functional before backend is wired.
      const localUpdated: ProfileUser = {
        ...initial,
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone ?? "",
      };
      safeLocalSet("homepro_profile_local", localUpdated);
      return localUpdated;
    } finally {
      setLoading(false);
    }
  }, []);

  const changePassword = useCallback(async (payload: { currentPassword: string; newPassword: string }) => {
    setError(null);
    setLoading(true);
    try {
      await apiRequest<void>("/api/profile/change-password", {
        method: "POST",
        body: payload,
      });
    } catch (e) {
      const message = (e as { message?: string })?.message || "Unable to update password.";
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadAvatar = useCallback(async (file: File): Promise<string | null> => {
    setError(null);
    setLoading(true);
    try {
      const form = new FormData();
      form.append("avatar", file);

      const envUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
      const baseUrl =
        envUrl?.replace(/\/$/, "") ||
        (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
          ? "http://localhost:4000"
          : "https://homepro-backend-ddeh.onrender.com");
      const res = await fetch(`${baseUrl}/api/profile/upload-avatar`, {
        method: "POST",
        body: form,
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const message = (data && (data as { message?: string }).message) || "Avatar upload failed.";
        throw new Error(message);
      }

      const data = (await res.json()) as UploadAvatarResponse;
      return data.avatarUrl ?? null;
    } catch (e) {
      // Fallback: store preview as data URL for local usage.
      const dataUrl = await fileToDataUrl(file);
      const local = safeLocalGet<Partial<ProfileUser>>("homepro_profile_local");
      safeLocalSet("homepro_profile_local", {
        ...(local ?? {}),
        avatarUrl: dataUrl,
      });
      return dataUrl;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    initialProfile: initial,
    loadProfile,
    updateProfile,
    changePassword,
    uploadAvatar,
    clearError: () => setError(null),
  };
}

