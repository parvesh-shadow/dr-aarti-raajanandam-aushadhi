import { guard } from "@/lib/security";
import { loginAdmin } from "@/controllers/authController";

export async function POST(req) {
  const blocked = guard(req, { name: "admin-login", limit: 20, windowMs: 15 * 60 * 1000 });
  if (blocked) return blocked;
  return loginAdmin(req);
}