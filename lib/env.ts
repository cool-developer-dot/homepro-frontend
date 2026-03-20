export const env = {
  MONGODB_URI: process.env.MONGODB_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  AUTH_COOKIE_NAME: process.env.AUTH_COOKIE_NAME || "homepro_token",
} as const;

