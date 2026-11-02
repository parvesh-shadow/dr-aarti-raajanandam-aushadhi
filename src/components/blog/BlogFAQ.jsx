import FAQ from "@/components/shared/FAQ";

const BLOG_FAQS = [
  {
    question: "What can I read on the Raaj Anandam Aushadhi blog?",
    answer:
      "Our blog covers Ayurvedic traditions, herbal ingredients, daily wellness, hair care, product education, and mindful self-care.",
  },
  {
    question: "Are the blog articles written by Ayurvedic experts?",
    answer:
      "Our articles are prepared for general educational purposes. For personal medical advice, please consult a qualified healthcare professional.",
  },
  {
    question: "How often are new blog articles published?",
    answer:
      "New articles are added regularly. Please check back often or follow us on Instagram for updates.",
  },
  {
    question: "Can I search for a specific topic?",
    answer:
      "Yes. Use the category buttons at the top of the page to browse articles by topic.",
  },
];

export default function BlogFAQ() {
  return (
    <FAQ
      heading="Everything You Need to Know"
      description="Learn more about our approach to Ayurveda, our products, and the care we aim to provide throughout your wellness journey."
      items={BLOG_FAQS}
    />
  );
}