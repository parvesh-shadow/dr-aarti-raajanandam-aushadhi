import FAQ from "@/components/shared/FAQ";

const CONTACT_FAQS = [
  {
    question: "How can I check my order status?",
    answer:
      "Log in to your account and open the My Orders section to view available order updates.",
  },
  {
    question: "How can I ask about product ingredients?",
    answer:
      "Select Product enquiry in the contact form and mention the product name. You can also review the product label and product page for ingredient details.",
  },
  {
    question: "How do I request a return or refund?",
    answer:
      "Select Payment & refund in the contact form with your order number. Returns and refunds are handled under the applicable store policy.",
  },
  {
    question: "When will I receive a response?",
    answer:
      "Our team aims to respond as soon as possible. Response times may vary depending on the volume of enquiries.",
  },
];

export default function ContactFAQ() {
  return (
    <FAQ
      heading="Everything You Need to Know"
      description="Learn more about our approach to Ayurveda, our products, and the care we aim to provide throughout your wellness journey."
      items={CONTACT_FAQS}
    />
  );
}