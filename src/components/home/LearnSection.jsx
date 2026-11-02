import { Leaf } from "lucide-react";
import TitleDescription from "@/components/shared/TitleDescription";
import FeaturedCard from "@/components/shared/FeaturedCard";

const TOPICS = [
  {
    heading: "Understanding Your Fertility",
    description:
      "Learn how the menstrual cycle, ovulation, and fertile window relate to conception.",
  },
  {
    heading: "Preconception Wellness",
    description:
      "Understand how nutrition, daily habits, sleep, movement, and overall wellness can support reproductive health.",
  },
  {
    heading: "Nutrition for Fertility",
    description:
      "Explore the role of balanced nutrition and essential nutrients in supporting overall reproductive wellness.",
  },
  {
    heading: "Healthy Menstrual Cycles",
    description:
      "Learn about menstrual cycle patterns, tracking, and what changes may be worth discussing with a healthcare professional.",
  },
  {
    heading: "Stress & Lifestyle",
    description:
      "Discover healthy approaches to managing stress, improving sleep, and building sustainable wellness routines.",
  },
  {
    heading: "When to Seek Support",
    description:
      "When it may be helpful to speak with a qualified fertility or healthcare professional for personalized guidance.",
  },
];

export default function LearnSection() {
  return (
    <section
      aria-labelledby="learn-heading"
      className="mx-auto  py-10  sm:py-14 px-4 sm:px-6 lg:px-8 lg:px-20 "
    >
      <TitleDescription
        id="learn-heading"
        heading="Learn. Understand. Feel More Informed."
        description="Learn about fertility, reproductive wellness, and the everyday factors that can influence your journey toward conception. Explore informative guidance on menstrual health, ovulation, nutrition, lifestyle, stress management, and healthy routines."
        align="center"
        contentClassName="max-w-3xl"
      />

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-3">
        {TOPICS.map((topic) => (
          <li key={topic.heading}>
            <FeaturedCard
              heading={topic.heading}
              description={topic.description}
              icon={Leaf}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}