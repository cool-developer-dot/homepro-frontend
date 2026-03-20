"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import type { ProfileUser } from "@/hooks/useProfile";

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return (first + last).toUpperCase();
}

export default function AvatarUpload({
  profile,
  onUpload,
  loading,
}: {
  profile: ProfileUser;
  onUpload: (file: File) => Promise<void>;
  loading: boolean;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<null | { kind: "success" | "error"; message: string }>(null);

  const initials = useMemo(() => initialsFromName(profile.fullName || profile.email || "User"), [profile.fullName, profile.email]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex items-center gap-4">
          <div className="h-16 w-16 rounded-3xl overflow-hidden ring-1 ring-slate-200 bg-slate-50 grid place-items-center shadow-sm shrink-0">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previewUrl} alt="Avatar preview" className="h-full w-full object-cover" />
            ) : profile.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.avatarUrl} alt="Current avatar" className="h-full w-full object-cover" />
            ) : (
              <span className="text-slate-900 font-extrabold">{initials}</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900">Profile Avatar</p>
            <p className="text-sm text-slate-600 mt-0.5">Upload a professional image (optional).</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Choose Image</span>
          <div className="mt-2 flex items-center gap-3">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setStatus(null);
                  setSelectedFile(file);
                  if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
                  if (file) setPreviewUrl(URL.createObjectURL(file));
                }}
              />
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 h-10 rounded-xl px-4 font-semibold bg-slate-900 text-white hover:bg-slate-800 transition disabled:opacity-60"
                disabled={loading}
              >
                <Upload className="h-4 w-4" />
                Select
              </button>
            </div>
            <p className="text-xs text-slate-500">
              JPG, PNG up to 5MB.
            </p>
          </div>
        </label>
      </div>

      <div className="pt-2">
        <button
          type="button"
          disabled={!selectedFile || loading}
          onClick={async () => {
            if (!selectedFile) return;
            setStatus(null);
            try {
              await onUpload(selectedFile);
              setStatus({ kind: "success", message: "Avatar updated successfully." });
            } catch (e) {
              setStatus({
                kind: "error",
                message: (e as { message?: string })?.message || "Avatar upload failed.",
              });
            }
          }}
          className="w-full h-11 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 transition disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Save avatar
        </button>
      </div>

      {status ? (
        <div
          className={`rounded-xl p-3 text-sm ring-1 ${
            status.kind === "success"
              ? "bg-emerald-50 ring-emerald-200 text-emerald-700"
              : "bg-rose-50 ring-rose-200 text-rose-700"
          }`}
          role="status"
          aria-live="polite"
        >
          {status.message}
        </div>
      ) : null}
    </div>
  );
}

