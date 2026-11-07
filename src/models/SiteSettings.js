import mongoose from "mongoose";

// Ek hi document (key: "site"): contact details + social links
const siteSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: "site", unique: true },
    phone: { type: String, default: "", trim: true, maxlength: 20 },
    email: { type: String, default: "", trim: true, lowercase: true, maxlength: 150 },
    socials: {
      type: [{ _id: false, platform: { type: String, trim: true }, url: { type: String, trim: true } }],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.SiteSettings || mongoose.model("SiteSettings", siteSettingsSchema);
