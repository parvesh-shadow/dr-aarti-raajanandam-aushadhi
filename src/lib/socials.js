// Supported social platforms (admin dropdown + site icons)
export const SOCIAL_PLATFORMS = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "youtube", label: "YouTube" },
  { value: "x", label: "X (Twitter)" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telegram", label: "Telegram" },
  { value: "other", label: "Other website" },
];

export const platformLabel = (v) => SOCIAL_PLATFORMS.find((p) => p.value === v)?.label || "Website";

// "https://www.instagram.com/raajanandam_aushadhi/" -> "@raajanandam_aushadhi"
export function handleFromUrl(url) {
  try {
    const seg = new URL(url).pathname.split("/").filter(Boolean)[0];
    return seg ? `@${seg.replace(/^@/, "")}` : url;
  } catch {
    return url;
  }
}
