import { guard } from "@/lib/security";
import { verifyUser } from "@/middlewares/verifyUser";
import { connectMongo } from "@/lib/mongo";
import User from "@/models/User";
import { ok, fail, readJson } from "@/lib/api";
import { MAX_ADDRESSES, backfillAddresses, parseAddress, toAddress } from "@/lib/addressHelpers";

export const runtime = "nodejs";

export async function GET(req) {
  const { user, error } = await verifyUser(req);
  if (error) return error;
  try {
    await connectMongo();
    await backfillAddresses(user._id);
    const u = await User.findById(user._id).select("addresses").lean();
    return ok({ addresses: (u?.addresses || []).map(toAddress) });
  } catch (e) {
    console.error("GET /api/account/addresses", e);
    return fail("Could not load addresses.", 500);
  }
}

export async function POST(req) {
  const blocked = guard(req, { name: "address-add", limit: 30, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;
  const { user, error } = await verifyUser(req);
  if (error) return error;
  const body = await readJson(req);
  const { data, error: msg } = parseAddress(body);
  if (msg) return fail(msg, 422);
  try {
    await connectMongo();
    const r = await User.updateOne(
      { _id: user._id, [`addresses.${MAX_ADDRESSES - 1}`]: { $exists: false } },
      { $push: { addresses: data } }
    );
    if (r.modifiedCount !== 1) return fail(`You can save up to ${MAX_ADDRESSES} addresses.`, 409);
    const u = await User.findById(user._id).select("addresses").lean();
    return ok({ addresses: u.addresses.map(toAddress) }, 201);
  } catch (e) {
    console.error("POST /api/account/addresses", e);
    return fail("Could not save address.", 500);
  }
}
