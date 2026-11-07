import { listProducts } from "@/controllers/productController";
import { fromError } from "@/lib/api";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    return await listProducts(req);
  } catch (e) {
    return fromError(e, "GET /api/products", "Could not load products.");
  }
}
