import mongoose from "mongoose";

export const APPOINTMENT_STATUSES = ["new", "confirmed", "completed", "cancelled"];

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 150 },
    mobile: { type: String, required: true, trim: true, maxlength: 15 },
    appointmentType: { type: String, required: true, trim: true, maxlength: 100 },
    date: { type: String, required: true, maxlength: 10 }, // YYYY-MM-DD
    time: { type: String, required: true, trim: true, maxlength: 50 },
    reason: { type: String, required: true, trim: true, maxlength: 100 },
    message: { type: String, default: "", trim: true, maxlength: 2000 },
    status: { type: String, enum: APPOINTMENT_STATUSES, default: "new", index: true },
    // logged-in user ne book kiya ho to uska id (My Appointments isi se dikhta hai)
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null, index: true },
  },
  { timestamps: true }
);
appointmentSchema.index({ createdAt: -1 });
appointmentSchema.index({ user: 1, createdAt: -1 });

export default mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);
