"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hero1 from "@/assets/banner1.jpg";
import hero2 from "@/assets/banner2.jpg";
import hero3 from "@/assets/banner3.jpg";

const SLIDES = [
  {
    image: hero1,
    alt: "Your Journey to Parenthood, Supported Naturally. Vajromax Gold and Fem Rasayan Ayurvedic fertility support tablets",
    href: "/products",
  },
  {
    image: hero2,
    alt: "Embrace the Goodness of Ayurveda. Mediwine syrup, Vajromax Gold and Fem Rasayan wellness products",
    href: "/products",
  },
  {
    image: hero3,
    alt: "Ayurvedic Support for Every Stage of Life. Root Tricks hair care capsules and Shatavar tablets",
    href: "/products",
  },
];

const AUTOPLAY_MS = 4000;
const COUNT = SLIDES.length;

// Clone last at start and first at end for a seamless infinite loop
const TRACK = [SLIDES[COUNT - 1], ...SLIDES, SLIDES[0]];

function HeroSlide({ image, alt, href, priority = false, isClone = false }) {
  return (
    <Link
      href={href}
      tabIndex={isClone ? -1 : undefined}
      className="relative block w-full flex-none"
    >
      <Image
        src={image}
        alt={isClone ? "" : alt}
        priority={priority}
        sizes="100vw"
        className="h-auto w-full"
      />
    </Link>
  );
}

export default function Hero() {
  const [index, setIndex] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const moving = useRef(false);

  const next = useCallback(() => {
    if (moving.current) return;
    moving.current = true;
    setAnimate(true);
    setIndex((i) => i + 1);
  }, []);

  const prev = useCallback(() => {
    if (moving.current) return;
    moving.current = true;
    setAnimate(true);
    setIndex((i) => i - 1);
  }, []);

  // Autoplay (always forward)
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, index, next]);

  // Re-enable animation after a silent jump
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimate(true))
    );
    return () => cancelAnimationFrame(id);
  }, [animate]);

  const handleTransitionEnd = () => {
    moving.current = false;
    if (index === COUNT + 1) {
      setAnimate(false);
      setIndex(1);
    } else if (index === 0) {
      setAnimate(false);
      setIndex(COUNT);
    }
  };

  const arrowClass =
    "absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-black shadow transition-colors hover:bg-[#C5A84C] hover:text-white active:bg-[#A88C35] active:text-white sm:p-2";

  return (
    <section
      aria-label="Hero slider"
      aria-roledescription="carousel"
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`flex ${
          animate ? "transition-transform duration-700 ease-in-out" : ""
        }`}
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {TRACK.map((slide, i) => {
          const isClone = i === 0 || i === TRACK.length - 1;
          return (
            <div
              key={i}
              className="w-full flex-none"
              aria-hidden={isClone || undefined}
            >
              <HeroSlide {...slide} priority={i === 1} isClone={isClone} />
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className={`${arrowClass} left-2 sm:left-4`}
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className={`${arrowClass} right-2 sm:right-4`}
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
      </button>
    </section>
  );
}