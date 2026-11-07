import { guard } from "@/lib/security";
import { verifyAdmin } from "@/middlewares/verifyAdmin";
import { adminGetBlog, updateBlog, deleteBlog } from "@/controllers/blogController";
import { fromError } from "@/lib/api";

export const runtime = "nodejs";

export async function GET(req, { params }) {
  const { error } = await verifyAdmin(req);
  if (error) return error;
  try {
    const { id } = await params;
    return await adminGetBlog(id);
  } catch (e) {
    return fromError(e, "GET /api/admin/blogs/[id]", "Could not load blog.");
  }
}

async function write(req, params, label, fn) {
  const { error } = await verifyAdmin(req);
  if (error) return error;
  const blocked = guard(req, { name: "admin-blog-write", limit: 200, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;
  try {
    const { id } = await params;
    return await fn(id);
  } catch (e) {
    return fromError(e, label, "Could not complete the request.");
  }
}

export const PUT = (req, { params }) => write(req, params, "PUT /api/admin/blogs/[id]", (id) => updateBlog(req, id));
export const PATCH = PUT;
export const DELETE = (req, { params }) => write(req, params, "DELETE /api/admin/blogs/[id]", (id) => deleteBlog(id));
