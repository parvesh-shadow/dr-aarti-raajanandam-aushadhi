import mongoose from "mongoose";

// pending  = rating gina ja chuka hai, review text admin approval ka wait kar raha hai (site par nahi dikhta)
// approved = review text site par dikhta hai
// rejected = text bhi hidden aur rating bhi nahi gini jaati (spam / galat review)
export const REVIEW_STATUSES = ["pending", "approved", "rejected"];
export const COUNTED_STATUSES = ["pending", "approved"];

const reviewSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true, index: true },
    productName: { type: String, default: "", trim: true, maxlength: 200 }, // admin list ke liye snapshot
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true, maxlength: 60 },
    email: { type: String, default: "", trim: true, lowercase: true, maxlength: 150 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true, trim: true, maxlength: 100 },
    comment: { type: String, default: "", trim: true, maxlength: 1500 },
    isVerifiedPurchase: { type: Boolean, default: true },
    status: { type: String, enum: REVIEW_STATUSES, default: "pending", index: true },
  },
  { timestamps: true }
);

// Ek user ek product par ek hi review
reviewSchema.index({ product: 1, user: 1 }, { unique: true });
reviewSchema.index({ product: 1, status: 1, createdAt: -1 });

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
