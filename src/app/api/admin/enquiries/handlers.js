import ContactMessage, { ENQUIRY_STATUSES } from "@/models/ContactMessage";
import { makeAdminHandlers } from "@/controllers/submissionController";

export const handlers = makeAdminHandlers(ContactMessage, { statuses: ENQUIRY_STATUSES, searchFields: ["name","email","mobile","orderNumber","message"] });
