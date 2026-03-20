import { SignJWT, jwtVerify } from "jose";
import { env } from "@/lib/env";

type JwtUser = {
  id: string;
  email: string;
  fullName?: string;
};

export type JwtPayload = {
  user: JwtUser;
};

function getKey() {
  if (!env.JWT_SECRET) throw new Error("Missing JWT_SECRET");
  return new TextEncoder().encode(env.JWT_SECRET);
}

export async function signAuthToken(payload: JwtPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRES_IN)
    .sign(getKey());
}

export async function verifyAuthToken(token: string) {
  const { payload } = await jwtVerify(token, getKey());
  return payload as unknown as JwtPayload & { exp?: number; iat?: number };
}

