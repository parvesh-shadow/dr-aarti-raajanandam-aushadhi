import { guard } from "@/lib/security";
import { verifyUser } from "@/middlewares/verifyUser";
import { connectMongo } from "@/lib/mongo";
import User from "@/models/User";
import { ok, fail, readJson, isId } from "@/lib/api";
import { parseAddress, toAddress } from "@/lib/addressHelpers";

export const runtime = "nodejs";

async function ctx(req, params, name) {
  const blocked = guard(req, { name, limit: 60, windowMs: 60 * 60 * 1000 });
  if (blocked) return { res: blocked };
  const { user, error } = await verifyUser(req);
  if (error) return { res: error };
  const { id } = await params;
  if (!isId(id)) return { res: fail("Invalid address.", 400) };
  return { user, id };
}

export async function PUT(req, { params }) {
  const c = await ctx(req, params, "address-edit");
  if (c.res) return c.res;
  const { data, error: msg } = parseAddress(await readJson(req));
  if (msg) return fail(msg, 422);
  try {
    await connectMongo();
    const set = {};
    for (const [k, v] of Object.entries(data)) set[`addresses.$.${k}`] = v;
    const r = await User.updateOne({ _id: c.user._id, "addresses._id": c.id }, { $set: set });
    if (!r.matchedCount) return fail("Address not found.", 404);
    const u = await User.findById(c.user._id).select("addresses").lean();
    return ok({ addresses: u.addresses.map(toAddress) });
  } catch (e) {
    console.error("PUT /api/account/addresses/[id]", e);
    return fail("Could not update address.", 500);
  }
}

export async function DELETE(req, { params }) {
  const c = await ctx(req, params, "address-del");
  if (c.res) return c.res;
  try {
    await connectMongo();
    await User.updateOne({ _id: c.user._id }, { $pull: { addresses: { _id: c.id } } });
    const u = await User.findById(c.user._id).select("addresses").lean();
    return ok({ addresses: (u?.addresses || []).map(toAddress) });
  } catch (e) {
    console.error("DELETE /api/account/addresses/[id]", e);
    return fail("Could not delete address.", 500);
  }
}
