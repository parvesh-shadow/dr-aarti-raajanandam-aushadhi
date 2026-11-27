// // import { Leaf } from "lucide-react";
// // import TitleDescription from "@/components/shared/TitleDescription";
// // import FeaturedCard from "@/components/shared/FeaturedCard";

// // const TOPICS = [
// //   {
// //     heading: "Understanding Your Fertility",
// //     description:
// //       "Learn how the menstrual cycle, ovulation, and fertile window relate to conception.",
// //   },
// //   {
// //     heading: "Preconception Wellness",
// //     description:
// //       "Understand how nutrition, daily habits, sleep, movement, and overall wellness can support reproductive health.",
// //   },
// //   {
// //     heading: "Nutrition for Fertility",
// //     description:
// //       "Explore the role of balanced nutrition and essential nutrients in supporting overall reproductive wellness.",
// //   },
// //   {
// //     heading: "Healthy Menstrual Cycles",
// //     description:
// //       "Learn about menstrual cycle patterns, tracking, and what changes may be worth discussing with a healthcare professional.",
// //   },
// //   {
// //     heading: "Stress & Lifestyle",
// //     description:
// //       "Discover healthy approaches to managing stress, improving sleep, and building sustainable wellness routines.",
// //   },
// //   {
// //     heading: "When to Seek Support",
// //     description:
// //       "When it may be helpful to speak with a qualified fertility or healthcare professional for personalized guidance.",
// //   },
// // ];

// // export default function LearnSection() {
// //   return (
// //     <section
// //       aria-labelledby="learn-heading"
// //       className="mx-auto  py-10  sm:py-14 px-4 sm:px-6 lg:px-8 lg:px-20 "
// //     >
// //       <TitleDescription
// //         id="learn-heading"
// //         heading="Learn. Understand. Feel More Informed."
// //         description="Learn about fertility, reproductive wellness, and the everyday factors that can influence your journey toward conception. Explore informative guidance on menstrual health, ovulation, nutrition, lifestyle, stress management, and healthy routines."
// //         align="center"
// //         contentClassName="max-w-3xl"
// //       />

// //       <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-3">
// //         {TOPICS.map((topic) => (
// //           <li key={topic.heading}>
// //             <FeaturedCard
// //               heading={topic.heading}
// //               description={topic.description}
// //               icon={Leaf}
// //             />
// //           </li>
// //         ))}
// //       </ul>
// //     </section>
// //   );
// // }
// import {
//   CalendarDays,
//   Sprout,
//   Apple,
//   Droplets,
//   Moon,
//   Stethoscope,
// } from "lucide-react";
// import TitleDescription from "@/components/shared/TitleDescription";
// import FeaturedCard from "@/components/shared/FeaturedCard";

// const TOPICS = [
//   {
//     heading: "Understanding Your Fertility",
//     description:
//       "Learn how the menstrual cycle, ovulation, and fertile window relate to conception.",
//     icon: CalendarDays,
//   },
//   {
//     heading: "Preconception Wellness",
//     description:
//       "Understand how nutrition, daily habits, sleep, movement, and overall wellness can support reproductive health.",
//     icon: Sprout,
//   },
//   {
//     heading: "Nutrition for Fertility",
//     description:
//       "Explore the role of balanced nutrition and essential nutrients in supporting overall reproductive wellness.",
//     icon: Apple,
//   },
//   {
//     heading: "Healthy Menstrual Cycles",
//     description:
//       "Learn about menstrual cycle patterns, tracking, and what changes may be worth discussing with a healthcare professional.",
//     icon: Droplets,
//   },
//   {
//     heading: "Stress & Lifestyle",
//     description:
//       "Discover healthy approaches to managing stress, improving sleep, and building sustainable wellness routines.",
//     icon: Moon,
//   },
//   {
//     heading: "When to Seek Support",
//     description:
//       "When it may be helpful to speak with a qualified fertility or healthcare professional for personalized guidance.",
//     icon: Stethoscope,
//   },
// ];

// export default function LearnSection() {
//   return (
//     <section
//       aria-labelledby="learn-heading"
//       className="mx-auto  py-10  sm:py-14 px-4 sm:px-6 lg:px-8 lg:px-20 "
//     >
//       <TitleDescription
//         id="learn-heading"
//         heading="Learn. Understand. Feel More Informed."
//         description="Learn about fertility, reproductive wellness, and the everyday factors that can influence your journey toward conception. Explore informative guidance on menstrual health, ovulation, nutrition, lifestyle, stress management, and healthy routines."
//         align="center"
//         contentClassName="max-w-3xl"
//       />

//       <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-3">
//         {TOPICS.map((topic) => (
//           <li key={topic.heading}>
//             <FeaturedCard
//               heading={topic.heading}
//               description={topic.description}
//               icon={topic.icon}
//             />
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }
import Image from "next/image";
import TitleDescription from "@/components/shared/TitleDescription";

import imgFertility from "@/assets/learn-fertility.jpeg";
import imgPreconception from "@/assets/learn-preconception.jpeg";
import imgNutrition from "@/assets/learn-nutrition.jpeg";
import imgMenstrual from "@/assets/learn-menstrual.jpeg";
import imgStress from "@/assets/learn-stress.jpeg";
import imgSupport from "@/assets/learn-support.jpeg";

const TOPICS = [
  {
    heading: "Understanding Your Fertility",
    description:
      "Learn how the menstrual cycle, ovulation, and fertile window relate to conception.",
    image: imgFertility,
  },
  {
    heading: "Preconception Wellness",
    description:
      "Understand how nutrition, daily habits, sleep, movement, and overall wellness can support reproductive health.",
    image: imgPreconception,
  },
  {
    heading: "Nutrition for Fertility",
    description:
      "Explore the role of balanced nutrition and essential nutrients in supporting overall reproductive wellness.",
    image: imgNutrition,
  },
  {
    heading: "Healthy Menstrual Cycles",
    description:
      "Learn about menstrual cycle patterns, tracking, and what changes may be worth discussing with a healthcare professional.",
    image: imgMenstrual,
  },
  {
    heading: "Stress & Lifestyle",
    description:
      "Discover healthy approaches to managing stress, improving sleep, and building sustainable wellness routines.",
    image: imgStress,
  },
  {
    heading: "When to Seek Support",
    description:
      "When it may be helpful to speak with a qualified fertility or healthcare professional for personalized guidance.",
    image: imgSupport,
  },
];

export default function LearnSection() {
  return (
    <section
      aria-labelledby="learn-heading"
      className="mx-auto px-4 py-10 sm:px-6 sm:py-14 lg:px-20"
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
            <article className="h-full border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md">
              {/* Image at icon size */}
              <div className="relative h-14 w-14 overflow-hidden rounded-full">
                <Image
                  src={topic.image}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                {topic.heading}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-[15px]">
                {topic.description}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}