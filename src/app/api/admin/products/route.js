import { guard } from "@/lib/security";
import { verifyAdmin } from "@/middlewares/verifyAdmin";
import { adminListProducts, createProduct } from "@/controllers/productController";
import { fromError } from "@/lib/api";

export const runtime = "nodejs";

export async function GET(req) {
  const { error } = await verifyAdmin(req);
  if (error) return error;
  try {
    return await adminListProducts(req);
  } catch (e) {
    return fromError(e, "GET /api/admin/products", "Could not load products.");
  }
}

export async function POST(req) {
  const { error } = await verifyAdmin(req);
  if (error) return error;
  const blocked = guard(req, { name: "admin-product-write", limit: 200, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;
  try {
    return await createProduct(req);
  } catch (e) {
    return fromError(e, "POST /api/admin/products", "Could not save product.");
  }
}
