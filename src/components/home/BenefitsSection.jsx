import { Leaf, Settings, ShieldCheck, Truck } from "lucide-react";

const BENEFITS = [
  {
    icon: Leaf,
    title: "Ayurvedic Wellness",
    description: "Traditional wellness knowledge",
  },
  {
    icon: Settings,
    title: "Quality Focused",
    description: "Carefully selected products",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Safe online checkout",
  },
  {
    icon: Truck,
    title: "Convenient Delivery",
    description: "Order from anywhere",
  },
];

export default function BenefitsSection() {
  return (
    <section aria-label="Our benefits" className="bg-[#35363A] text-white">
      <ul className="mx-auto grid  grid-cols-1 gap-5  py-5 sm:grid-cols-2  lg:grid-cols-4 px-4 sm:px-6 lg:px-8 lg:px-20">
        {BENEFITS.map(({ icon: Icon, title, description }) => (
          <li key={title} className="flex items-center gap-3 lg:justify-center">
            <Icon className="h-6 w-6 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            <div>
              <h3 className="text-lg font-medium sm:text-base">{title}</h3>
              <p className="text-sm text-gray-200 sm:text-sm">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}