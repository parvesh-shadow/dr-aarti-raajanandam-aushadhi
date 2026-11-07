import { guard } from "@/lib/security";
import { connectMongo } from "@/lib/mongo";
import Subscriber from "@/models/Subscriber";
import { ok, fail, readJson, fromError } from "@/lib/api";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/subscribe  { email }  — footer newsletter
export async function POST(req) {
  const blocked = guard(req, { name: "newsletter", limit: 10, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;
  const body = await readJson(req);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase().slice(0, 150) : "";
  if (!EMAIL.test(email)) return fail("Please enter a valid email address.", 422);
  try {
    await connectMongo();
    // Pehle se ho to bhi same success message (email list leak nahi hoti); unsubscribed ho to dobara active
    await Subscriber.updateOne(
      { email },
      { $set: { status: "active" }, $setOnInsert: { source: "footer" } },
      { upsert: true }
    );
    return ok({ message: "Thank you for subscribing." }, 201);
  } catch (e) {
    if (e?.code === 11000) return ok({ message: "Thank you for subscribing." }, 201);
    return fromError(e, "POST /api/subscribe", "Could not subscribe. Please try again.");
  }
}
