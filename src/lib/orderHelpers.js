import mongoose from "mongoose";
import Product from "@/models/Product";

import { calcShipping, FREE_SHIPPING_ABOVE, SHIPPING_FEE } from "@/lib/shipping";
export { calcShipping, FREE_SHIPPING_ABOVE, SHIPPING_FEE };

// RAA-10001, RAA-10002 ... (atomic counter)
export async function nextOrderNumber() {
  const r = await mongoose.connection
    .collection("counters")
    .findOneAndUpdate({ _id: "order" }, { $inc: { seq: 1 } }, { upsert: true, returnDocument: "after" });
  const doc = r && r.value !== undefined ? r.value : r; // driver v5 / v6 dono
  return "RAA-" + (10000 + (doc?.seq || 1));
}

// stock wapas add karo (cancel / failed order)
export async function restoreStock(items) {
  await Promise.all(
    items.map((i) => Product.updateOne({ _id: i.product }, { $inc: { stock: i.quantity } }))
  );
}

// Order ko UI ke OrderCard format me convert karo
export function toCard(o) {
  const first = o.items?.[0] || {};
  const count = (o.items || []).reduce((n, i) => n + i.quantity, 0);
  return {
    id: String(o._id),
    orderNumber: o.orderNumber,
    category: first.category || "Ayurvedic Product",
    name: o.items?.length > 1 ? `${first.name} + ${o.items.length - 1} more` : first.name,
    description: (o.items || []).map((i) => `${i.name} × ${i.quantity}`).join(", "),
    date: new Date(o.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    items: count,
    total: o.total,
    status: o.status,
    image: first.image || "/medicine1.jpg",
    href: `/account/order/${o.orderNumber}`,
  };
}
