import Image from "next/image";
import { Leaf } from "lucide-react";
export default function FeaturedCard({
  heading,
  description,
  className = "",

}) {
  return (
    <article
      className={`h-full border border-[#E5E5E5] bg-white p-5 transition-colors hover:border-[#C5A84C] sm:p-6 ${className}`}
    >
   
        <Leaf
          className="h-6 w-6 text-[#C5A84C] sm:h-10 sm:w-10"
          strokeWidth={2}
          aria-hidden="true"
        />
     

      <h3
        className={`mt-6 lg:text-lg font-medium text-gray-800 text-sm` }
      >
        {heading}
      </h3>
      <p className={`mt-2 lg:text-base text-gray-600 text-sm `}>
        {description}
      </p>
    </article>
  );
}