import { guard } from "@/lib/security";
import { verifyUser } from "@/middlewares/verifyUser";
import { connectMongo } from "@/lib/mongo";
import User from "@/models/User";
import { ok, fail, readJson, isId } from "@/lib/api";

export const runtime = "nodejs";

const MAX_QTY = 10;
const MAX_CART = 50;
const MAX_WISHLIST = 100;

// [{productId, quantity}] -> valid, duplicate merge, qty 1..10
function cleanCart(list) {
  const map = new Map();
  for (const it of Array.isArray(list) ? list : []) {
    const id = String(it?.productId || "");
    const qty = Number(it?.quantity);
    if (!isId(id) || !Number.isInteger(qty) || qty < 1) continue;
    if (!map.has(id) && map.size >= MAX_CART) continue;
    map.set(id, Math.min(MAX_QTY, (map.get(id) || 0) + qty));
  }
  return [...map].map(([productId, quantity]) => ({ productId, quantity }));
}

function cleanWishlist(list) {
  const out = [];
  for (const v of Array.isArray(list) ? list : []) {
    const id = String(v || "");
    if (isId(id) && !out.includes(id)) out.push(id);
    if (out.length >= MAX_WISHLIST) break;
  }
  return out;
}

// Native collection use hota hai, taaki dev server me purana cached User model (jisme cart/wishlist
// fields nahi hote) data ko chupchap drop na kar de.
const load = (id) => User.collection.findOne({ _id: id }, { projection: { cart: 1, wishlist: 1 } });
const save = async (id, $set) => {
  const r = await User.collection.updateOne({ _id: id }, { $set });
  if (!r.matchedCount) throw new Error("user not found");
};

const shape = (u) => ({
  cart: (u?.cart || []).map((i) => ({ productId: i.productId, quantity: i.quantity })),
  wishlist: u?.wishlist || [],
});

// GET /api/account/shopping -> { cart, wishlist }
export async function GET(req) {
  const { user, error } = await verifyUser(req);
  if (error) return error;
  try {
    await connectMongo();
    return ok(shape(await load(user._id)));
  } catch (e) {
    console.error("GET /api/account/shopping", e);
    return fail("Could not load your cart.", 500);
  }
}

// PUT /api/account/shopping  body: { cart?, wishlist? } -> jo bheja wo replace hota hai
export async function PUT(req) {
  const blocked = guard(req, { name: "shopping-save", limit: 600, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;
  const { user, error } = await verifyUser(req);
  if (error) return error;
  const body = await readJson(req);
  if (!body) return fail("Invalid request.");

  const $set = {};
  if (body.cart !== undefined) $set.cart = cleanCart(body.cart);
  if (body.wishlist !== undefined) $set.wishlist = cleanWishlist(body.wishlist);
  try {
    await connectMongo();
    if (Object.keys($set).length) await save(user._id, $set);
    return ok(shape(await load(user._id)));
  } catch (e) {
    console.error("PUT /api/account/shopping", e);
    return fail("Could not save your cart.", 500);
  }
}

// POST /api/account/shopping  body: { cart, wishlist } (guest data) -> DB data me merge
// Quantity jodi jaati hai (max 10), wishlist ka union. Final data wapas aata hai.
export async function POST(req) {
  const blocked = guard(req, { name: "shopping-merge", limit: 60, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;
  const { user, error } = await verifyUser(req);
  if (error) return error;
  const body = await readJson(req);
  if (!body) return fail("Invalid request.");

  const guestCart = cleanCart(body.cart);
  const guestWish = cleanWishlist(body.wishlist);
  try {
    await connectMongo();
    const u = await load(user._id);
    const cart = cleanCart([...(u?.cart || []), ...guestCart]);
    const wishlist = cleanWishlist([...guestWish, ...(u?.wishlist || [])]);
    await save(user._id, { cart, wishlist });
    return ok(shape(await load(user._id)));
  } catch (e) {
    console.error("POST /api/account/shopping", e);
    return fail("Could not sync your cart.", 500);
  }
}
