import mongoose from "mongoose";

const KEY = "_raaMongo";
const cache = globalThis[KEY] || (globalThis[KEY] = { conn: null, promise: null });

export async function connectMongo() {
  if (cache.conn) return cache.conn;
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI missing in .env.local");
  if (!cache.promise) {
    cache.promise = mongoose
      .connect(process.env.MONGODB_URI, { bufferCommands: false, serverSelectionTimeoutMS: 10000, maxPoolSize: 10 })
      .then((m) => m);
  }
  try {
    cache.conn = await cache.promise;
  } catch (e) {
    cache.promise = null;
    throw e;
  }
  return cache.conn;
}
