// // "use client";

// // import { useCallback, useEffect, useRef, useState } from "react";
// // import Image from "next/image";
// // import hero1 from "@/assets/ban1.jpeg";
// // import hero2 from "@/assets/ban2.jpeg";
// // import hero3 from "@/assets/ban3.jpeg";

// // const SLIDES = [
// //   {
// //     image: hero1,
// //     alt: "Your Journey to Parenthood, Supported Naturally. Vajromax Gold and Fem Rasayan Ayurvedic fertility support tablets",
// //   },
// //   {
// //     image: hero2,
// //     alt: "Embrace the Goodness of Ayurveda. Mediwine syrup, Vajromax Gold and Fem Rasayan wellness products",
// //   },
// //   {
// //     image: hero3,
// //     alt: "Ayurvedic Support for Every Stage of Life. Root Tricks hair care capsules and Shatavar tablets",
// //   },
// // ];

// // const AUTOPLAY_MS = 2000;
// // const TRANSITION_MS = 500; // neeche duration-500 se match hona chahiye
// // const SWIPE_MIN_PX = 50;
// // const COUNT = SLIDES.length;

// // // Clone last at start and first at end for a seamless infinite loop
// // const TRACK = [SLIDES[COUNT - 1], ...SLIDES, SLIDES[0]];

// // function HeroSlide({ image, alt, priority = false, isClone = false }) {
// //   return (
// //     <div className="relative block w-full flex-none">
// //       {/* Mobile: natural height. Large screens: max 435px */}
// //       <div className="relative w-full lg:h-[435px]">
// //         <Image
// //           src={image}
// //           alt={isClone ? "" : alt}
// //           priority={priority}
// //           sizes="100vw"
// //           draggable={false}
// //           className="pointer-events-none h-auto w-full select-none lg:absolute lg:inset-0 lg:h-full lg:w-full lg:object-cover lg:object-center"
// //         />
// //       </div>
// //     </div>
// //   );
// // }

// // export default function Hero() {
// //   const [index, setIndex] = useState(1);
// //   const [animate, setAnimate] = useState(true);
// //   const [dragX, setDragX] = useState(0);
// //   const [dragging, setDragging] = useState(false);

// //   const sectionRef = useRef(null);
// //   const moving = useRef(false);
// //   const unlockTimer = useRef(null);
// //   const draggingRef = useRef(false);

// //   // Real slide index (0..COUNT-1) for the active dot
// //   const activeDot = (index - 1 + COUNT) % COUNT;

// //   // moving lock: transitionend na aaye tab bhi lock khul jaye
// //   const lock = useCallback(() => {
// //     moving.current = true;
// //     clearTimeout(unlockTimer.current);
// //     unlockTimer.current = setTimeout(() => {
// //       moving.current = false;
// //     }, TRANSITION_MS + 300);
// //   }, []);

// //   const next = useCallback(() => {
// //     if (moving.current) return;
// //     lock();
// //     setAnimate(true);
// //     setIndex((i) => i + 1);
// //   }, [lock]);

// //   const prev = useCallback(() => {
// //     if (moving.current) return;
// //     lock();
// //     setAnimate(true);
// //     setIndex((i) => i - 1);
// //   }, [lock]);

// //   const goTo = useCallback(
// //     (slideIndex) => {
// //       const target = slideIndex + 1;
// //       if (moving.current || target === index) return;
// //       lock();
// //       setAnimate(true);
// //       setIndex(target);
// //     },
// //     [index, lock]
// //   );

// //   // Autoplay: hover par band nahi hota. Sirf drag ke dauran ruka rehta hai.
// //   useEffect(() => {
// //     if (dragging) return;
// //     const id = setInterval(next, AUTOPLAY_MS);
// //     return () => clearInterval(id);
// //   }, [dragging, index, next]);

// //   // Re-enable animation after a silent jump
// //   useEffect(() => {
// //     if (animate) return;
// //     const id = requestAnimationFrame(() =>
// //       requestAnimationFrame(() => setAnimate(true))
// //     );
// //     return () => cancelAnimationFrame(id);
// //   }, [animate]);

// //   useEffect(() => () => clearTimeout(unlockTimer.current), []);

// //   const handleTransitionEnd = (e) => {
// //     if (e.target !== e.currentTarget) return;
// //     moving.current = false;
// //     if (index === COUNT + 1) {
// //       setAnimate(false);
// //       setIndex(1);
// //     } else if (index === 0) {
// //       setAnimate(false);
// //       setIndex(COUNT);
// //     }
// //   };

// //   /* ---------------- drag / swipe: mouse + touch + pen ----------------
// //      Listeners window par lagte hain, isliye mouse slider se bahar
// //      chala jaye tab bhi drag sahi chalta hai. */
// //   const onPointerDown = (e) => {
// //     if (e.pointerType === "mouse" && e.button !== 0) return; // sirf left click
// //     if (moving.current) return;

// //     const startX = e.clientX;
// //     const startY = e.clientY;
// //     let axis = null; // "x" | "y"
// //     let dx = 0;

// //     draggingRef.current = true;
// //     setDragging(true);

// //     const move = (ev) => {
// //       if (!draggingRef.current) return;
// //       dx = ev.clientX - startX;
// //       const dy = ev.clientY - startY;
// //       if (axis === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
// //         axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
// //       }
// //       if (axis === "x") setDragX(dx);
// //     };

// //     const up = () => {
// //       window.removeEventListener("pointermove", move);
// //       window.removeEventListener("pointerup", up);
// //       window.removeEventListener("pointercancel", up);

// //       draggingRef.current = false;
// //       setDragging(false);
// //       setDragX(0);

// //       if (axis === "x" && Math.abs(dx) > SWIPE_MIN_PX) {
// //         if (dx < 0) next();
// //         else prev();
// //       }
// //     };

// //     window.addEventListener("pointermove", move);
// //     window.addEventListener("pointerup", up);
// //     window.addEventListener("pointercancel", up);
// //   };

// //   /* ---------------- trackpad: do ungli se left/right swipe ----------------
// //      Laptop trackpad ka horizontal swipe pointer event nahi, wheel event hota hai. */
// //   useEffect(() => {
// //     const el = sectionRef.current;
// //     if (!el) return;

// //     let acc = 0;
// //     let lastChange = 0;
// //     let resetTimer;

// //     const onWheel = (e) => {
// //       // sirf horizontal gesture; vertical page scroll ko mat roko
// //       if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
// //       e.preventDefault(); // browser back/forward gesture na ho

// //       const now = Date.now();
// //       if (now - lastChange < 700) return; // ek swipe = ek slide

// //       acc += e.deltaX;
// //       clearTimeout(resetTimer);
// //       resetTimer = setTimeout(() => {
// //         acc = 0;
// //       }, 150);

// //       if (Math.abs(acc) > 50) {
// //         if (acc > 0) next();
// //         else prev();
// //         acc = 0;
// //         lastChange = now;
// //       }
// //     };

// //     el.addEventListener("wheel", onWheel, { passive: false });
// //     return () => {
// //       el.removeEventListener("wheel", onWheel);
// //       clearTimeout(resetTimer);
// //     };
// //   }, [next, prev]);

// //   return (
// //     <div className="w-full">
// //       <section
// //         ref={sectionRef}
// //         aria-label="Hero slider"
// //         aria-roledescription="carousel"
// //         className={`relative w-full touch-pan-y select-none overflow-hidden lg:max-h-[435px] ${
// //           dragging ? "cursor-grabbing" : "cursor-grab"
// //         }`}
// //         onPointerDown={onPointerDown}
// //         onDragStart={(e) => e.preventDefault()}
// //       >
// //         <div
// //           className={`flex ${
// //             animate && !dragging
// //               ? "transition-transform duration-500 ease-in-out"
// //               : ""
// //           }`}
// //           style={{ transform: `translateX(calc(-${index * 100}% + ${dragX}px))` }}
// //           onTransitionEnd={handleTransitionEnd}
// //         >
// //           {TRACK.map((slide, i) => {
// //             const isClone = i === 0 || i === TRACK.length - 1;
// //             return (
// //               <div
// //                 key={i}
// //                 className="w-full flex-none"
// //                 aria-hidden={isClone || undefined}
// //               >
// //                 <HeroSlide {...slide} priority={i === 1} isClone={isClone} />
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </section>

// //       {/* Pagination dots (banner ke bahar, neeche) */}
// //       <div
// //         role="tablist"
// //         aria-label="Slide pagination"
// //         style={{
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           gap: 8,
// //           padding: "12px 0",
// //           backgroundColor: "#ffffff",
// //         }}
// //       >
// //         {SLIDES.map((_, i) => {
// //           const active = i === activeDot;
// //           return (
// //             <button
// //               key={i}
// //               type="button"
// //               role="tab"
// //               aria-selected={active}
// //               aria-label={`Go to slide ${i + 1}`}
// //               onClick={() => goTo(i)}
// //               style={{
// //                 display: "block",
// //                 width: active ? 28 : 10,
// //                 height: 10,
// //                 padding: 0,
// //                 border: 0,
// //                 borderRadius: 9999,
// //                 cursor: "pointer",
// //                 backgroundColor: active ? "#C5A84C" : "#D1D5DB",
// //                 transition: "all 300ms ease",
// //               }}
// //             />
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import hero1 from "@/assets/ban1.jpeg";
// import hero2 from "@/assets/ban2.jpeg";
// import hero3 from "@/assets/ban3.jpeg";
// // import hero4 from "@/assets/ban4.jpeg";


// const SLIDES = [
//   {
//     image: hero3,
//     alt: "Your Journey to Parenthood, Supported Naturally. Vajromax Gold and Fem Rasayan Ayurvedic fertility support tablets",
//   },
//   {
//     image: hero2,
//     alt: "Embrace the Goodness of Ayurveda. Mediwine syrup, Vajromax Gold and Fem Rasayan wellness products",
//   },
//   {
//     image: hero1,
//     alt: "Ayurvedic Support for Every Stage of Life. Root Tricks hair care capsules and Shatavar tablets",
//   },
//   //  {
//   //   image: hero4,
//   //   alt: "Ayurvedic Support for Every Stage of Life. Root Tricks hair care capsules and Shatavar tablets",
//   // },
// ];

// const AUTOPLAY_MS = 2000;
// const TRANSITION_MS = 500; // neeche duration-500 se match hona chahiye
// const SWIPE_MIN_PX = 50;
// const COUNT = SLIDES.length;

// // Clone last at start and first at end for a seamless infinite loop
// const TRACK = [SLIDES[COUNT - 1], ...SLIDES, SLIDES[0]];

// function HeroSlide({ image, alt, priority = false, isClone = false }) {
//   return (
//     <div className="relative block w-full flex-none">
//       {/* Poori image dikhegi: width 100%, height auto (natural aspect ratio) */}
//       <Image
//         src={image}
//         alt={isClone ? "" : alt}
//         priority={priority}
//         sizes="100vw"
//         draggable={false}
//         className="pointer-events-none block h-auto w-full select-none"
//       />
//     </div>
//   );
// }

// export default function Hero() {
//   const [index, setIndex] = useState(1);
//   const [animate, setAnimate] = useState(true);
//   const [dragX, setDragX] = useState(0);
//   const [dragging, setDragging] = useState(false);

//   const sectionRef = useRef(null);
//   const moving = useRef(false);
//   const unlockTimer = useRef(null);
//   const draggingRef = useRef(false);

//   // Real slide index (0..COUNT-1) for the active dot
//   const activeDot = (index - 1 + COUNT) % COUNT;

//   // moving lock: transitionend na aaye tab bhi lock khul jaye
//   const lock = useCallback(() => {
//     moving.current = true;
//     clearTimeout(unlockTimer.current);
//     unlockTimer.current = setTimeout(() => {
//       moving.current = false;
//     }, TRANSITION_MS + 300);
//   }, []);

//   const next = useCallback(() => {
//     if (moving.current) return;
//     lock();
//     setAnimate(true);
//     setIndex((i) => i + 1);
//   }, [lock]);

//   const prev = useCallback(() => {
//     if (moving.current) return;
//     lock();
//     setAnimate(true);
//     setIndex((i) => i - 1);
//   }, [lock]);

//   const goTo = useCallback(
//     (slideIndex) => {
//       const target = slideIndex + 1;
//       if (moving.current || target === index) return;
//       lock();
//       setAnimate(true);
//       setIndex(target);
//     },
//     [index, lock]
//   );

//   // Autoplay: hover par band nahi hota. Sirf drag ke dauran ruka rehta hai.
//   useEffect(() => {
//     if (dragging) return;
//     const id = setInterval(next, AUTOPLAY_MS);
//     return () => clearInterval(id);
//   }, [dragging, index, next]);

//   // Re-enable animation after a silent jump
//   useEffect(() => {
//     if (animate) return;
//     const id = requestAnimationFrame(() =>
//       requestAnimationFrame(() => setAnimate(true))
//     );
//     return () => cancelAnimationFrame(id);
//   }, [animate]);

//   useEffect(() => () => clearTimeout(unlockTimer.current), []);

//   const handleTransitionEnd = (e) => {
//     if (e.target !== e.currentTarget) return;
//     moving.current = false;
//     if (index === COUNT + 1) {
//       setAnimate(false);
//       setIndex(1);
//     } else if (index === 0) {
//       setAnimate(false);
//       setIndex(COUNT);
//     }
//   };

//   /* ---------------- drag / swipe: mouse + touch + pen ----------------
//      Listeners window par lagte hain, isliye mouse slider se bahar
//      chala jaye tab bhi drag sahi chalta hai. */
//   const onPointerDown = (e) => {
//     if (e.pointerType === "mouse" && e.button !== 0) return; // sirf left click
//     if (moving.current) return;

//     const startX = e.clientX;
//     const startY = e.clientY;
//     let axis = null; // "x" | "y"
//     let dx = 0;

//     draggingRef.current = true;
//     setDragging(true);

//     const move = (ev) => {
//       if (!draggingRef.current) return;
//       dx = ev.clientX - startX;
//       const dy = ev.clientY - startY;
//       if (axis === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
//         axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
//       }
//       if (axis === "x") setDragX(dx);
//     };

//     const up = () => {
//       window.removeEventListener("pointermove", move);
//       window.removeEventListener("pointerup", up);
//       window.removeEventListener("pointercancel", up);

//       draggingRef.current = false;
//       setDragging(false);
//       setDragX(0);

//       if (axis === "x" && Math.abs(dx) > SWIPE_MIN_PX) {
//         if (dx < 0) next();
//         else prev();
//       }
//     };

//     window.addEventListener("pointermove", move);
//     window.addEventListener("pointerup", up);
//     window.addEventListener("pointercancel", up);
//   };

//   /* ---------------- trackpad: do ungli se left/right swipe ----------------
//      Laptop trackpad ka horizontal swipe pointer event nahi, wheel event hota hai. */
//   useEffect(() => {
//     const el = sectionRef.current;
//     if (!el) return;

//     let acc = 0;
//     let lastChange = 0;
//     let resetTimer;

//     const onWheel = (e) => {
//       // sirf horizontal gesture; vertical page scroll ko mat roko
//       if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
//       e.preventDefault(); // browser back/forward gesture na ho

//       const now = Date.now();
//       if (now - lastChange < 700) return; // ek swipe = ek slide

//       acc += e.deltaX;
//       clearTimeout(resetTimer);
//       resetTimer = setTimeout(() => {
//         acc = 0;
//       }, 150);

//       if (Math.abs(acc) > 50) {
//         if (acc > 0) next();
//         else prev();
//         acc = 0;
//         lastChange = now;
//       }
//     };

//     el.addEventListener("wheel", onWheel, { passive: false });
//     return () => {
//       el.removeEventListener("wheel", onWheel);
//       clearTimeout(resetTimer);
//     };
//   }, [next, prev]);

//   return (
//     <div className="mx-auto w-full max-w-[1920px]">
//       <section
//         ref={sectionRef}
//         aria-label="Hero slider"
//         aria-roledescription="carousel"
//         className={`relative w-full touch-pan-y select-none overflow-hidden ${
//           dragging ? "cursor-grabbing" : "cursor-grab"
//         }`}
//         onPointerDown={onPointerDown}
//         onDragStart={(e) => e.preventDefault()}
//       >
//         <div
//           className={`flex ${
//             animate && !dragging
//               ? "transition-transform duration-500 ease-in-out"
//               : ""
//           }`}
//           style={{ transform: `translateX(calc(-${index * 100}% + ${dragX}px))` }}
//           onTransitionEnd={handleTransitionEnd}
//         >
//           {TRACK.map((slide, i) => {
//             const isClone = i === 0 || i === TRACK.length - 1;
//             return (
//               <div
//                 key={i}
//                 className="w-full flex-none"
//                 aria-hidden={isClone || undefined}
//               >
//                 <HeroSlide {...slide} priority={i === 1} isClone={isClone} />
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       {/* Pagination dots (banner ke bahar, neeche) */}
//       <div
//         role="tablist"
//         aria-label="Slide pagination"
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 8,
//           padding: "12px 0",
//           backgroundColor: "#ffffff",
//         }}
//       >
//         {SLIDES.map((_, i) => {
//           const active = i === activeDot;
//           return (
//             <button
//               key={i}
//               type="button"
//               role="tab"
//               aria-selected={active}
//               aria-label={`Go to slide ${i + 1}`}
//               onClick={() => goTo(i)}
//               style={{
//                 display: "block",
//                 width: active ? 28 : 10,
//                 height: 10,
//                 padding: 0,
//                 border: 0,
//                 borderRadius: 9999,
//                 cursor: "pointer",
//                 backgroundColor: active ? "#C5A84C" : "#D1D5DB",
//                 transition: "all 300ms ease",
//               }}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import hero1 from "@/assets/ban1.jpeg";
import hero2 from "@/assets/ban2.jpeg";
import hero3 from "@/assets/ban3.jpeg";
// import hero4 from "@/assets/ban4.jpeg";


const SLIDES = [
  {
    image: hero3,
    alt: "Your Journey to Parenthood, Supported Naturally. Vajromax Gold and Fem Rasayan Ayurvedic fertility support tablets",
  },
  {
    image: hero2,
    alt: "Embrace the Goodness of Ayurveda. Mediwine syrup, Vajromax Gold and Fem Rasayan wellness products",
  },
  {
    image: hero1,
    alt: "Ayurvedic Support for Every Stage of Life. Root Tricks hair care capsules and Shatavar tablets",
  },
  //  {
  //   image: hero4,
  //   alt: "Ayurvedic Support for Every Stage of Life. Root Tricks hair care capsules and Shatavar tablets",
  // },
];

const AUTOPLAY_MS = 2000;
const TRANSITION_MS = 500; // neeche duration-500 se match hona chahiye
const SWIPE_MIN_PX = 50;
const COUNT = SLIDES.length;

// Clone last at start and first at end for a seamless infinite loop
const TRACK = [SLIDES[COUNT - 1], ...SLIDES, SLIDES[0]];

// Image load hone se pehle hi height reserve ho, isliye pehli image ka real ratio use hota hai
const ASPECT_RATIO = `${SLIDES[0].image.width} / ${SLIDES[0].image.height}`;

function HeroSlide({ image, alt, isClone = false }) {
  return (
    <div className="relative block w-full flex-none">
      {/* Poori image dikhegi: width 100%, height auto (natural aspect ratio) */}
      <Image
        src={image}
        alt={isClone ? "" : alt}
        priority
        loading="eager"
        sizes="100vw"
        draggable={false}
        className="pointer-events-none block h-auto w-full select-none"
      />
    </div>
  );
}

export default function Hero() {
  const [index, setIndex] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [ready, setReady] = useState(false);

  const sectionRef = useRef(null);
  const moving = useRef(false);
  const unlockTimer = useRef(null);
  const draggingRef = useRef(false);

  // Real slide index (0..COUNT-1) for the active dot
  const activeDot = (index - 1 + COUNT) % COUNT;

  // moving lock: transitionend na aaye tab bhi lock khul jaye
  const lock = useCallback(() => {
    moving.current = true;
    clearTimeout(unlockTimer.current);
    unlockTimer.current = setTimeout(() => {
      moving.current = false;
    }, TRANSITION_MS + 300);
  }, []);

  // index kabhi track (0..COUNT+1) se bahar nahi jayega -> banner white nahi hoga
  const next = useCallback(() => {
    if (moving.current) return;
    lock();
    setAnimate(true);
    setIndex((i) => Math.min(i + 1, COUNT + 1));
  }, [lock]);

  const prev = useCallback(() => {
    if (moving.current) return;
    lock();
    setAnimate(true);
    setIndex((i) => Math.max(i - 1, 0));
  }, [lock]);

  const goTo = useCallback(
    (slideIndex) => {
      const target = slideIndex + 1;
      if (moving.current || target === index) return;
      lock();
      setAnimate(true);
      setIndex(target);
    },
    [index, lock]
  );

  // Page load ke 500ms baad autoplay shuru (images load hone ka time)
  useEffect(() => {
    const id = setTimeout(() => setReady(true), 500);
    return () => clearTimeout(id);
  }, []);

  // Autoplay: hover par band nahi hota. Sirf drag ke dauran ruka rehta hai.
  useEffect(() => {
    if (dragging || !ready) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [dragging, ready, index, next]);

  // Re-enable animation after a silent jump
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimate(true))
    );
    return () => cancelAnimationFrame(id);
  }, [animate]);

  useEffect(() => () => clearTimeout(unlockTimer.current), []);

  // Backup: clone slide par pahunchne ke baad transitionend na aaye tab bhi
  // silently real slide par jump ho jayega (isi se banner white hota tha)
  useEffect(() => {
    if (dragging) return;
    if (index !== COUNT + 1 && index !== 0) return;
    const id = setTimeout(() => {
      moving.current = false;
      setAnimate(false);
      setIndex(index === 0 ? COUNT : 1);
    }, TRANSITION_MS + 50);
    return () => clearTimeout(id);
  }, [index, dragging]);

  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return;
    moving.current = false;
    if (index === COUNT + 1) {
      setAnimate(false);
      setIndex(1);
    } else if (index === 0) {
      setAnimate(false);
      setIndex(COUNT);
    }
  };

  /* ---------------- drag / swipe: mouse + touch + pen ----------------
     Listeners window par lagte hain, isliye mouse slider se bahar
     chala jaye tab bhi drag sahi chalta hai. */
  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return; // sirf left click
    if (moving.current) return;

    const startX = e.clientX;
    const startY = e.clientY;
    let axis = null; // "x" | "y"
    let dx = 0;

    draggingRef.current = true;
    setDragging(true);

    const move = (ev) => {
      if (!draggingRef.current) return;
      dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      if (axis === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }
      if (axis === "x") setDragX(dx);
    };

    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);

      draggingRef.current = false;
      setDragging(false);
      setDragX(0);

      if (axis === "x" && Math.abs(dx) > SWIPE_MIN_PX) {
        if (dx < 0) next();
        else prev();
      }
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  /* ---------------- trackpad: do ungli se left/right swipe ----------------
     Laptop trackpad ka horizontal swipe pointer event nahi, wheel event hota hai. */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let acc = 0;
    let lastChange = 0;
    let resetTimer;

    const onWheel = (e) => {
      // sirf horizontal gesture; vertical page scroll ko mat roko
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault(); // browser back/forward gesture na ho

      const now = Date.now();
      if (now - lastChange < 700) return; // ek swipe = ek slide

      acc += e.deltaX;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        acc = 0;
      }, 150);

      if (Math.abs(acc) > 50) {
        if (acc > 0) next();
        else prev();
        acc = 0;
        lastChange = now;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      clearTimeout(resetTimer);
    };
  }, [next, prev]);

  return (
    <div className="mx-auto w-full max-w-[1920px]">
      <section
        ref={sectionRef}
        aria-label="Hero slider"
        aria-roledescription="carousel"
        style={{ aspectRatio: ASPECT_RATIO }}
        className={`relative w-full touch-pan-y select-none overflow-hidden bg-white ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={onPointerDown}
        onDragStart={(e) => e.preventDefault()}
      >
        <div
          className={`flex ${
            animate && !dragging
              ? "transition-transform duration-500 ease-in-out"
              : ""
          }`}
          style={{ transform: `translateX(calc(-${index * 100}% + ${dragX}px))` }}
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
                <HeroSlide {...slide} isClone={isClone} />
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