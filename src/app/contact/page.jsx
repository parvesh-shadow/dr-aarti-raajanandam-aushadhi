import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import HelpTopics from "@/components/contact/HelpTopics";
import ContactFAQ from "@/components/contact/ContactFAQ";

export const metadata = {
  title: "Contact Us | Raaj Anandam Aushadhi",
  description:
    "Have a question about our products or need assistance with your order? Our team is here to help you find the information you need.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <HelpTopics />
      <ContactFAQ />
    </>
  );
}