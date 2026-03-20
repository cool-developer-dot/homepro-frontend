"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import type { ProfileUser } from "@/hooks/useProfile";

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name is too short").max(60, "Full name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || val.replace(/\D/g, "").length >= 10, "Phone number looks too short"),
});

type ProfileValues = z.infer<typeof profileSchema>;

export default function ProfileForm({
  initialValues,
  onSubmit,
  loading,
}: {
  initialValues: ProfileUser;
  onSubmit: (values: ProfileValues) => Promise<void>;
  loading: boolean;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: initialValues.fullName || "",
      email: initialValues.email || "",
      phone: initialValues.phone || "",
    },
  });

  useEffect(() => {
    reset({
      fullName: initialValues.fullName || "",
      email: initialValues.email || "",
      phone: initialValues.phone || "",
    });
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Full Name</label>
          <input
            {...register("fullName")}
            type="text"
            autoComplete="name"
            className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
            placeholder="Jane Doe"
          />
          {errors.fullName && <p className="mt-1 text-xs text-rose-600">{errors.fullName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Email Address</label>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
            placeholder="you@company.com"
          />
          {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700">Phone Number</label>
          <input
            {...register("phone")}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
            placeholder="+1 (555) 012-3456"
          />
          {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading || isSubmitting || !isDirty}
          className="w-full h-11 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading || isSubmitting ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}

