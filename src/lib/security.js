import { NextResponse } from "next/server";

const store = new Map();
const MAX_KEYS = 20000;

function rateLimit(key, limit, windowMs) {
  const now = Date.now();
  if (store.size > MAX_KEYS / 2) {
    for (const [k, v] of store) if (v.reset < now) store.delete(k);
    // Abhi bhi bhara ho to sabse purani entries hatao (memory exhaustion se bachao)
    while (store.size > MAX_KEYS) store.delete(store.keys().next().value);
  }
  const rec = store.get(key);
  if (!rec || rec.reset < now) {
    store.set(key, { count: 1, reset: now + windowMs });
    return { ok: true };
  }
  rec.count += 1;
  if (rec.count > limit) {
    return { ok: false, retryAfter: Math.ceil((rec.reset - now) / 1000) };
  }
  return { ok: true };
}

// Client IP. x-forwarded-for ki sabse left value client khud likh sakta hai (spoof),
// isliye apne trusted proxies ke hisaab se right-side se chunte hain.
// TRUSTED_PROXY_HOPS = tumhare server ke aage kitne proxies hain (default 1: nginx / Vercel / Render).
export function getIp(req) {
  const hops = Math.max(1, Number(process.env.TRUSTED_PROXY_HOPS) || 1);
  const list = (req.headers.get("x-forwarded-for") || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
  if (list.length) return list[Math.max(0, list.length - hops)].slice(0, 64);
  return (req.headers.get("x-real-ip") || "unknown").trim().slice(0, 64);
}

// Origin ka host, server ke host (ya reverse proxy ke forwarded host / SITE_URL) se match hona chahiye
function isSameOrigin(req) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  let host;
  try {
    host = new URL(origin).host;
  } catch {
    return false;
  }
  const allowed = new Set();
  const add = (v) => v && allowed.add(String(v).split(",")[0].trim().toLowerCase());
  add(req.headers.get("host"));
  add(req.headers.get("x-forwarded-host"));
  try {
    if (process.env.SITE_URL) add(new URL(process.env.SITE_URL).host);
  } catch {}
  return allowed.has(host.toLowerCase());
}

// Route ke start me chalao. Block hua to response return hota hai, warna null.
export function guard(req, { name, limit, windowMs }) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }
  const r = rateLimit(`${name}:${getIp(req)}`, limit, windowMs);
  if (!r.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(r.retryAfter) } }
    );
  }
  return null;
}
