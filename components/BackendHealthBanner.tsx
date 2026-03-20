"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, PlugZap } from "lucide-react";

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "https://homepro-backend-ddeh.onrender.com";
}

export default function BackendHealthBanner() {
  const apiBaseUrl = useMemo(() => getApiBaseUrl(), []);
  const [backendUp, setBackendUp] = useState<boolean | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let alive = true;

    const check = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/health`, { method: "GET", cache: "no-store" });
        if (!alive) return;
        setBackendUp(res.ok);
      } catch {
        if (!alive) return;
        setBackendUp(false);
      }
    };

    void check();
    const t = window.setInterval(() => void check(), 10000);
    return () => {
      alive = false;
      window.clearInterval(t);
    };
  }, [apiBaseUrl]);

  if (backendUp !== false || dismissed) return null;

  return (
    <div className="fixed top-4 sm:top-16 left-0 right-0 z-[70] px-4">
      <div className="mx-auto max-w-3xl rounded-2xl bg-slate-950/90 backdrop-blur-md ring-1 ring-white/20 shadow-2xl shadow-black/30 p-4 flex items-start justify-between gap-3 pointer-events-auto">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/10 ring-1 ring-white/15 grid place-items-center">
            <AlertTriangle className="h-5 w-5 text-amber-300" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Backend is not reachable</p>
            <p className="text-sm text-white/70 mt-0.5">
              Please start the auth backend or check your network. (Health endpoint:{" "}
              <span className="font-mono text-white/80">{apiBaseUrl}/health</span>)
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="shrink-0 h-10 px-3 rounded-xl bg-white/10 ring-1 ring-white/15 text-white hover:bg-white/15 transition inline-flex items-center gap-2"
        >
          <PlugZap className="h-4 w-4" />
          Dismiss
        </button>
      </div>
    </div>
  );
}

