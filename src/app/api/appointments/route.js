import { guard } from "@/lib/security";
import Appointment, { APPOINTMENT_STATUSES } from "@/models/Appointment";
import { parseAppointment } from "@/lib/submissionPayload";
import { verifyUser } from "@/middlewares/verifyUser";
import { connectDB } from "@/lib/db";
import { ok, fail, readJson, fromError } from "@/lib/api";
import { serializeAppointment } from "@/lib/appointmentHelpers";

export const runtime = "nodejs";

const SUCCESS =
  "Thank you. Your request has been received. Our team will review and confirm it soon.";

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// POST /api/appointments — public form. Logged-in ho to appointment uske account se judta hai.
export async function POST(req) {
  const blocked = guard(req, { name: "appointment-submit", limit: 5, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;
  try {
    const { errors, data } = parseAppointment(await readJson(req));
    if (errors.length) return fail(errors[0], 422);
    await connectDB();

    let userId = null;
    try {
      const { user, error } = await verifyUser(req);
      if (!error && user) userId = user._id;
    } catch {}

    await Appointment.create({ ...data, user: userId });
    return ok({ message: SUCCESS }, 201);
  } catch (e) {
    return fromError(e, "POST /api/appointments", "Could not submit your request. Please try again.");
  }
}

// GET /api/appointments?status=&q=&page=&limit=  — sirf logged-in user ke apne appointments
export async function GET(req) {
  const { user, error } = await verifyUser(req);
  if (error) return error;
  try {
    await connectDB();
    const sp = req.nextUrl.searchParams;
    const page = Math.max(1, parseInt(sp.get("page")) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(sp.get("limit")) || 20));
    const q = (sp.get("q") || "").trim().slice(0, 60);
    const status = sp.get("status");

    // Account banne/login se pehle isi email se book hui purani appointments is account se jod do
    if (user.email) {
      await Appointment.updateMany({ user: null, email: user.email.toLowerCase() }, { $set: { user: user._id } });
    }

    const mine = { user: user._id };
    const filter = { ...mine };
    if (APPOINTMENT_STATUSES.includes(status)) filter.status = status;
    if (q) {
      const rx = { $regex: escapeRegex(q), $options: "i" };
      filter.$or = ["appointmentType", "reason", "date", "time", "message", "name"].map((f) => ({ [f]: rx }));
    }

    const [items, total, grouped] = await Promise.all([
      Appointment.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Appointment.countDocuments(filter),
      Appointment.aggregate([{ $match: mine }, { $group: { _id: "$status", n: { $sum: 1 } } }]),
    ]);
    const counts = Object.fromEntries(APPOINTMENT_STATUSES.map((s) => [s, 0]));
    for (const g of grouped) counts[g._id] = g.n;

    return ok({
      items: items.map(serializeAppointment),
      page,
      total,
      pages: Math.ceil(total / limit),
      counts,
    });
  } catch (e) {
    return fromError(e, "GET /api/appointments", "Could not load your appointments.");
  }
}
