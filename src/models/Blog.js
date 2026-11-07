import mongoose from "mongoose";

const str = { type: String, default: "", trim: true };

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    category: { ...str, index: true },
    excerpt: { ...str },
    image: { ...str },
    author: { ...str },

    // Article body: rich-text editor ka sanitized HTML
    html: { type: String, default: "" },

    // Purane blogs ka section-wise content (sirf backward compatibility)
    content: {
      type: [
        {
          _id: false,
          heading: String,
          paragraphs: [String],
          listIntro: String,
          list: [String],
        },
      ],
      default: [],
    },

    readTime: { type: Number, default: 1, min: 1 }, // minutes (auto)
    isPublished: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date, default: null, index: true },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
