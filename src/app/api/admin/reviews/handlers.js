import Review, { REVIEW_STATUSES } from "@/models/Review";
import { makeAdminHandlers } from "@/controllers/submissionController";
import { refreshProductRating } from "@/lib/reviewHelpers";

// Status badalne ya delete hone par product ki rating dobara calculate hoti hai
export const handlers = makeAdminHandlers(Review, {
  statuses: REVIEW_STATUSES,
  searchFields: ["name", "title", "comment", "productName", "email"],
  newStatus: "pending",
  onChange: (doc) => refreshProductRating(doc.product),
});
