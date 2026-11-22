import { guard } from "@/lib/security";
import Appointment from "@/models/Appointment";
import { verifyUser } from "@/middlewares/verifyUser";
import { connectDB } from "@/lib/db";
import { ok, fail, readJson, isId, fromError } from "@/lib/api";
import { serializeAppointment } from "@/lib/appointmentHelpers";

export const runtime = "nodejs";

// PATCH /api/appointments/:id  { status: "cancelled" } — user sirf apna appointment cancel kar sakta hai
export async function PATCH(req, { params }) {
  const { user, error } = await verifyUser(req);
  if (error) return error;
  const blocked = guard(req, { name: "appointment-cancel", limit: 30, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;
  try {
    const { id } = await params;
    if (!isId(id)) return fail("Invalid id.", 400);
    const body = await readJson(req);
    if (body?.status !== "cancelled") return fail("Invalid request.", 422);

    await connectDB();
    const doc = await Appointment.findOneAndUpdate(
      { _id: id, user: user._id, status: { $in: ["new", "confirmed"] } },
      { status: "cancelled" },
      { new: true }
    ).lean();
    if (!doc) return fail("This appointment can no longer be cancelled.", 409);
    return ok({ item: serializeAppointment(doc) });
  } catch (e) {
    return fromError(e, "PATCH /api/appointments/[id]", "Could not cancel the appointment.");
  }
}
