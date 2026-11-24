// import { Leaf } from "lucide-react";

// export default function FeaturedCard({
//   icon: Icon = Leaf,
//   heading,
//   description,
//   className = "",
// }) {
//   return (
//     <article
//       className={`h-full border border-[#E5E5E5] bg-white p-5 transition-colors hover:border-[#C5A84C] sm:p-6 ${className}`}
//     >
//       <Icon
//         className="h-6 w-6 text-[#C5A84C] sm:h-10 sm:w-10"
//         strokeWidth={2}
//         aria-hidden="true"
//       />

//       <h3 className="mt-6 text-sm font-medium text-gray-800 lg:text-lg">
//         {heading}
//       </h3>
//       <p className="mt-2 text-sm text-gray-600 lg:text-base">{description}</p>
//     </article>
//   );
// }

import { Leaf } from "lucide-react";

export default function FeaturedCard({
  icon: Icon = Leaf,
  heading,
  description,
  iconColor = "#C5A84C", // na mile to purana gold
  className = "",
}) {
  return (
    <article
      className={`h-full border border-[#E5E5E5] bg-white p-5 transition-colors hover:border-[#C5A84C] sm:p-6 ${className}`}
    >
      <Icon
        className="h-6 w-6 sm:h-10 sm:w-10"
        style={{ color: iconColor }}
        strokeWidth={2}
        aria-hidden="true"
      />

      <h3 className="mt-6 text-sm font-medium text-gray-800 lg:text-lg">
        {heading}
      </h3>
      <p className="mt-2 text-sm text-gray-600 lg:text-base">{description}</p>
    </article>
  );
}