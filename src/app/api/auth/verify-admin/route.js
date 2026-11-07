import { NextResponse } from "next/server";
import { verifyAdmin } from "@/middlewares/verifyAdmin";

export async function GET(req) {
  const { admin, error } = await verifyAdmin(req);
  if (error) return error;
  return NextResponse.json(
    { ok: true, admin: { id: String(admin._id), name: admin.name, email: admin.email } },
    { headers: { "Cache-Control": "no-store" } }
  );
}