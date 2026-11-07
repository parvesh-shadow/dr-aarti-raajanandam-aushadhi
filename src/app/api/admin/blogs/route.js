import { guard } from "@/lib/security";
import { verifyAdmin } from "@/middlewares/verifyAdmin";
import { adminListBlogs, createBlog } from "@/controllers/blogController";
import { fromError } from "@/lib/api";

export const runtime = "nodejs";

export async function GET(req) {
  const { error } = await verifyAdmin(req);
  if (error) return error;
  try {
    return await adminListBlogs(req);
  } catch (e) {
    return fromError(e, "GET /api/admin/blogs", "Could not load blogs.");
  }
}

export async function POST(req) {
  const { error } = await verifyAdmin(req);
  if (error) return error;
  const blocked = guard(req, { name: "admin-blog-write", limit: 200, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;
  try {
    return await createBlog(req);
  } catch (e) {
    return fromError(e, "POST /api/admin/blogs", "Could not save blog.");
  }
}
