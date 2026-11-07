import { NextResponse } from "next/server";
import { verifyUser } from "@/middlewares/verifyUser";

export async function GET(req) {
  const { user, error } = await verifyUser(req);
  if (error) return error;
  return NextResponse.json(
    { ok: true, user: { id: String(user._id), name: user.name, email: user.email, phone: user.phone } },
    { headers: { "Cache-Control": "no-store" } }
  );
}