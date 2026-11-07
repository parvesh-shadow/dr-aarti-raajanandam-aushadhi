import bcrypt from "bcryptjs";
import { guard } from "@/lib/security";
import { verifyUser } from "@/middlewares/verifyUser";
import { connectMongo } from "@/lib/mongo";
import User from "@/models/User";
import { ok, fail, readJson } from "@/lib/api";
import { passwordChangeSchema } from "@/lib/validators";
import { signToken, setAuthCookie } from "@/lib/auth";

export const runtime = "nodejs";

// PUT /api/account/password  { currentPassword, newPassword }
export async function PUT(req) {
  const blocked = guard(req, { name: "password-change", limit: 10, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;
  const { user, error } = await verifyUser(req);
  if (error) return error;
  const r = passwordChangeSchema.safeParse(await readJson(req));
  if (!r.success) return fail(r.error.issues[0]?.message || "Invalid input.", 422);
  const { currentPassword, newPassword } = r.data;
  if (currentPassword === newPassword) return fail("New password must be different from the current one.", 422);
  try {
    await connectMongo();
    const doc = await User.findById(user._id).select("+password");
    if (!doc) return fail("Unauthorized", 401);
    if (doc.isLocked()) return fail("Too many failed attempts. Try again after 15 minutes.", 429);
    const match = await bcrypt.compare(currentPassword, doc.password);
    if (!match) {
      await doc.registerFailedLogin();
      return fail("Current password is incorrect.", 400);
    }
    doc.password = newPassword; // pre-save hook hash karega + passwordChangedAt set karega
    doc.loginAttempts = 0;
    doc.lockUntil = null;
    await doc.save();
    // baaki sab devices logout; is device ke liye naya token
    const res = ok({ message: "Your password has been updated." });
    setAuthCookie(res, "user", await signToken(doc._id, "user"));
    return res;
  } catch (e) {
    console.error("PUT /api/account/password", e);
    return fail("Could not update password.", 500);
  }
}
