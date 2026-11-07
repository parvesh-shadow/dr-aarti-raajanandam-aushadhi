import { connectDB } from "@/lib/db";
import { ok, fail, readJson, isId } from "@/lib/api";

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const serialize = (doc) => {
  const { _id, __v, ...rest } = doc.toObject ? doc.toObject() : doc;
  return { id: String(_id), ...rest };
};

// Public form submit: parse -> save. Sirf success/error message wapas jaata hai.
export function makePublicCreate(Model, parse, successMessage) {
  return async function create(req) {
    const { errors, data } = parse(await readJson(req));
    if (errors.length) return fail(errors[0], 422);
    await connectDB();
    await Model.create(data);
    return ok({ message: successMessage }, 201);
  };
}

// Admin list / status update / delete (Appointments aur Enquiries dono ke liye)
export function makeAdminHandlers(Model, { statuses, searchFields, newStatus = "new", onChange }) {
  return {
    async list(req) {
      await connectDB();
      const sp = req.nextUrl.searchParams;
      const page = Math.max(1, parseInt(sp.get("page")) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(sp.get("limit")) || 20));
      const q = sp.get("q")?.trim().slice(0, 60);
      const status = sp.get("status");

      const filter = {};
      if (statuses.includes(status)) filter.status = status;
      if (q) {
        const rx = { $regex: escapeRegex(q), $options: "i" };
        filter.$or = searchFields.map((f) => ({ [f]: rx }));
      }

      const [items, total, newCount] = await Promise.all([
        Model.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
        Model.countDocuments(filter),
        Model.countDocuments({ status: newStatus }),
      ]);
      return ok({ items: items.map(serialize), page, total, pages: Math.ceil(total / limit), newCount });
    },

    async setStatus(req, id) {
      if (!isId(id)) return fail("Invalid id.", 400);
      const body = await readJson(req);
      if (!statuses.includes(body?.status)) return fail("Invalid status.", 422);
      await connectDB();
      const doc = await Model.findByIdAndUpdate(id, { status: body.status }, { new: true }).lean();
      if (!doc) return fail("Not found.", 404);
      await onChange?.(doc);
      return ok({ item: serialize(doc) });
    },

    async remove(id) {
      if (!isId(id)) return fail("Invalid id.", 400);
      await connectDB();
      const doc = await Model.findByIdAndDelete(id);
      if (!doc) return fail("Not found.", 404);
      await onChange?.(doc);
      return ok();
    },
  };
}
