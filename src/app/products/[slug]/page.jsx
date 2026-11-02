import ProductGallery from "@/components/product-detail/ProductGallery";
import ProductInfo from "@/components/product-detail/ProductInfo";
import ProductTabs from "@/components/product-detail/ProductTabs";
import Ingredients from "@/components/product-detail/Ingredients";
import Reviews from "@/components/product-detail/Reviews";
import ProductFAQ from "@/components/product-detail/ProductFAQ";

const image1="/ingredient1.jpg";
const image2="/ingredient2.jpg";

const product1 ="/prodetail1.jpg";
const product2 ="/prodetail2.jpg";
const product3 ="/prodetail3.jpg";
const product4 ="/prodetail4.jpg";
const product5 ="/prodetail5.jpg";

// ---------- Dummy data (image: null -> lucide placeholder) ----------
const PRODUCT = {
  category: "Ayurvedic Hair Care",
  name: "Root Tricks Hair Care Capsules",
  rating: 4.8,
  reviewCount: 36,
  price: 895,
  stock: 18,
  description:
    "Root Tricks Hair Care Capsules are an Ayurvedic hair care formulation designed to complement your regular hair wellness routine. Explore product information, pack details, and usage instructions to make an informed purchase.",
  netQuantity: "800 mg",
  type: "Ayurvedic product",
  about:
    "Make Root Tricks Hair Care Capsules part of your hair wellness shopping routine. The product is presented in a convenient capsule format, with 60 capsules per pack. Review the available product information and label instructions before use.",
  specs: [
    ["Product Specifications", "Root Tricks Hair Care Capsules"],
    ["Category", "Hair Care"],
    ["Strength", "800 mg"],
    ["Pack Size", "60 Capsules"],
    ["Product Type", "Ayurvedic Product"],
    ["Price", "₹895"],
    ["Availability", "Refer to product label or published instructions"],
  ],

  // Benefits tab
  benefitsIntro:
    "Root Tricks Hair Care Capsules are designed to complement your personal hair wellness routine. Explore the product information and packaging details to understand its intended use before purchasing.",
  benefits: [
    {
   
      title: "Ayurvedic Hair Care",
      description:
        "An Ayurvedic product within the hair care and wellness category.",
    },
    {

      title: "Everyday Hair Wellness",
      description:
        "Designed to complement your regular personal hair care routine.",
    },
    {
     
      title: "Clear Product Guidance",
      description:
        "Refer to the official packaging for verified benefits, intended uses, ingredients, and directions.",
    },
  ],

  // Usage tab
  usageIntro:
    "Root Tricks Hair Care Capsules are presented in a convenient capsule format, with 60 capsules per pack. Review the available product information and label instructions before use.",
  usage: [
    {
      question: "Read the Product Label",
      answer:
        "Check the ingredients, recommended dosage, directions for use, and any warnings provided on the packaging.",
    },
    {
      question: "Follow the Recommended Dosage",
      answer:
        "Use the capsules only as directed on the product label or as advised by a qualified healthcare professional.",
    },
    {
      question: "Check Ingredients & Precautions",
      answer:
        "Review the complete ingredient list and precautions on the label, especially if you have allergies or a health condition.",
    },
    {
      question: "Seek Professional Advice When Needed",
      answer:
        "Consult a qualified healthcare professional before use if you are pregnant, have a health condition, or take other medicines.",
    },
  ],
};

const GALLERY = [product1, product2, product3, product4, product5];

const INGREDIENTS = [
  { name: "Amla", description: "A traditional Ayurvedic ingredient commonly featured in hair care formulations.", image: image1 },
  { name: "Bhringraj", description: "A well-known Ayurvedic herb traditionally associated with hair care.", image: image2 },
  { name: "Neem", description: "A traditional botanical used in various Ayurvedic wellness preparations.", image: image1 },
  { name: "Brahmi", description: "A traditional Ayurvedic herb used in wellness preparations.", image: image2 },
];

const BREAKDOWN = [
  { label: "5.0 Excellent", count: 45 },
  { label: "4.0 Good", count: 30 },
  { label: "3.0 Average", count: 22 },
  { label: "2.0 Poor", count: 10 },
  { label: "1.0 Bad", count: 2 },
];

const REVIEWS = [
  {
    id: 1,
    rating: 5,
    title: "A Convenient Addition to My Hair Care Routine",
    text: "The ordering process was very simple, and my product arrived well packed. I also appreciated the clear information provided on the website.",
    name: "Priya S.",
    time: "2 Months ago",
  },
  {
    id: 2,
    rating: 5,
    title: "Clear Product Information",
    text: "I liked being able to check the pack size and product information before ordering. The capsule format is convenient and easy to incorporate into a daily routine. The product page provides a helpful starting point for understanding the product, and the packaging is neat and compact.",
    name: "Neha R.",
    time: "2 Months ago",
  },
  {
    id: 3,
    rating: 5,
    title: "Would Like More Ingredient Details",
    text: "I would like more information about the ingredients and recommended usage so I can better understand the product before use. The product page provides the basic details, including the pack size and capsule format, but a complete ingredient list would make it easier to make an informed decision. Clear dosage instructions, precautions, and storage information would also be helpful.",
    name: "Anita M",
    time: "2 Months ago",
  },
];

const FAQS = [
  {
    question: "What are Root Tricks Hair Care Capsules?",
    answer:
      "Root Tricks Hair Care Capsules are an Ayurvedic hair care product designed to complement your personal hair wellness routine.",
  },
  {
    question: "What is the pack size of this product?",
    answer: "Each pack contains 60 capsules of 800 mg.",
  },
  {
    question: "What ingredients are used in Root Tricks Hair Care Capsules?",
    answer:
      "Please review the product label for the complete ingredient list, quantities and formulation details.",
  },
  {
    question: "How should I take these capsules?",
    answer:
      "Follow the directions and precautions given on the product label, or consult a qualified healthcare professional.",
  },
  {
    question: "Can these capsules help with hair fall or hair growth?",
    answer:
      "Individual experiences vary. The product is presented as a part of a hair wellness routine and no guaranteed results are promised.",
  },
  {
    question: "Are Root Tricks Hair Care Capsules suitable for everyone?",
    answer:
      "Not always. Please consult a qualified healthcare professional before use, especially if you are pregnant, have a health condition or take other medicines.",
  },
];

export const metadata = {
  title: "Root Tricks Hair Care Capsules | Raaj Anandam Aushadhi",
  description:
    "Root Tricks Hair Care Capsules are an Ayurvedic hair care formulation designed to complement your regular hair wellness routine.",
};

export default function ProductDetailPage() {
  return (
    <>
      {/* Top: gallery (fixed width) + details (flex-1) */}
      <section
        aria-label="Product details"
        className="mx-auto flex  flex-col gap-8 xl:gap-12 py-8  sm:py-8 lg:flex-row lg:items-start px-4 sm:px-6 lg:px-8 lg:px-20 xl:px-40"
      >
        <ProductGallery
          images={GALLERY}
          name={PRODUCT.name}
          className="lg:sticky lg:top-28 lg:w-1/2 lg:shrink-0"
        />

        <div className="min-w-0 flex-1 space-y-8">
          <ProductInfo product={PRODUCT} />
          <ProductTabs product={PRODUCT} />
          <Ingredients
            heading="Ayurvedic Ingredients for Hair Care"
            description="Discover the ingredients in Root Tricks Hair Care Capsules and learn how they fit into your hair wellness routine. Review the product label for the complete ingredient list, quantities, and formulation details."
            items={INGREDIENTS}
          />
        </div>
      </section>

      <Reviews
        heading="Trusted by Our Hair Wellness Community"
        description="Hear from customers about their experience with Root Tricks Hair Care Capsules, from product information and packaging to ordering and customer service."
        overall={4.0}
        totalLabel="Based on 100 reviews"
        breakdown={BREAKDOWN}
        initialReviews={REVIEWS}
      />

      <ProductFAQ items={FAQS} />
    </>
  );
}