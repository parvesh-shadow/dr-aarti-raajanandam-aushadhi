import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { guard } from "@/lib/security";
import { verifyAdmin } from "@/middlewares/verifyAdmin";

export const runtime = "nodejs";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

const fail = (error, status = 400) =>
  NextResponse.json({ ok: false, error }, { status });

export async function POST(req) {
  const { error } = await verifyAdmin(req);
  if (error) return error;
  const blocked = guard(req, { name: "admin-upload", limit: 200, windowMs: 60 * 60 * 1000 });
  if (blocked) return blocked;

  if (Number(req.headers.get("content-length")) > MAX_SIZE + 1024 * 1024) return fail("PDF must be under 10 MB.", 413);
  let form;
  try {
    form = await req.formData();
  } catch {
    return fail("Invalid upload.", 400);
  }
  const file = form.get("file");
  if (!file || typeof file === "string") return fail("Select a PDF file.");
  if (file.size > MAX_SIZE) return fail("PDF must be under 10 MB.", 413);

  const buffer = Buffer.from(await file.arrayBuffer());
  // Asli PDF hamesha "%PDF-" se shuru hoti hai
  if (buffer.subarray(0, 5).toString("ascii") !== "%PDF-") {
    return fail("Only PDF files are allowed.", 415);
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const name = crypto.randomBytes(12).toString("hex") + ".pdf";
  await fs.writeFile(path.join(UPLOAD_DIR, name), buffer);

  return NextResponse.json({ ok: true, url: "/api/uploads/" + name }, { status: 201 });
}