import { CalendarCheck, CreditCard, Package, Sprout } from "lucide-react";
import FeaturedCard from "@/components/shared/FeaturedCard";

const TOPICS = [
  {
    icon: Sprout,
    heading: "Product Information",
    description:
      "Ask about product details, ingredients, packaging, and manufacturer-provided usage instructions.",
  },
  {
    icon: Package,
    heading: "Orders & Delivery",
    description:
      "Get assistance with order confirmation, shipping status, delivery, and tracking.",
  },
  {
    icon: CreditCard,
    heading: "Payments & Refunds",
    description:
      "Contact us about payment issues, cancellations, returns, and refunds under the applicable store policy.",
  },
  {
    icon: CalendarCheck,
    heading: "Appointment Enquiries",
    description:
      "Ask about appointment availability and booking procedures, where this service is offered.",
  },
];

export default function HelpTopics() {
  return (
    <section
      aria-labelledby="help-heading"
      className="py-8 px-4 sm:px-6 lg:px-8 lg:px-20"
    >
      <h2 id="help-heading" className="xl:text-[24px] text-lg  font-medium text-black">
        How Can We Help?
      </h2>

      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TOPICS.map((topic) => (
          <li key={topic.heading}>
            <FeaturedCard {...topic} />
          </li>
        ))}
      </ul>
    </section>
  );
}