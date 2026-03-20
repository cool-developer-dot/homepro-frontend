"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
} from "@/lib/auth-schemas";
import { useAuthContext } from "@/context/AuthProvider";

type AuthMode = "login" | "register";

type FormValues = LoginInput | RegisterInput;

type Props = {
  mode: AuthMode;
};

export default function AuthForm({ mode }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const { login, register, loading, error, clearError } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const schema = useMemo(() => (mode === "login" ? loginSchema : registerSchema), [mode]);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (values: FormValues) => {
    clearError();
    try {
      if (mode === "login") {
        await login(values as LoginInput);
        router.push(next ?? "/");
        return;
      }
      await register(values as RegisterInput);
      router.push(next ?? "/");
    } catch {
      // Error state is already handled in AuthProvider; prevent runtime crash overlay.
    }
  };

  const title = mode === "login" ? "Welcome back" : "Create your account";
  const subtitle =
    mode === "login"
      ? "Sign in to manage bookings and connect with top-rated professionals."
      : "Join HomePro to book reliable home services in just a few clicks.";

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl bg-white/95 backdrop-blur-xl ring-1 ring-slate-200 shadow-2xl shadow-slate-900/10 p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-slate-900 text-white grid place-items-center">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            <p className="text-sm text-slate-600 mt-0.5">{subtitle}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {mode === "register" && (
            <Field
              label="Full Name"
              error={(errors as any).fullName?.message as string | undefined}
              input={
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="John Carter"
                  {...formRegister("fullName" as const)}
                  className={inputClass(Boolean((errors as any).fullName))}
                />
              }
            />
          )}

          <Field
            label="Email"
            error={errors.email?.message as string | undefined}
            input={
              <input
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                {...formRegister("email")}
                className={inputClass(Boolean(errors.email))}
              />
            }
          />

          <Field
            label="Password"
            error={errors.password?.message as string | undefined}
            input={
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  placeholder="Enter password"
                  {...formRegister("password")}
                  className={inputClass(Boolean(errors.password))}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            }
          />

          {mode === "register" && (
            <Field
              label="Confirm Password"
              error={(errors as any).confirmPassword?.message as string | undefined}
              input={
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Confirm password"
                    {...formRegister("confirmPassword" as const)}
                    className={inputClass(Boolean((errors as any).confirmPassword))}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              }
            />
          )}

          {error && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 text-rose-700 px-3 py-2 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || isSubmitting}
            className="w-full h-11 rounded-xl text-white font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/20 transition disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            {(loading || isSubmitting) && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-600 text-center">
          {mode === "login" ? "Don’t have an account?" : "Already have an account?"}{" "}
          <Link
            href={mode === "login" ? `/register${next ? `?next=${encodeURIComponent(next)}` : ""}` : `/login${next ? `?next=${encodeURIComponent(next)}` : ""}`}
            className="font-semibold text-slate-900 hover:text-orange-600"
          >
            {mode === "login" ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  input,
  error,
}: {
  label: string;
  input: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="mt-1.5">{input}</div>
      {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : null}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return `w-full h-11 rounded-xl border bg-white px-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
    hasError
      ? "border-rose-300 focus:ring-rose-200"
      : "border-slate-200 focus:border-slate-300 focus:ring-slate-200"
  }`;
}

