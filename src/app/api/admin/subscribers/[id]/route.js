import { guard } from "@/lib/security";
import { verifyAdmin } from "@/middlewares/verifyAdmin";
import { fromError } from "@/lib/api";
import { handlers } from "../handlers";

export const runtime = "nodejs";

async function write(req, params, label, fn) {
  const { error } = await verifyAdmin(req);
  if (error) return error;
  const blocked = guard(req, { name: "admin-subscribers-write", limit: 300, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;
  try {
    const { id } = await params;
    return await fn(id);
  } catch (e) {
    return fromError(e, label, "Could not complete the request.");
  }
}

export const PATCH = (req, { params }) => write(req, params, "PATCH /api/admin/subscribers/[id]", (id) => handlers.setStatus(req, id));
export const PUT = PATCH;
export const DELETE = (req, { params }) => write(req, params, "DELETE /api/admin/subscribers/[id]", (id) => handlers.remove(id));
