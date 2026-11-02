import Hero from "@/components/home/Hero";
import Benefits from "@/components/home/BenefitsSection";
import EverydayEssentials from "@/components/home/EverydayEssentials";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Founder from "@/components/home/Founder";
import LearnSection from "@/components/home/LearnSection";
import Testimonial from "@/components/home/Testimonial";
import BlogSlider from "@/components/home/BlogSlider";
import Instagram from "@/components/home/Instagram";
import CTA from "@/components/home/CTA";
import FAQ from "@/components/shared/FAQ";

const HOME_FAQS = [
  {
    question: "What is Dr. Arti’s Raaj Anandam Aushadhi?",
    answer:
      "Dr. Arti’s Raaj Anandam Aushadhi is an Ayurvedic wellness brand offering a range of Ayurvedic medicines and wellness products. Customers can explore product information, place orders online and connect with the team for appointments and assistance.",
  },
  {
    question: "How can I purchase Ayurvedic products online?",
    answer:
      "Browse the products page, choose the product you want and click Buy Now or add it to your cart. Then complete the checkout with your delivery details and payment.",
  },
  {
    question: "How can I know which product is suitable for me?",
    answer:
      "Each product page shares clear information about the formulation and its intended use. For personalised guidance, you can book an online consultation or contact our team.",
  },
  {
    question: "Are the products Ayurvedic?",
    answer:
      "Yes. Our products are inspired by traditional Ayurvedic principles and made in India.",
  },
  {
    question: "How do I use an Ayurvedic product?",
    answer:
      "Usage instructions are given on the product label and the product page. If you have a health condition or take other medicines, please consult a qualified healthcare professional first.",
  },
  {
    question: "Can I order without creating an account?",
    answer:
      "Yes, you can place an order as a guest. Creating an account is optional and helps you track orders and reorder faster.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <EverydayEssentials />
      <WhyChooseUs />
      <Founder />
      <LearnSection />
      <Testimonial />
      <BlogSlider />
      <Instagram />
      <FAQ
        heading="Everything You Need to Know"
        description="Find answers to common questions about our Ayurvedic products, ordering, delivery, payments, appointments and customer support."
        items={HOME_FAQS}
      />
      <CTA />
    </>
  );
}