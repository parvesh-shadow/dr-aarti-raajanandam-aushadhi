import mongoose from "mongoose";

export const SUBSCRIBER_STATUSES = ["active", "unsubscribed"];

const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 150 },
    source: { type: String, default: "footer", trim: true, maxlength: 50 },
    status: { type: String, enum: SUBSCRIBER_STATUSES, default: "active", index: true },
  },
  { timestamps: true }
);

export default mongoose.models.Subscriber || mongoose.model("Subscriber", subscriberSchema);
