import { SOCIAL_PLATFORMS } from "@/lib/socials";

const s = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const PLATFORMS = new Set(SOCIAL_PLATFORMS.map((p) => p.value));

export function parseSettings(body) {
  const b = body && typeof body === "object" ? body : {};
  const errors = [];

  const phone = s(b.phone, 20);
  const email = s(b.email, 150).toLowerCase();
  if (phone && !/^\+?[\d\s()-]{7,20}$/.test(phone)) errors.push("Enter a valid phone number.");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Enter a valid email address.");

  const socials = [];
  for (const row of (Array.isArray(b.socials) ? b.socials : []).slice(0, 15)) {
    const platform = s(row?.platform, 20);
    const url = s(row?.url, 300);
    if (!platform && !url) continue; // khali row skip
    if (!PLATFORMS.has(platform)) {
      errors.push("Select a valid platform.");
      break;
    }
    let ok = false;
    try {
      ok = new URL(url).protocol === "https:";
    } catch {}
    if (!ok) {
      errors.push(`Enter a valid link starting with https:// for ${platform}.`);
      break;
    }
    socials.push({ platform, url });
  }

  return { errors, data: { phone, email, socials } };
}
