import AuthForm from "@/components/auth/AuthForm";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-100">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-10 min-h-screen grid place-items-center">
        <Suspense fallback={<div className="py-10 text-center text-slate-600">Loading...</div>}>
          <AuthForm mode="register" />
        </Suspense>
      </div>
    </main>
  );
}

