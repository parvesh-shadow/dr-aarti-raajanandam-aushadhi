import mongoose from "mongoose";

const str = { type: String, default: "", trim: true };

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },

    category: { ...str },            // "Ayurvedic Hair Care" (tag)
    filter: { ...str, index: true }, // "Hair Care" (list ke filter button)
    description: { ...str },         // chhota description
    pack: { ...str },                // "800 mg • 60 Capsules" (card par)
    netQuantity: { ...str },         // "800 mg"
    type: { ...str },                // "Ayurvedic product"

    price: { type: Number, required: true, min: 0 },
    mrp: { type: Number, default: 0, min: 0 },
    stock: { type: Number, default: 0, min: 0 },

    images: { type: [String], default: [] },
    brochureHref: { ...str },

    about: { ...str },
    specs: {
      type: [{ _id: false, label: String, value: String }],
      default: [],
    },

    benefitsIntro: { ...str },
    benefits: {
      type: [{ _id: false, icon: String, title: String, description: String }],
      default: [],
    },

    usageIntro: { ...str },
    usage: {
      type: [{ _id: false, question: String, answer: String }],
      default: [],
    },

    ingredientsHeading: { ...str },
    ingredientsDescription: { ...str },
    ingredients: {
      type: [{ _id: false, name: String, description: String, image: String }],
      default: [],
    },

    faqs: {
      type: [{ _id: false, question: String, answer: String }],
      default: [],
    },

    // Review API se auto update honge (admin nahi badlega)
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },

    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);