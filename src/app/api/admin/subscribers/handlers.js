import Subscriber, { SUBSCRIBER_STATUSES } from "@/models/Subscriber";
import { makeAdminHandlers } from "@/controllers/submissionController";

export const handlers = makeAdminHandlers(Subscriber, {
  statuses: SUBSCRIBER_STATUSES,
  searchFields: ["email"],
  newStatus: "__none__", // "new" badge nahi chahiye
});
