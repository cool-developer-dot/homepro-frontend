import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { env } from "@/lib/env";

const PROTECTED_PREFIXES = ["/dashboard", "/booking", "/profile"];
const AUTH_API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://homepro-backend-ddeh.onrender.com").replace(/\/$/, "");

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get(env.AUTH_COOKIE_NAME)?.value;
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    const nextTarget = `${pathname}${req.nextUrl.search}`;
    url.searchParams.set("next", nextTarget);
    return NextResponse.redirect(url);
  }

  try {
    const res = await fetch(`${AUTH_API_BASE}/api/auth/me`, {
      method: "GET",
      headers: {
        cookie: `${env.AUTH_COOKIE_NAME}=${token}`,
      },
      cache: "no-store",
    });

    if (res.ok) return NextResponse.next();

    const url = req.nextUrl.clone();
    url.pathname = "/login";
    const nextTarget = `${pathname}${req.nextUrl.search}`;
    url.searchParams.set("next", nextTarget);
    const redirectRes = NextResponse.redirect(url);
    redirectRes.cookies.set(env.AUTH_COOKIE_NAME, "", { path: "/", maxAge: 0 });
    return redirectRes;
  } catch {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    const nextTarget = `${pathname}${req.nextUrl.search}`;
    url.searchParams.set("next", nextTarget);
    const res = NextResponse.redirect(url);
    res.cookies.set(env.AUTH_COOKIE_NAME, "", { path: "/", maxAge: 0 });
    return res;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/booking/:path*", "/profile/:path*"],
};

