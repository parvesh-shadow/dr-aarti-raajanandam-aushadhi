import { BookOpen, HeartHandshake, Leaf } from "lucide-react";
import FeaturedCard from "@/components/shared/FeaturedCard";

const VALUES = [
  {
    icon: HeartHandshake,
    heading: "Compassionate Support",
    description: "Respecting each woman’s individual experience and needs.",
  },
  {
    icon: BookOpen,
    heading: "Fertility Education",
    description: "Making reproductive health information easier to understand.",
  },
  {
    icon: Leaf,
    heading: "Ayurvedic Wellness",
    description:
      "Exploring traditional practices with responsible, informed guidance.",
  },
];

export default function Values() {
  return (
    <section
      aria-label="Our values"
      className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-10 sm:grid-cols-3 sm:gap-5 sm:px-6 sm:py-14 lg:px-8"
    >
      {VALUES.map((item) => (
        <FeaturedCard key={item.heading} {...item} />
      ))}
    </section>
  );
}