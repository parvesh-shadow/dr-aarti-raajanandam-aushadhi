import mongoose from "mongoose";

export const ENQUIRY_STATUSES = ["new", "in_progress", "resolved"];

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 150 },
    mobile: { type: String, required: true, trim: true, maxlength: 15 },
    enquiryType: { type: String, required: true, trim: true, maxlength: 100 },
    orderNumber: { type: String, default: "", trim: true, maxlength: 50 },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
    status: { type: String, enum: ENQUIRY_STATUSES, default: "new", index: true },
  },
  { timestamps: true }
);
contactSchema.index({ createdAt: -1 });

export default mongoose.models.ContactMessage || mongoose.model("ContactMessage", contactSchema);
