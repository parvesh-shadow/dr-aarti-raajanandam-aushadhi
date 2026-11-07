import { guard } from "@/lib/security";
import { registerUser } from "@/controllers/authController";

export async function POST(req) {
  const blocked = guard(req, { name: "register", limit: 20, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;
  return registerUser(req);
}