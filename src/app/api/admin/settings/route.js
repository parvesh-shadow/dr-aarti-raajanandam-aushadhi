import { guard } from "@/lib/security";
import { verifyAdmin } from "@/middlewares/verifyAdmin";
import { connectMongo } from "@/lib/mongo";
import SiteSettings from "@/models/SiteSettings";
import { getSiteSettings } from "@/lib/siteSettings";
import { parseSettings } from "@/lib/settingsPayload";
import { ok, fail, readJson, fromError } from "@/lib/api";

export const runtime = "nodejs";

export async function GET(req) {
  const { error } = await verifyAdmin(req);
  if (error) return error;
  try {
    return ok({ settings: await getSiteSettings() });
  } catch (e) {
    return fromError(e, "GET /api/admin/settings", "Could not load settings.");
  }
}

export async function PUT(req) {
  const { error } = await verifyAdmin(req);
  if (error) return error;
  const blocked = guard(req, { name: "admin-settings-write", limit: 100, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;
  try {
    const { errors, data } = parseSettings(await readJson(req));
    if (errors.length) return fail(errors[0], 422);
    await connectMongo();
    await SiteSettings.findOneAndUpdate(
      { key: "site" },
      { $set: data, $setOnInsert: { key: "site" } },
      { upsert: true, new: true, runValidators: true }
    );
    return ok({ settings: data });
  } catch (e) {
    return fromError(e, "PUT /api/admin/settings", "Could not save settings.");
  }
}
