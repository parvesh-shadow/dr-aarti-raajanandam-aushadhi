// "use client";

// import { Children, useEffect, useRef, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// // mobile 1 | md 2 | lg 3 | xl 4
// function getVisible() {
//   if (typeof window === "undefined") return 1;
//   const w = window.innerWidth;
//   if (w >= 1280) return 4;
//   if (w >= 1024) return 3;
//   if (w >= 768) return 2;
//   return 1;
// }

// export default function Slider({
//   children,
//   label = "Slider",
//   className = "",
// }) {
//   const items = Children.toArray(children);
//   const trackRef = useRef(null);
//   const [visible, setVisible] = useState(1);
//   const [active, setActive] = useState(0);

//   useEffect(() => {
//     const update = () => setVisible(Math.min(getVisible(), items.length));
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, [items.length]);

//   const last = Math.max(items.length - visible, 0);

//   const getStep = () => trackRef.current?.children[0]?.offsetWidth || 0;

//   const goTo = (i) => {
//     const step = getStep();
//     if (!trackRef.current || !step) return;
//     trackRef.current.scrollTo({ left: i * step, behavior: "smooth" });
//   };

//   const handleScroll = () => {
//     const step = getStep();
//     if (!step) return;
//     const i = Math.round(trackRef.current.scrollLeft / step);
//     setActive(Math.min(Math.max(i, 0), last));
//   };

//   const prev = () => goTo(active <= 0 ? last : active - 1);
//   const next = () => goTo(active >= last ? 0 : active + 1);

//   const arrowClass =
//     "absolute top-1/2 z-10 hidden -translate-y-1/2 p-1 text-black transition-colors hover:text-[#A88C35] md:block";

//   return (
//     <div className={`w-full min-w-0 max-w-full overflow-x-clip ${className}`}>
//       <div
//         className="relative md:px-10"
//         role="region"
//         aria-roledescription="carousel"
//         aria-label={label}
//       >
//         <button
//           type="button"
//           onClick={prev}
//           aria-label="Previous"
//           className={`${arrowClass} left-0`}
//         >
//           <ChevronLeft className="h-6 w-6" aria-hidden="true" />
//         </button>

//         <ul
//           ref={trackRef}
//           onScroll={handleScroll}
//           className="flex w-full min-w-0 max-w-full snap-x snap-mandatory items-stretch overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
//         >
//           {items.map((child) => (
//             <li
//               key={child.key}
//               style={{ width: `${100 / visible}%`, flex: "0 0 auto" }}
//               className="box-border snap-start px-2 first:pl-0 last:pr-0"
//             >
//               {child}
//             </li>
//           ))}
//         </ul>

//         <button
//           type="button"
//           onClick={next}
//           aria-label="Next"
//           className={`${arrowClass} right-0`}
//         >
//           <ChevronRight className="h-6 w-6" aria-hidden="true" />
//         </button>
//       </div>

//       {last > 0 && (
//         <div className="mt-5 flex justify-center gap-1.5">
//           {Array.from({ length: last + 1 }).map((_, i) => (
//             <button
//               key={i}
//               type="button"
//               onClick={() => goTo(i)}
//               aria-label={`Go to slide ${i + 1}`}
//               aria-current={i === active}
//               className={`h-2 w-2 rounded-full transition-colors ${
//                 i === active ? "bg-[#C5A84C]" : "bg-gray-300 hover:bg-[#A88C35]"
//               }`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { Children, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// DEFAULT: mobile 1 | md 2 | lg 3 | xl 4
function getVisible() {
  if (typeof window === "undefined") return 1;
  const w = window.innerWidth;
  if (w >= 1280) return 4;
  if (w >= 1024) return 3;
  if (w >= 768) return 2;
  return 1;
}

export default function Slider({
  children,
  label = "Slider",
  className = "", // bahar ka wrapper (margin etc.)
  trackClassName = "", // ul ki extra classes (gap, padding etc.)
  itemClassName = "", // li width override (e.g. "w-full sm:w-1/2 lg:w-1/4")
  itemSpacingClassName = "px-2 first:pl-0 last:pr-0", // li ka spacing (default same)
  arrowClassName = "", // arrows ki extra classes
  dotsClassName = "", // dots wrapper ki extra classes
}) {
  const items = Children.toArray(children);
  const trackRef = useRef(null);
  const [visible, setVisible] = useState(1);
  const [active, setActive] = useState(0);

  const useCustomWidth = Boolean(itemClassName);

  useEffect(() => {
    const update = () => {
      if (useCustomWidth) {
        // custom width: DOM se measure karo ki kitne card dikh rahe hain
        const track = trackRef.current;
        const first = track?.children[0];
        if (!first || !first.offsetWidth) return;
        const count = Math.round(track.clientWidth / first.offsetWidth);
        setVisible(Math.min(Math.max(count, 1), items.length));
      } else {
        setVisible(Math.min(getVisible(), items.length));
      }
    };

    update();
    window.addEventListener("resize", update);
    const ro = trackRef.current ? new ResizeObserver(update) : null;
    if (ro && trackRef.current) ro.observe(trackRef.current);

    return () => {
      window.removeEventListener("resize", update);
      ro?.disconnect();
    };
  }, [items.length, useCustomWidth, itemClassName]);

  const last = Math.max(items.length - visible, 0);

  const getStep = () => trackRef.current?.children[0]?.offsetWidth || 0;

  const goTo = (i) => {
    const step = getStep();
    if (!trackRef.current || !step) return;
    trackRef.current.scrollTo({ left: i * step, behavior: "smooth" });
  };

  const handleScroll = () => {
    const step = getStep();
    if (!step) return;
    const i = Math.round(trackRef.current.scrollLeft / step);
    setActive(Math.min(Math.max(i, 0), last));
  };

  const prev = () => goTo(active <= 0 ? last : active - 1);
  const next = () => goTo(active >= last ? 0 : active + 1);

  const arrowBase =
    "absolute top-1/2 z-10 hidden -translate-y-1/2 p-1 text-black transition-colors hover:text-[#A88C35] md:block";

  return (
    <div className={`w-full min-w-0 max-w-full overflow-x-clip ${className}`}>
      <div
        className="relative md:px-10"
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
      >
        <button
          type="button"
          onClick={prev}
          aria-label="Previous"
          className={`${arrowBase} left-0 ${arrowClassName}`}
        >
          <ChevronLeft className="h-6 w-6" aria-hidden="true" />
        </button>

        <ul
          ref={trackRef}
          onScroll={handleScroll}
          className={`flex w-full min-w-0 max-w-full snap-x snap-mandatory items-stretch overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${trackClassName}`}
        >
          {items.map((child) => (
            <li
              key={child.key}
              style={
                useCustomWidth
                  ? { flex: "0 0 auto" }
                  : { width: `${100 / visible}%`, flex: "0 0 auto" }
              }
              className={`box-border snap-start ${itemSpacingClassName} ${itemClassName}`}
            >
              {child}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={next}
          aria-label="Next"
          className={`${arrowBase} right-0 ${arrowClassName}`}
        >
          <ChevronRight className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {last > 0 && (
        <div className={`mt-5 flex justify-center gap-1.5 ${dotsClassName}`}>
          {Array.from({ length: last + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === active ? "bg-[#C5A84C]" : "bg-gray-300 hover:bg-[#A88C35]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}