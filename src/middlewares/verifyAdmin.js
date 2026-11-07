import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { COOKIE, verifyToken } from "@/lib/auth";
import Admin from "@/models/Admin";

const unauthorized = () =>
  NextResponse.json(
    { ok: false, error: "Unauthorized" },
    { status: 401, headers: { "Cache-Control": "no-store" } }
  );

export async function verifyAdmin(req) {
  const token = req.cookies.get(COOKIE.admin)?.value;
  const payload = token ? await verifyToken(token, "admin") : null;
  if (!payload?.sub) return { error: unauthorized() };

  await connectDB();
  const admin = await Admin.findById(payload.sub).select("name email role isActive passwordChangedAt");
  if (!admin || !admin.isActive || admin.role !== "admin") return { error: unauthorized() };

  // password badalne ke baad purane admin tokens kaam nahi karenge
  if (admin.passwordChangedAt && (payload.iat || 0) * 1000 < admin.passwordChangedAt.getTime()) {
    return { error: unauthorized() };
  }

  return { admin };
}