import { guard } from "@/lib/security";
import { loginUser } from "@/controllers/authController";

export async function POST(req) {
  const blocked = guard(req, { name: "user-login", limit: 10, windowMs: 15 * 60 * 1000 });
  if (blocked) return blocked;
  return loginUser(req);
}