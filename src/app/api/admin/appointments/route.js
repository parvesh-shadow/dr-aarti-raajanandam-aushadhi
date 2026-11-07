import { verifyAdmin } from "@/middlewares/verifyAdmin";
import { fromError } from "@/lib/api";
import { handlers } from "./handlers";

export const runtime = "nodejs";

export async function GET(req) {
  const { error } = await verifyAdmin(req);
  if (error) return error;
  try {
    return await handlers.list(req);
  } catch (e) {
    return fromError(e, "GET /api/admin/appointments", "Could not load appointments.");
  }
}
