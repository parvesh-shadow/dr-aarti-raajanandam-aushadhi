import { CATEGORIES } from "@/lib/categories";
import { z } from "zod";

const emailField = z
  .string({ error: "Email is required." })
  .trim()
  .toLowerCase()
  .max(150)
  .pipe(z.email("Enter a valid email address."));

const phoneField = z
  .string({ error: "Mobile number is required." })
  .trim()
  .transform((v) => v.replace(/[\s-]/g, "").replace(/^(\+91|91)(?=\d{10}$)/, ""))
  .pipe(z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number."));

const newPassword = z
  .string({ error: "Password is required." })
  .min(8, "Password must be at least 8 characters.")
  .max(72, "Password is too long.");

const anyPassword = z
  .string({ error: "Password is required." })
  .min(1, "Password is required.")
  .max(128, "Invalid credentials.");

export const registerSchema = z.object({
  name: z.string({ error: "Name is required." }).trim().min(2, "Name is too short.").max(60),
  email: emailField,
  phone: phoneField,
  password: newPassword,
});

export const loginSchema = z.object({
  identifier: z
    .string({ error: "Enter your email or mobile number." })
    .trim()
    .min(1, "Enter your email or mobile number.")
    .max(150)
    .transform((v) =>
      v.includes("@") ? v.toLowerCase() : v.replace(/[\s-]/g, "").replace(/^(\+91|91)(?=\d{10}$)/, "")
    ),
  password: anyPassword,
});

const dobField = z
  .string()
  .trim()
  .refine((v) => {
    if (v === "") return true;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
    const d = new Date(v);
    return !Number.isNaN(d.getTime()) && d <= new Date() && d.getUTCFullYear() >= 1900;
  }, "Enter a valid date of birth.")
  .default("");

export const profileSchema = z.object({
  name: z.string({ error: "Name is required." }).trim().min(2, "Name is too short.").max(60),
  email: emailField,
  phone: phoneField,
  dob: dobField,
});

export const passwordChangeSchema = z.object({
  currentPassword: anyPassword,
  newPassword,
});

export const adminLoginSchema = z.object({ email: emailField, password: anyPassword });

const path = z
  .string()
  .trim()
  .max(500)
  .regex(/^(\/(?![\/\\])|https:\/\/)/, "Path must start with / or https://");
const optionalPath = path.or(z.literal(""));
const text = (max) => z.string().trim().max(max);

// Defaults jaan-bujh kar nahi diye: update me galti se purana data overwrite na ho.
// Khali fields ka default Mongoose model deta hai.
const productBase = z.object({
  name: z.string({ error: "Name is required." }).trim().min(2, "Name is too short.").max(120),
  category: z.enum(CATEGORIES, { error: "Select a valid category." }).optional(),
  filter: z.enum(CATEGORIES, { error: "Select a valid category." }).optional(),
  description: text(1000).optional(),
  pack: text(100).optional(),
  netQuantity: text(60).optional(),
  type: text(80).optional(),

  price: z.coerce.number({ error: "Price is required." }).min(0, "Price cannot be negative.").max(10000000),
  mrp: z.coerce.number().min(0).max(10000000).optional(),
  stock: z.coerce.number().int("Stock must be a whole number.").min(0).max(1000000).optional(),

  images: z.array(path).max(5).optional(),
  brochureHref: optionalPath.optional(),

  about: text(3000).optional(),
  specs: z
    .array(z.object({ label: text(80).min(1), value: text(200).min(1) }))
    .max(30)
    .optional(),

  benefitsIntro: text(1000).optional(),
  benefits: z
    .array(
      z.object({
        icon: z.enum(["leaf", "heart", "book", "shield"]),
        title: text(100).min(1),
        description: text(300),
      })
    )
    .max(20)
    .optional(),

  usageIntro: text(1000).optional(),
  usage: z
    .array(z.object({ question: text(200).min(1), answer: text(1000).min(1) }))
    .max(20)
    .optional(),

  ingredientsHeading: text(150).optional(),
  ingredientsDescription: text(1000).optional(),
  ingredients: z
    .array(
      z.object({
        name: text(100).min(1),
        description: text(500),
        image: optionalPath,
      })
    )
    .max(30)
    .optional(),

  faqs: z
    .array(z.object({ question: text(300).min(1), answer: text(1500).min(1) }))
    .max(30)
    .optional(),

  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export const productSchema = productBase.refine(
  (d) => !d.mrp || d.mrp >= d.price,
  { message: "MRP cannot be less than price.", path: ["mrp"] }
);

export const productUpdateSchema = productBase
  .partial()
  .refine((d) => Object.keys(d).length > 0, { message: "Nothing to update." });