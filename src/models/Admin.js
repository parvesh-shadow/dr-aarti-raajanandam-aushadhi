import mongoose from "mongoose";
import authPlugin from "./plugins/authPlugin.js";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 60 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    role: { type: String, enum: ["admin"], default: "admin" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

adminSchema.plugin(authPlugin, { maxAttempts: 5 });

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);