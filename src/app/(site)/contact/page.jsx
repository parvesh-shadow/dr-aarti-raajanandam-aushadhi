import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import HelpTopics from "@/components/contact/HelpTopics";
import ContactFAQ from "@/components/contact/ContactFAQ";
import { findSocial, getSiteSettings } from "@/lib/siteSettings";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact Us | Raaj Anandam Aushadhi",
  description:
    "Have a question about our products or need assistance with your order? Our team is here to help you find the information you need.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <ContactHero />
      <ContactForm
        phone={settings.phone}
        email={settings.email}
        instagramUrl={findSocial(settings, "instagram")?.url || ""}
      />
      <HelpTopics />
      <ContactFAQ />
    </>
  );
}
