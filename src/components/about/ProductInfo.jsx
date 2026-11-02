import { BookOpenCheck, FileCheck, Headphones, ShieldCheck } from "lucide-react";
import TitleDescription from "@/components/shared/TitleDescription";
import FeaturedCard from "@/components/shared/FeaturedCard";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";


// Asli image lagane ke liye: import herbsImage from "@/assets/herbs.jpg"; aur IMAGE = herbsImage
const IMAGE ="/productinfo.jpg" || null;

const POINTS = [
  {
    icon: FileCheck,
    heading: "Product Transparency",
    description: "Clear product descriptions and available ingredient information.",
  },
  {
    icon: BookOpenCheck,
    heading: "Usage Guidance",
    description: "Directions and precautions presented according to product labelling.",
  },
  {
    icon: ShieldCheck,
    heading: "Responsible Information",
    description: "Avoiding unsupported health claims and guaranteed fertility outcomes.",
  },
  {
    icon: Headphones,
    heading: "Customer Care",
    description: "Support for product questions, orders and appointment enquiries.",
  },
];

export default function ProductInfo() {
  return (
    <section
      aria-labelledby="product-info-heading"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
    >
      <TitleDescription
        id="product-info-heading"
        heading="Thoughtful Products. Clear Information."
        description="Build customer trust by explaining how Dr. Arti’s Raaj Anandam Aushadhi presents product information, shares responsible usage guidance and supports customers throughout their shopping journey."
        align="center"
        contentClassName="max-w-3xl"
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="grid gap-4 sm:grid-cols-2">
          {POINTS.map((item) => (
            <FeaturedCard key={item.heading} {...item} />
          ))}
        </div>

        <ImagePlaceholder
          src={IMAGE}
          alt="Ayurvedic herbs and ingredients"
          label="Ayurvedic ingredients"
          sizes="(min-width: 1024px) 45vw, 90vw"
          className="min-h-64"
        />
      </div>
    </section>
  );
}