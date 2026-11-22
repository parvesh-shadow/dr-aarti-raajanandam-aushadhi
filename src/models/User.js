import mongoose from "mongoose";
import authPlugin from "./plugins/authPlugin.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 60 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    isActive: { type: Boolean, default: true },
    dob: { type: Date, default: null },
    lastLoginAt: { type: Date, default: null },
    addressesBackfilled: { type: Boolean, default: false },
    // Logged-in user ka cart / wishlist (guest ka localStorage login par yahan merge hota hai)
    cart: {
      type: [
        {
          _id: false,
          productId: { type: String, required: true },
          quantity: { type: Number, required: true, min: 1, max: 10 },
        },
      ],
      default: [],
    },
    wishlist: { type: [String], default: [] },
    addresses: {
      type: [
        {
          label: { type: String, enum: ["Home", "Work"], default: "Home" },
          fullName: { type: String, default: "", trim: true, maxlength: 100 },
          phone: { type: String, default: "", trim: true, maxlength: 15 },
          address: { type: String, required: true, trim: true, maxlength: 300 },
          city: { type: String, required: true, trim: true, maxlength: 100 },
          state: { type: String, required: true, trim: true, maxlength: 100 },
          pincode: { type: String, required: true, match: /^\d{6}$/ },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.plugin(authPlugin, { maxAttempts: 10 });

export default mongoose.models.User || mongoose.model("User", userSchema);