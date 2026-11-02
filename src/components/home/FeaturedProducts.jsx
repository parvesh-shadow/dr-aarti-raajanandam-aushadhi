"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Star,
} from "lucide-react";
import image1 from "../../assets/product1.jpg";
import image2 from "../../assets/product2.jpg";
import image3 from "../../assets/product3.jpg";

const PRODUCTS = [
  {
    id: 1,
    category: "Ayurvedic Hair Care",
    name: "Root Tricks Hair Care Capsule",
    description:
      "Ayurvedic hair care capsules formulated for a convenient daily wellness routine.",
    pack: "800 mg • 60 Capsules",
    price: 895,
    rating: 4.8,
    inStock: true,
    image:image1,
  },
  {
    id: 2,
    category: "Women's Wellness",
    name: "Fem Rasayan Tablets",
    description:
      "Ayurvedic wellness formula presented for women's reproductive wellness and everyday well-being.",
    pack: "60 Tablets",
    price: 999,
    rating: 4.8,
    inStock: true,
    image:image2,
  },
  {
    id: 3,
    category: "Ayurvedic Wellness",
    name: "Shatavar™ Tablets",
    description:
      "Ayurvedic medicine formulated with Shatavari, presented in a convenient tablet form.",
    pack: "800 mg • 60 Tablets",
    price: 895,
    rating: 4.8,
    inStock: true,
    image: image3,
  },
  {
    id: 4,
    category: "Men's Wellness",
    name: "Vajromax Gold Tablets",
    description:
      "Ayurvedic male fertility support formula presented in a convenient tablet form.",
    pack: "60 Tablets",
    price: 999,
    rating: 4.7,
    inStock: true,
    image: image1,
  },
];

function ProductCard({ product }) {
  const { category, name, description, pack, price, rating, inStock, image } =
    product;

  return (
    <article className="flex h-full flex-col border border-gray-200 bg-white p-3 sm:p-4">
      {/* Image */}
      <div className="relative h-44 sm:h-48">
        <span className="absolute left-0 top-0 z-10 rounded-full bg-gray-100 px-3 py-1 text-xs text-black sm:text-sm">
          {category}
        </span>
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-contain p-4"
        />
        {inStock && (
          <span className="absolute bottom-0 right-0 text-xs font-medium text-black sm:text-sm">
            In Stock
          </span>
        )}
      </div>

      {/* Details */}
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="line-clamp-2 min-h-12 text-base text-black sm:min-h-14">
          {name}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-10 text-xs text-gray-700 sm:text-sm">
          {description}
        </p>
        <p className="mt-2 text-xs text-black sm:text-sm">{pack}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-base font-medium text-black sm:text-base">
            ₹{price}
          </span>
          <span className="flex items-center gap-1 text-xs text-black sm:text-sm">
            <span className="flex" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-black" strokeWidth={0} />
              ))}
            </span>
            <span className="sr-only">Rated</span>
            {rating}
          </span>
        </div>

        <div className="mt-auto flex gap-2 pt-4">
          <Link
            href="/checkout"
            className="flex-1 bg-[#C9A445] px-4 py-2.5 text-center text-sm text-white transition-colors hover:bg-[#b08f38]"
          >
            Buy Now
          </Link>
          <button
            type="button"
            aria-label={`Add ${name} to cart`}
            className="border border-gray-400 px-3 text-black transition-colors hover:bg-black hover:text-white"
          >
            <ShoppingBag
              className="h-4 w-4"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedProducts() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const last = PRODUCTS.length - 1;

  const goTo = (i) => {
    const track = trackRef.current;
    if (!track || !track.children[0]) return;
    const width = track.children[0].offsetWidth;
    track.scrollTo({ left: i * width, behavior: "smooth" });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || !track.children[0]) return;
    const i = Math.round(track.scrollLeft / track.children[0].offsetWidth);
    setActive(Math.min(Math.max(i, 0), last));
  };

  const prev = () => goTo(active === 0 ? last : active - 1);
  const next = () => goTo(active === last ? 0 : active + 1);

  return (
    <section
      aria-labelledby="featured-heading"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
    >
      {/* Heading */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2
            id="featured-heading"
            className="text-base font-medium text-black sm:text-base"
          >
            Everyday essentials
          </h2>
          <p className="mt-2 max-w-3xl text-xs text-gray-800 sm:text-sm">
            Explore thoughtfully selected Ayurvedic products designed to
            complement your daily wellness routine and bring traditional care
            into modern everyday living.
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex shrink-0 items-center gap-2 text-xs text-black sm:text-sm"
        >
          <span className="border-b border-black">See All</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {/* Slider */}
      <div
        className="relative mt-6 px-8 sm:px-10"
        aria-roledescription="carousel"
        aria-label="Featured products"
      >
        <button
          type="button"
          onClick={prev}
          aria-label="Previous products"
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 p-1 text-black"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
        </button>

        <ul
          ref={trackRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PRODUCTS.map((product) => (
            <li
              key={product.id}
              className="w-full flex-none snap-start px-2 sm:w-1/2 lg:w-1/3"
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={next}
          aria-label="Next products"
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 p-1 text-black"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-5 flex justify-center gap-1.5">
        {PRODUCTS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to product ${i + 1}`}
            aria-current={i === active}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === active ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
