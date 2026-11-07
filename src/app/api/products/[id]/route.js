import { getProduct } from "@/controllers/productController";
import { fromError } from "@/lib/api";

export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    return await getProduct(id);
  } catch (e) {
    return fromError(e, "GET /api/products/[id]", "Could not load product.");
  }
}
