"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuthContext } from "@/context/AuthProvider";
import { useProfile, type ProfileUser } from "@/hooks/useProfile";
import ProfileForm from "@/components/profile/ProfileForm";
import PasswordForm from "@/components/profile/PasswordForm";
import AvatarUpload from "@/components/profile/AvatarUpload";
import { CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

export default function ProfilePageClient() {
  const { user: authUser, loading: authLoading, error: authError } = useAuthContext();
  const [profile, setProfile] = useState<ProfileUser | null>(null);

  const {
    loading: profileLoading,
    error: profileError,
    initialProfile,
    loadProfile,
    updateProfile,
    changePassword,
    uploadAvatar,
    clearError,
  } = useProfile(authUser);

  const [success, setSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    if (authLoading) return;
    void (async () => {
      const p = await loadProfile();
      if (!active) return;
      setProfile(p);
    })();
    return () => {
      active = false;
    };
  }, [authLoading, loadProfile]);

  useEffect(() => {
    if (!success && !formError) return;
    const t = window.setTimeout(() => {
      setSuccess(null);
      setFormError(null);
      clearError();
    }, 5000);
    return () => window.clearTimeout(t);
  }, [success, formError, clearError]);

  const safeProfile = profile ?? initialProfile;

  const submitProfile = async (values: { fullName: string; email: string; phone?: string }) => {
    setFormError(null);
    setSuccess(null);
    try {
      const updated = await updateProfile(values);
      setProfile(updated);
      setSuccess("Profile updated successfully.");
    } catch (e) {
      const message = (e as { message?: string })?.message || "Profile update failed.";
      setFormError(message);
    }
  };

  const submitPassword = async (values: { currentPassword: string; newPassword: string }) => {
    setFormError(null);
    setSuccess(null);
    try {
      await changePassword(values);
      setSuccess("Password updated successfully.");
    } catch (e) {
      const message = (e as { message?: string })?.message || "Password update failed.";
      setFormError(message);
      throw e;
    }
  };

  const submitAvatar = async (file: File) => {
    setFormError(null);
    setSuccess(null);
    const avatarUrl = await uploadAvatar(file);
    setProfile((p) => ({
      ...(p ?? safeProfile),
      avatarUrl,
    }));
    setSuccess("Avatar updated successfully.");
  };

  const banner = useMemo(() => {
    if (authError) return { kind: "error" as const, message: authError };
    if (profileError) return { kind: "error" as const, message: profileError };
    if (formError) return { kind: "error" as const, message: formError };
    if (success) return { kind: "success" as const, message: success };
    return null;
  }, [authError, profileError, formError, success]);

  if (authLoading || profileLoading || !profile) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="rounded-3xl bg-white/70 ring-1 ring-slate-200 p-6 sm:p-7 shadow-sm animate-pulse">
          <div className="h-8 w-56 bg-slate-200 rounded" />
          <div className="mt-3 h-4 w-72 bg-slate-200 rounded" />
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              <div className="h-44 bg-slate-200 rounded-2xl" />
              <div className="h-48 bg-slate-200 rounded-2xl" />
            </div>
            <div className="lg:col-span-5 space-y-4">
              <div className="h-72 bg-slate-200 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Profile & Settings
        </h1>
        <p className="mt-2 text-slate-600 leading-7 max-w-2xl">
          Manage your personal information and account security with a clean, secure and premium experience.
        </p>
      </div>

      {banner ? (
        <div
          className={`rounded-2xl ring-1 p-4 shadow-sm ${
            banner.kind === "success"
              ? "bg-emerald-50 ring-emerald-200 text-emerald-800"
              : "bg-rose-50 ring-rose-200 text-rose-700"
          }`}
          role={banner.kind === "success" ? "status" : "alert"}
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/70 grid place-items-center ring-1 ring-black/5">
              {banner.kind === "success" ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-rose-600" />
              )}
            </div>
            <div className="min-w-0">
              <p className="font-semibold">{banner.kind === "success" ? "Success" : "Something went wrong"}</p>
              <p className="text-sm mt-0.5">{banner.message}</p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-white ring-1 ring-slate-200 shadow-sm p-5 sm:p-6">
            <ProfileForm initialValues={safeProfile} onSubmit={submitProfile} loading={profileLoading} />
          </div>

          <div className="rounded-3xl bg-white ring-1 ring-slate-200 shadow-sm p-5 sm:p-6">
            <AvatarUpload profile={safeProfile} onUpload={submitAvatar} loading={profileLoading} />
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl bg-white ring-1 ring-slate-200 shadow-sm p-5 sm:p-6 sticky top-24">
            {profileLoading ? <Loader2 className="h-5 w-5 animate-spin text-slate-500 mx-auto" /> : null}
            <PasswordForm onSubmit={submitPassword} loading={profileLoading} />
          </div>
        </div>
      </div>
    </section>
  );
}

