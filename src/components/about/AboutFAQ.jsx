import FAQ from "@/components/shared/FAQ";

const ABOUT_FAQS = [
  {
    question: "What is Dr. Arti’s Raaj Anandam Aushadhi?",
    answer:
      "Dr. Arti’s Raaj Anandam Aushadhi is an Ayurvedic wellness brand focused on presenting Ayurvedic products with clear product information, usage guidance, and customer support to help people make informed choices.",
  },
  {
    question: "What is the philosophy behind Raaj Anandam Aushadhi?",
    answer:
      "We believe Ayurveda should be approachable, understandable and connected to everyday wellbeing, with information shared responsibly and without unrealistic promises.",
  },
  {
    question: "Who is Dr. Arti Panwar?",
    answer:
      "Dr. Arti Panwar (MS - Obstetrician & Gynaecologist) is the founder of Raaj Anandam Aushadhi. Her professional background informs the brand’s focus on women’s wellbeing and fertility awareness.",
  },
  {
    question: "Do you offer products for women’s reproductive wellness?",
    answer:
      "Yes. Our range includes Ayurvedic products for women’s wellness. Please see each product page for details and usage guidance.",
  },
  {
    question: "How can I learn about a product before purchasing?",
    answer:
      "Each product page shares clear descriptions, ingredient information and directions. You can also contact our team or book a consultation for questions.",
  },
  {
    question: "Are Ayurvedic products suitable for everyone?",
    answer:
      "Not always. Every person is different, so please consult a qualified healthcare professional before use, especially if you are pregnant, have a health condition or take other medicines.",
  },
];

export default function AboutFAQ() {
  return (
    <FAQ
      heading="Everything You Need to Know"
      description="Learn more about our approach to Ayurveda, our products, and the care we aim to provide throughout your wellness journey."
      items={ABOUT_FAQS}
    />
  );
}