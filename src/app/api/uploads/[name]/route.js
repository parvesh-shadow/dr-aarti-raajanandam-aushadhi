import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");
const TYPES = { webp: "image/webp", jpg: "image/jpeg", png: "image/png", pdf: "application/pdf" };

export async function GET(req, { params }) {
  const { name } = await params;

  if (!/^[a-z0-9]+\.(webp|jpg|png|pdf)$/.test(name)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const file = await fs.readFile(path.join(UPLOAD_DIR, name));
    return new Response(file, {
      headers: {
        "Content-Type": TYPES[name.split(".")[1]],
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}