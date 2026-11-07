import { connectMongo } from "@/lib/mongo";
import SiteSettings from "@/models/SiteSettings";

// Admin ne abhi kuch save nahi kiya to wahi purani values dikhengi (site ka look same rahega)
export const DEFAULT_SETTINGS = {
  phone: "+91 98765 43210",
  email: "raajanandamofficial@gmail.com",
  socials: [
    { platform: "instagram", url: "https://www.instagram.com/raajanandam_aushadhi" },
    { platform: "facebook", url: "https://www.facebook.com" },
    { platform: "youtube", url: "https://www.youtube.com" },
    { platform: "x", url: "https://x.com" },
  ],
};

export async function getSiteSettings() {
  try {
    await connectMongo();
    const doc = await SiteSettings.findOne({ key: "site" }).lean();
    if (!doc) return DEFAULT_SETTINGS;
    return {
      phone: doc.phone ?? "",
      email: doc.email ?? "",
      socials: (doc.socials || []).map((s) => ({ platform: s.platform, url: s.url })),
    };
  } catch (e) {
    console.error("getSiteSettings:", e.message);
    return DEFAULT_SETTINGS;
  }
}

export const findSocial = (settings, platform) => settings.socials.find((s) => s.platform === platform);
