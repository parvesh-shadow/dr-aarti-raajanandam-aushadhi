import { NextResponse } from "next/server";

export const ok = (data = {}, status = 200) =>
  NextResponse.json({ ok: true, ...data }, { status, headers: { "Cache-Control": "no-store" } });

export const fail = (error, status = 400) =>
  NextResponse.json({ ok: false, error }, { status, headers: { "Cache-Control": "no-store" } });

// Strict 24-hex check (mongoose.isValidObjectId koi bhi 12-char string ko valid maan leta hai)
export const isId = (v) => typeof v === "string" && /^[a-fA-F0-9]{24}$/.test(v);

export async function readJson(req) {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

// Safe error response: never leaks internals to the client
export function fromError(e, label, message = "Something went wrong. Please try again.") {
  console.error(label, e?.name || "Error", e?.message || "");
  if (e?.code === 11000) return fail("An item with this name already exists.", 409);
  if (e?.name === "ValidationError") return fail("Invalid data.", 422);
  return fail(message, 500);
}
