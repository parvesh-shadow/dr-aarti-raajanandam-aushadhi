// Public site URL (sitemap, robots, metadata). Env: SITE_URL=https://www.yourdomain.com
// Galat/khali value par bhi crash nahi hota (localhost par fallback).
function resolve() {
  const raw = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  try {
    return new URL(raw).origin;
  } catch {
    return "http://localhost:3000";
  }
}

export const SITE_URL = resolve();
