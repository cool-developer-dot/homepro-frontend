"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type User = {
  id: string;
  email: string;
  fullName?: string;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (payload: { email: string; password: string }) => Promise<void>;
  register: (payload: { fullName: string; email: string; password: string; confirmPassword: string }) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function getAuthApiBaseUrl() {
  const envUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (envUrl) return envUrl;

  // Local dev convenience.
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") return "http://localhost:4000";
  }

  return "https://homepro-backend-ddeh.onrender.com";
}

const AUTH_API_BASE = getAuthApiBaseUrl().replace(/\/$/, "");

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const getCurrentUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${AUTH_API_BASE}/api/auth/me`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        setUser(null);
        return;
      }
      const data = (await res.json()) as { user: User };
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void getCurrentUser();
  }, [getCurrentUser]);

  const login = useCallback(async (payload: { email: string; password: string }) => {
    setError(null);
    const res = await fetch(`${AUTH_API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    if (!res.ok) {
      const data = (await safeJson(res)) as { message?: string } | null;
      throw new Error(data?.message || "Login failed");
    }
    const data = (await res.json()) as { user: User };
    setUser(data.user);
  }, []);

  const register = useCallback(
    async (payload: { fullName: string; email: string; password: string; confirmPassword: string }) => {
      setError(null);
      const res = await fetch(`${AUTH_API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      if (!res.ok) {
        const data = (await safeJson(res)) as { message?: string } | null;
        throw new Error(data?.message || "Registration failed");
      }
      const data = (await res.json()) as { user: User };
      setUser(data.user);
    },
    [],
  );

  const logout = useCallback(async () => {
    setError(null);
    await fetch(`${AUTH_API_BASE}/api/auth/logout`, { method: "POST", credentials: "include" });
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      error,
      login: async (payload) => {
        try {
          await login(payload);
        } catch (e) {
          setError((e as Error).message);
          throw e;
        }
      },
      register: async (payload) => {
        try {
          await register(payload);
        } catch (e) {
          setError((e as Error).message);
          throw e;
        }
      },
      logout,
      getCurrentUser,
      clearError,
    }),
    [user, loading, error, login, register, logout, getCurrentUser, clearError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}

