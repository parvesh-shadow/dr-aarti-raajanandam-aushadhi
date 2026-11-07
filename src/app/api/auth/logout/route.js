import { guard } from "@/lib/security";
import { logout } from "@/controllers/authController";

export async function POST(req) {
  const blocked = guard(req, { name: "logout", limit: 30, windowMs: 15 * 60 * 1000 });
  if (blocked) return blocked;
  return logout(req);
}