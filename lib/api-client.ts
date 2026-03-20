type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiError = {
  message: string;
  status?: number;
};

type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  signal?: AbortSignal;
};

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "";
}

export async function apiRequest<TResponse>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<TResponse> {
  const method = options.method ?? "POST";
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${endpoint}`;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: options.body ? JSON.stringify(options.body) : undefined,
    signal: options.signal,
  });

  if (!res.ok) {
    let errorMessage = "Something went wrong. Please try again.";
    try {
      const payload = (await res.json()) as { message?: string };
      if (payload?.message) errorMessage = payload.message;
    } catch {
      // Keep generic error.
    }
    throw { message: errorMessage, status: res.status } as ApiError;
  }

  return (await res.json()) as TResponse;
}

