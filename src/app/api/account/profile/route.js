import { guard } from "@/lib/security";
import { verifyUser } from "@/middlewares/verifyUser";
import { connectMongo } from "@/lib/mongo";
import User from "@/models/User";
import { ok, fail, readJson } from "@/lib/api";
import { profileSchema } from "@/lib/validators";

export const runtime = "nodejs";

const view = (u) => ({
  id: String(u._id),
  name: u.name,
  email: u.email,
  phone: u.phone,
  dob: u.dob ? new Date(u.dob).toISOString().slice(0, 10) : "",
});

export async function GET(req) {
  const { user, error } = await verifyUser(req);
  if (error) return error;
  try {
    await connectMongo();
    const u = await User.findById(user._id).select("name email phone dob").lean();
    return ok({ profile: view(u) });
  } catch (e) {
    console.error("GET /api/account/profile", e);
    return fail("Could not load profile.", 500);
  }
}

export async function PUT(req) {
  const blocked = guard(req, { name: "profile-update", limit: 30, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;
  const { user, error } = await verifyUser(req);
  if (error) return error;
  const body = await readJson(req);
  const r = profileSchema.safeParse(body);
  if (!r.success) return fail(r.error.issues[0]?.message || "Invalid input.", 422);
  const { name, email, phone, dob } = r.data;
  try {
    await connectMongo();
    const clash = await User.exists({ _id: { $ne: user._id }, $or: [{ email }, { phone }] });
    if (clash) return fail("This email or mobile number is already used by another account.", 409);
    const u = await User.findByIdAndUpdate(
      user._id,
      { $set: { name, email, phone, dob: dob ? new Date(dob) : null } },
      { new: true, runValidators: true }
    ).select("name email phone dob").lean();
    return ok({ profile: view(u) });
  } catch (e) {
    if (e?.code === 11000) return fail("This email or mobile number is already used by another account.", 409);
    console.error("PUT /api/account/profile", e);
    return fail("Could not update profile.", 500);
  }
}
