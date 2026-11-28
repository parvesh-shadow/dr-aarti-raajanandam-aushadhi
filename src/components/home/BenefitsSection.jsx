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

// Copies of the list in the track. The track moves by exactly one copy
// (100 / COPIES %), so the loop is seamless on any screen width.
const COPIES = 4;

export default function BenefitsSection() {
  return (
    <section
      aria-label="Our benefits"
      className="benefits-marquee overflow-hidden bg-[#EBDAF3] text-[#3B2A4A]"
    >
      <style>{`
        @keyframes benefits-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-${100 / COPIES}%); }
        }
        .benefits-track {
          animation: benefits-scroll 30s linear infinite;
          will-change: transform;
        }
        .benefits-marquee:hover .benefits-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .benefits-track { animation: none; }
        }
      `}</style>

      <div className="benefits-track flex w-max py-2 sm:py-5">
        {Array.from({ length: COPIES }).map((_, copy) => (
          <ul
            key={copy}
            aria-hidden={copy > 0 || undefined}
            className="flex shrink-0 items-center gap-8 pr-8 sm:gap-16 sm:pr-16 lg:gap-24 lg:pr-24"
          >
            {BENEFITS.map(({ icon: Icon, title, description }) => (
              <li
                key={title}
                className="flex shrink-0 items-center gap-2 whitespace-nowrap sm:gap-3"
              >
                <Icon
                  className="h-5 w-5 shrink-0 sm:h-6 sm:w-6"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-sm font-medium leading-tight sm:text-base">
                    {title}
                  </h3>
                  <p className="text-xs leading-tight text-[#5E4A70] sm:text-sm">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}