import FAQ from "@/components/shared/FAQ";

const MEDICINES_FAQS = [
  {
    question: "What types of Ayurvedic products are available?",
    answer:
      "Explore a range of Ayurvedic wellness products across categories such as hair care, women’s wellness, reproductive wellness, and general health support. Available products and categories may vary.",
  },
  {
    question: "How do I find the right product for my needs?",
    answer:
      "Use the search box or the category buttons to narrow down products. For personalised guidance, you can book a consultation or contact our team.",
  },
  {
    question: "How can I view product details?",
    answer:
      "Each product card shows the name, pack size, price and a short description. Detailed information is available on the product page.",
  },
  {
    question: "Are product prices and availability displayed on the website?",
    answer:
      "Yes. Prices and stock status are shown on every product card. Availability may change, so please check at checkout.",
  },
  {
    question: "How do I purchase an Ayurvedic product?",
    answer:
      "Click Buy Now to go to checkout, or use the bag icon to add the product to your cart and complete your order later.",
  },
  {
    question: "Where can I find dosage and usage instructions?",
    answer:
      "Directions and precautions are given on the product label and the product page. Please consult a qualified healthcare professional if you have any health condition.",
  },
];

export default function MedicinesFAQ() {
  return (
    <FAQ
      heading="Everything You Need to Know"
      description="Learn more about our approach to Ayurveda, our products, and the care we aim to provide throughout your wellness journey."
      items={MEDICINES_FAQS}
    />
  );
}