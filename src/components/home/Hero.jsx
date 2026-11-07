"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import hero1 from "@/assets/banner1.jpg";
import hero2 from "@/assets/banner2.jpg";
import hero3 from "@/assets/banner3.jpg";

const SLIDES = [
  {
    image: hero1,
    alt: "Your Journey to Parenthood, Supported Naturally. Vajromax Gold and Fem Rasayan Ayurvedic fertility support tablets",
  },
  {
    image: hero2,
    alt: "Embrace the Goodness of Ayurveda. Mediwine syrup, Vajromax Gold and Fem Rasayan wellness products",
  },
  {
    image: hero3,
    alt: "Ayurvedic Support for Every Stage of Life. Root Tricks hair care capsules and Shatavar tablets",
  },
];

const AUTOPLAY_MS = 4000;
const COUNT = SLIDES.length;

// Clone last at start and first at end for a seamless infinite loop
const TRACK = [SLIDES[COUNT - 1], ...SLIDES, SLIDES[0]];

function HeroSlide({ image, alt, priority = false, isClone = false }) {
  return (
    <div className="relative block w-full flex-none">
      {/* Mobile: natural height. Large screens: max 600px */}
      <div className="relative w-full lg:h-[600px]">
        <Image
          src={image}
          alt={isClone ? "" : alt}
          priority={priority}
          sizes="100vw"
          className="h-auto w-full lg:absolute lg:inset-0 lg:h-full lg:w-full lg:object-cover lg:object-center"
        />
      </div>
    </div>
  );
}

export default function Hero() {
  const [index, setIndex] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const moving = useRef(false);

  // Real slide index (0..COUNT-1) for the active dot
  const activeDot = (index - 1 + COUNT) % COUNT;

  const next = useCallback(() => {
    if (moving.current) return;
    moving.current = true;
    setAnimate(true);
    setIndex((i) => i + 1);
  }, []);

  const goTo = useCallback(
    (slideIndex) => {
      const target = slideIndex + 1;
      if (moving.current || target === index) return;
      moving.current = true;
      setAnimate(true);
      setIndex(target);
    },
    [index]
  );

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

  return (
    <div
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <section
        aria-label="Hero slider"
        aria-roledescription="carousel"
        className="relative w-full overflow-hidden lg:max-h-[600px]"
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
      </section>

      {/* Pagination dots (banner ke bahar, neeche) */}
      <div
        role="tablist"
        aria-label="Slide pagination"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "12px 0",
          backgroundColor: "#ffffff",
        }}
      >
        {SLIDES.map((_, i) => {
          const active = i === activeDot;
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              style={{
                display: "block",
                width: active ? 28 : 10,
                height: 10,
                padding: 0,
                border: 0,
                borderRadius: 9999,
                cursor: "pointer",
                backgroundColor: active ? "#C5A84C" : "#D1D5DB",
                transition: "all 300ms ease",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}