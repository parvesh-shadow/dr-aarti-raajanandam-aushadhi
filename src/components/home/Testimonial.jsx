"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play, Star, X } from "lucide-react";
import TitleDescription from "@/components/shared/TitleDescription";
import Slider from "@/components/shared/Slider";
import image1 from "@/assets/testimonial1.jpg";
import image2 from "@/assets/testimonial2.jpg";
import image3 from "@/assets/testimonial3.jpg";
import image4 from "@/assets/testimonial4.jpg";

const video1 = "/dummyshopifyvideo.mp4";

const VIDEOS = [
  { id: 1, name: "Aman", image: image1, videoSrc: video1 },
  { id: 2, name: "Priya S.", image: image2, videoSrc: video1 },
  { id: 3, name: "Neha R.", image: image3, videoSrc: video1 },
  { id: 4, name: "Anita M.", image: image4, videoSrc: video1 },
  { id: 5, name: "Aman", image: image1, videoSrc: video1 },
  { id: 6, name: "Priya S.", image: image2, videoSrc: video1 },
  { id: 7, name: "Neha R.", image: image3, videoSrc: video1 },
  { id: 8, name: "Anita M.", image: image4, videoSrc: video1 },
];

const REVIEWS = [
  {
    id: 1,
    title: "A Smooth and Convenient Experience",
    text: "The ordering process was very simple, and my product arrived well packed. I also appreciated the clear information provided on the website.",
    name: "Priya S.",
  },
  {
    id: 2,
    title: "Good Product Experience",
    text: "I found the product information easy to understand and the overall shopping experience was convenient. The packaging was neat and secure.",
    name: "Neha R.",
  },
  {
    id: 3,
    title: "Helpful and Professional Service",
    text: "I contacted the team with a question before ordering and received a helpful response. The overall experience was professional and easy.",
    name: "Anita M.",
  },
   {
    id: 4,
    title: "A Smooth and Convenient Experience",
    text: "The ordering process was very simple, and my product arrived well packed. I also appreciated the clear information provided on the website.",
    name: "Priya S.",
  },
  {
    id: 5,
    title: "Good Product Experience",
    text: "I found the product information easy to understand and the overall shopping experience was convenient. The packaging was neat and secure.",
    name: "Neha R.",
  },
  {
    id: 6,
    title: "Helpful and Professional Service",
    text: "I contacted the team with a question before ordering and received a helpful response. The overall experience was professional and easy.",
    name: "Anita M.",
  },
];

function VideoModal({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name} video testimonial`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-10 right-0 text-white transition-colors hover:text-[#C5A84C]"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
        <video
          src={item.videoSrc}
          controls
          autoPlay
          playsInline
          className="max-h-[80vh] w-full bg-black object-contain xl:h-[400px]"
        />
      </div>
    </div>
  );
}

export default function Testimonial() {
  const [playing, setPlaying] = useState(null);

  return (
    <>
      {/* Video testimonials */}
      <section
        aria-labelledby="video-testimonials-heading"
        className="mx-auto py-10   sm:py-14 px-4 sm:px-6 lg:px-8 lg:px-20"
      >
        <TitleDescription
          id="video-testimonials-heading"
          heading="Hear From Our Wellness Community"
          description="Discover genuine customer experiences with Dr. Arti’s Raaj Anandam Aushadhi. Watch short stories from customers sharing their product experience, ordering journey and overall experience with our brand."
          align="left"
          contentClassName="max-w-4xl"
        />

        <Slider
          label="Customer video testimonials"
          itemClassName="w-full sm:w-1/2 lg:w-1/4"
          className="mt-10"
        >
          {VIDEOS.map((item) => (
            <div
              key={item.id}
              className="relative h-[320px] w-full overflow-hidden bg-gray-200 sm:h-[360px] xl:h-[400px]"
            >
              <Image
                src={item.image}
                alt={`${item.name}, verified customer`}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />

              <button
                type="button"
                onClick={() => setPlaying(item)}
                aria-label={`Play ${item.name}'s video testimonial`}
                className="group absolute inset-x-3 bottom-3 flex items-center gap-3 text-left text-white"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-colors group-hover:bg-[#C5A84C] group-hover:text-white group-active:bg-[#A88C35] sm:h-12 sm:w-12">
                  <Play className="h-5 w-5 fill-current" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-medium sm:text-base">
                    {item.name}
                  </span>
                  <span className="block text-xs">Verified Customer</span>
                </span>
              </button>
            </div>
          ))}
        </Slider>

        {playing && (
          <VideoModal item={playing} onClose={() => setPlaying(null)} />
        )}
      </section>

      {/* Written reviews */}
      <section
        aria-labelledby="reviews-heading"
        className="mx-auto  py-5 px-4 sm:px-6 lg:px-8 lg:px-20"
      >
        <TitleDescription
          id="reviews-heading"
          heading="Trusted by Our Wellness Community"
          description="Hear from customers who have explored Dr. Arti’s Raaj Anandam Aushadhi and experienced our products, service, and convenient online shopping journey."
          align="left"
          contentClassName="max-w-4xl"
        />

        <Slider label="Customer reviews" className="mt-10">
          {REVIEWS.map(({ id, title, text, name }) => (
            <article
              key={id}
              className="flex h-full flex-col border border-gray-300 bg-white p-4 sm:p-5"
            >
              <div
                className="flex gap-0.5"
                role="img"
                aria-label="Rated 5 out of 5"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#C5A84C] text-[#C5A84C]"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <h3 className="mt-3 lg:text-[20px] font-semibold text-gray-800 text-base">
                &ldquo;{title}&rdquo;
              </h3>
              <p className="mt-3 flex-1 lg:text-[16px] text-gray-600 text-sm">
                &ldquo;{text}&rdquo;
              </p>

              <p className="mt-3.5 text-sm font-semibold text-black sm:text-base">
                {name}
              </p>
              <p className="text-sm text-gray-800">Verified Customer</p>
            </article>
          ))}
        </Slider>
      </section>
    </>
  );
}
