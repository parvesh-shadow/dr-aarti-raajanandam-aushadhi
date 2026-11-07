import { guard } from "@/lib/security";
import ContactMessage from "@/models/ContactMessage";
import { parseContact } from "@/lib/submissionPayload";
import { makePublicCreate } from "@/controllers/submissionController";
import { fromError } from "@/lib/api";

export const runtime = "nodejs";

const create = makePublicCreate(
  ContactMessage,
  parseContact,
  "Thank you. Your message has been sent. Our team will get back to you soon."
);

export async function POST(req) {
  const blocked = guard(req, { name: "contact-submit", limit: 5, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;
  try {
    return await create(req);
  } catch (e) {
    return fromError(e, "POST /api/contact", "Could not send your message. Please try again.");
  }
}
