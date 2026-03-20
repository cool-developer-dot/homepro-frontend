import mongoose from "mongoose";
import { env } from "@/lib/env";

type GlobalMongoose = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: GlobalMongoose | undefined;
}

const cached: GlobalMongoose = global._mongoose || { conn: null, promise: null };
global._mongoose = cached;

export async function connectDb() {
  if (cached.conn) return cached.conn;
  if (!env.MONGODB_URI) throw new Error("Missing MONGODB_URI");

  if (!cached.promise) {
    cached.promise = mongoose.connect(env.MONGODB_URI, {
      dbName: "homepro",
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

