import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { COOKIE, verifyToken } from "@/lib/auth";
import User from "@/models/User";

const unauthorized = () =>
  NextResponse.json(
    { ok: false, error: "Unauthorized" },
    { status: 401, headers: { "Cache-Control": "no-store" } }
  );

export async function verifyUser(req) {
  const token = req.cookies.get(COOKIE.user)?.value;
  const payload = token ? await verifyToken(token, "user") : null;
  if (!payload?.sub) return { error: unauthorized() };

  await connectDB();
  const user = await User.findById(payload.sub).select("name email phone isActive passwordChangedAt");
  if (!user || !user.isActive) return { error: unauthorized() };
  // password badalne ke baad purane tokens kaam nahi karenge
  if (user.passwordChangedAt && (payload.iat || 0) * 1000 < user.passwordChangedAt.getTime()) {
    return { error: unauthorized() };
  }

  return { user };
}