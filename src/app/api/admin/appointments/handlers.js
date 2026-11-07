import Appointment, { APPOINTMENT_STATUSES } from "@/models/Appointment";
import { makeAdminHandlers } from "@/controllers/submissionController";

export const handlers = makeAdminHandlers(Appointment, { statuses: APPOINTMENT_STATUSES, searchFields: ["name","email","mobile","reason"] });
