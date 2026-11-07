import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { guard } from "@/lib/security";
import { verifyAdmin } from "@/middlewares/verifyAdmin";
import { ok, fail } from "@/lib/api";

export const runtime = "nodejs";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

// Asli image ki pehchaan magic bytes se
function detect(buf) {
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.length > 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buf.length > 12 && buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP") return "webp";
  return null;
}

export async function POST(req) {
  const { error } = await verifyAdmin(req);
  if (error) return error;
  const blocked = guard(req, { name: "admin-upload", limit: 200, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;

  if (Number(req.headers.get("content-length")) > MAX_SIZE + 1024 * 1024) return fail("Image must be under 5 MB.", 413);
  let form;
  try {
    form = await req.formData();
  } catch {
    return fail("Invalid upload.", 400);
  }
  const file = form.get("file");
  if (!file || typeof file === "string") return fail("Select an image.");
  if (file.size > MAX_SIZE) return fail("Image must be under 5 MB.", 413);

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = detect(buffer);
  if (!ext) return fail("Only JPG, PNG or WEBP images are allowed.", 415);

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const name = crypto.randomBytes(12).toString("hex") + "." + ext;
  await fs.writeFile(path.join(UPLOAD_DIR, name), buffer);
  return ok({ url: "/api/uploads/" + name }, 201);
}
