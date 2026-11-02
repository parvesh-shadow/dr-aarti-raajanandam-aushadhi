import FAQ from "@/components/shared/FAQ";

const DETAIL_FAQS = [
  {
    question: "What is Ayurveda?",
    answer:
      "Ayurveda is a traditional system of wellness originating in India. It emphasizes daily routines, lifestyle practices, diet, and a holistic perspective on well-being.",
  },
  {
    question: "How can I include Ayurvedic principles in my daily routine?",
    answer:
      "Start with small, sustainable habits such as regular sleep and waking times, mindful eating, suitable movement and time to unwind.",
  },
  {
    question: "What are common Ayurvedic wellness practices?",
    answer:
      "Common areas include daily routines, mindful eating, rest and relaxation, movement and learning about traditional herbs and their precautions.",
  },
  {
    question: "Are Ayurvedic herbs safe for everyone?",
    answer:
      "Not always. Natural origin alone does not guarantee that a product is safe or suitable for everyone. Please consult a qualified healthcare professional if you have a health condition or take other medicines.",
  },
];

export default function BlogDetailFAQ() {
  return (
    <FAQ
      heading="Everything You Need to Know"
      description="Learn more about our approach to Ayurveda, our products, and the care we aim to provide throughout your wellness journey."
      items={DETAIL_FAQS}
    />
  );
}