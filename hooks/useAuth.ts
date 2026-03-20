"use client";

import { useCallback, useState } from "react";
import { apiRequest, type ApiError } from "@/lib/api-client";
import type { LoginInput, RegisterInput } from "@/lib/auth-schemas";

type AuthSuccess = {
  token?: string;
  user?: {
    id: string;
    email: string;
    fullName?: string;
  };
  message?: string;
};

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async <T,>(request: () => Promise<T>): Promise<T> => {
    setLoading(true);
    setError(null);
    try {
      return await request();
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError?.message || "Authentication failed. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    async (payload: LoginInput) =>
      run(() => apiRequest<AuthSuccess>("/auth/login", { method: "POST", body: payload })),
    [run],
  );

  const register = useCallback(
    async (payload: RegisterInput) =>
      run(() => apiRequest<AuthSuccess>("/auth/register", { method: "POST", body: payload })),
    [run],
  );

  return {
    login,
    register,
    loading,
    error,
    clearError: () => setError(null),
  };
}

