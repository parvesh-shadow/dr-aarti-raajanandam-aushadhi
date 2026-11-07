import { guard } from "@/lib/security";
import Appointment from "@/models/Appointment";
import { parseAppointment } from "@/lib/submissionPayload";
import { makePublicCreate } from "@/controllers/submissionController";
import { fromError } from "@/lib/api";

export const runtime = "nodejs";

const create = makePublicCreate(
  Appointment,
  parseAppointment,
  "Thank you. Your request has been received. Our team will review and confirm it soon."
);

export async function POST(req) {
  const blocked = guard(req, { name: "appointment-submit", limit: 5, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;
  try {
    return await create(req);
  } catch (e) {
    return fromError(e, "POST /api/appointments", "Could not submit your request. Please try again.");
  }
}
