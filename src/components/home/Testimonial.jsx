


// "use client";

// import { useRef, useState, useCallback, useEffect } from "react";
// import { Star } from "lucide-react";
// import TitleDescription from "@/components/shared/TitleDescription";
// import Slider from "@/components/shared/Slider";

// const REELS = [
//   { id: "DehLOu1SRrG", title: "Raajanandam Aushadhi Instagram reel 1" },
//   { id: "Dd1GMlLyzGK", title: "Raajanandam Aushadhi Instagram reel 2" },
//   { id: "DSFvYbejKxy", title: "Raajanandam Aushadhi Instagram reel 3" },
//   { id: "DS9L1ufkuje", title: "Raajanandam Aushadhi Instagram reel 4" },
//   { id: "DeMXxvMJA82", title: "Raajanandam Aushadhi Instagram reel 5" },
// ];

// const CARD_MAX_PX = 340;
// const HEADER_PX = 48; // profile strip ki height (pehle 68px thi jisse video ka top leak hokar repeat ho raha tha)
// const REEL_CROP_TOP_PX = 80; // reel video ko top se align karne ke liye header crop offset
// const EMBED_SCALE = 1.43;
// const REEL_HEIGHT_PX = 460;

// /* ------------------------------------------------------------------
//    ReelFrame
//    - `active`  : is reel ko currently "unlocked" kiya gaya hai?
//    - `onPlay`  : user click par call hota hai (overlay button se)
//    - `version` : agar badhe to iframe remount ho jaata hai (playback reset)
// ------------------------------------------------------------------ */
// function ReelFrame({ id, title, active, onPlay, version }) {
//   const src = `https://www.instagram.com/reel/${id}/embed`;
//   const leftOffset = -((EMBED_SCALE - 1) / 2) * 100;

//   return (
//     <div
//       className="mx-auto w-full overflow-hidden border border-gray-200 bg-white"
//       style={{ maxWidth: CARD_MAX_PX }}
//     >
//       {/* 1) Header (profile strip) */}
//       <div className="relative w-full overflow-hidden" style={{ height: HEADER_PX }}>
//         <iframe
//           src={src}
//           title={`${title} (profile)`}
//           loading="lazy"
//           scrolling="no"
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: 600,
//             border: 0,
//           }}
//         />
//       </div>

//       {/* 2) Reel (9:16) with side crop */}
//       <div
//         className="relative w-full overflow-hidden bg-black"
//         style={{ height: REEL_HEIGHT_PX }}
//       >
//         <iframe
//           /* KEY: active hone par version use karo, warna "idle"
//              Isse inactive reel ka iframe remount hokar ruk jaata hai */
//           key={`${id}-${active ? version : "idle"}`}
//           src={src}
//           title={title}
//           loading="lazy"
//           scrolling="no"
//           allowFullScreen
//           allow="autoplay; encrypted-media; picture-in-picture"
//           style={{
//             position: "absolute",
//             top: `-${REEL_CROP_TOP_PX}px`,
//             left: `${leftOffset}%`,
//             width: `${EMBED_SCALE * 100}%`,
//             height: 900,
//             border: 0,
//           }}
//         />

//         {/* Overlay: sirf tab dikhe jab reel inactive ho.
//             Ye pehla click capture karta hai -> purana reel band -> phir hat jaata hai */}
//         {!active && (
//           <button
//             type="button"
//             aria-label={`Play ${title}`}
//             onClick={() => onPlay(id)}
//             className="absolute inset-0 z-10 cursor-pointer bg-transparent"
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// const REVIEWS = [
//   {
//     id: 1,
//     title: "A Smooth and Convenient Experience",
//     text: "The ordering process was very simple, and my product arrived well packed. I also appreciated the clear information provided on the website.",
//     name: "Priya S.",
//   },
//   {
//     id: 2,
//     title: "Good Product Experience",
//     text: "I found the product information easy to understand and the overall shopping experience was convenient. The packaging was neat and secure.",
//     name: "Neha R.",
//   },
//   {
//     id: 3,
//     title: "Helpful and Professional Service",
//     text: "I contacted the team with a question before ordering and received a helpful response. The overall experience was professional and easy.",
//     name: "Anita M.",
//   },
//   {
//     id: 4,
//     title: "A Smooth and Convenient Experience",
//     text: "The ordering process was very simple, and my product arrived well packed. I also appreciated the clear information provided on the website.",
//     name: "Priya S.",
//   },
//   {
//     id: 5,
//     title: "Good Product Experience",
//     text: "I found the product information easy to understand and the overall shopping experience was convenient. The packaging was neat and secure.",
//     name: "Neha R.",
//   },
//   {
//     id: 6,
//     title: "Helpful and Professional Service",
//     text: "I contacted the team with a question before ordering and received a helpful response. The overall experience was professional and easy.",
//     name: "Anita M.",
//   },
// ];

// export default function Testimonial() {
//   /* ---------- Auto-stop previous reel ---------- */
//   const [activeId, setActiveId] = useState(null);
//   const [versions, setVersions] = useState(() =>
//     Object.fromEntries(REELS.map((r) => [r.id, 0]))
//   );
//   const lastActiveRef = useRef(null);

//   const handlePlay = useCallback((id) => {
//     if (lastActiveRef.current === id) return;

//     // Purane reel ka version badhao -> uska iframe remount -> playback ruk jaata hai
//     if (lastActiveRef.current) {
//       const prev = lastActiveRef.current;
//       setVersions((v) => ({ ...v, [prev]: (v[prev] || 0) + 1 }));
//     }

//     lastActiveRef.current = id;
//     setActiveId(id);
//   }, []);

//   /* ---------- Extra safety: jab page hide ho to sab reset ---------- */
//   useEffect(() => {
//     const resetOnHide = () => {
//       if (document.hidden && lastActiveRef.current) {
//         const prev = lastActiveRef.current;
//         setVersions((v) => ({ ...v, [prev]: (v[prev] || 0) + 1 }));
//         lastActiveRef.current = null;
//         setActiveId(null);
//       }
//     };
//     document.addEventListener("visibilitychange", resetOnHide);
//     return () =>
//       document.removeEventListener("visibilitychange", resetOnHide);
//   }, []);

//   return (
//     <>
//       {/* Instagram video testimonials */}
//       {REELS.length > 0 && (
//         <section
//           aria-labelledby="video-testimonials-heading"
//           className="mx-auto py-10 sm:py-14 px-4 sm:px-6 lg:px-8 lg:px-20"
//         >
//           <TitleDescription
//             id="video-testimonials-heading"
//             heading="Hear From Our Wellness Community"
//             description="Discover genuine customer experiences with Dr. Arti’s Raaj Anandam Aushadhi. Watch short stories from customers sharing their product experience, ordering journey and overall experience with our brand."
//             align="left"
//             contentClassName="max-w-4xl"
//           />

//           <Slider
//             label="Instagram reels"
//             itemClassName="w-full sm:w-1/2 lg:w-1/4"
//             className="mt-10"
//           >
//             {REELS.map((reel) => (
//               <ReelFrame
//                 key={reel.id}
//                 id={reel.id}
//                 title={reel.title}
//                 active={activeId === reel.id}
//                 onPlay={handlePlay}
//                 version={versions[reel.id]}
//               />
//             ))}
//           </Slider>
//         </section>
//       )}

//       {/* Written reviews */}
//       {REVIEWS.length > 0 && (
//         <section
//           aria-labelledby="reviews-heading"
//           className="mx-auto py-5 px-4 sm:px-6 lg:px-8 lg:px-20"
//         >
//           <TitleDescription
//             id="reviews-heading"
//             heading="Trusted by Our Wellness Community"
//             description="Hear from customers who have explored Dr. Arti’s Raaj Anandam Aushadhi and experienced our products, service, and convenient online shopping journey."
//             align="left"
//             contentClassName="max-w-4xl"
//           />

//           <Slider label="Customer reviews" className="mt-10">
//             {REVIEWS.map(({ id, title, text, name }) => (
//               <article
//                 key={id}
//                 className="flex h-full flex-col border border-gray-300 bg-white p-4 sm:p-5"
//               >
//                 <div
//                   className="flex gap-0.5"
//                   role="img"
//                   aria-label="Rated 5 out of 5"
//                 >
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <Star
//                       key={i}
//                       className="h-4 w-4 fill-[#C5A84C] text-[#C5A84C]"
//                       aria-hidden="true"
//                     />
//                   ))}
//                 </div>

//                 <h3 className="mt-3 lg:text-[20px] font-semibold text-gray-800 text-base">
//                   &ldquo;{title}&rdquo;
//                 </h3>
//                 <p className="mt-3 flex-1 lg:text-[16px] text-gray-600 text-sm">
//                   &ldquo;{text}&rdquo;
//                 </p>

//                 <p className="mt-3.5 text-sm font-semibold text-black sm:text-base">
//                   {name}
//                 </p>
//                 <p className="text-sm text-gray-800">Verified Customer</p>
//               </article>
//             ))}
//           </Slider>
//         </section>
//       )}
//     </>
//   );
// }
"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Star } from "lucide-react";
import TitleDescription from "@/components/shared/TitleDescription";
import Slider from "@/components/shared/Slider";

const REELS = [
  { id: "DehLOu1SRrG", title: "Raajanandam Aushadhi Instagram reel 1" },
  { id: "Dd1GMlLyzGK", title: "Raajanandam Aushadhi Instagram reel 2" },
  { id: "DSFvYbejKxy", title: "Raajanandam Aushadhi Instagram reel 3" },
  { id: "DS9L1ufkuje", title: "Raajanandam Aushadhi Instagram reel 4" },
  { id: "DeMXxvMJA82", title: "Raajanandam Aushadhi Instagram reel 5" },
];

const CARD_MAX_PX = 340;
const HEADER_PX = 40; // scale(0.8) ke baad header chhota ho gaya, isliye 48 se 40 (gap hatane ke liye)
const REEL_CROP_TOP_PX = 86; // reel ke upar ki black patti hatane ke liye 80 se 86
const EMBED_SCALE = 1.43;
const REEL_HEIGHT_PX = 460;

/* ------------------------------------------------------------------
   ReelFrame
   - `active`  : is reel ko currently "unlocked" kiya gaya hai?
   - `onPlay`  : user click par call hota hai (overlay button se)
   - `version` : agar badhe to iframe remount ho jaata hai (playback reset)
------------------------------------------------------------------ */
function ReelFrame({ id, title, active, onPlay, version }) {
  const src = `https://www.instagram.com/reel/${id}/embed`;
  const leftOffset = -((EMBED_SCALE - 1) / 2) * 100;

  return (
    <div
      className="mx-auto w-full overflow-hidden border border-gray-200 bg-white"
      style={{ maxWidth: CARD_MAX_PX }}
    >
      {/* 1) Header (profile strip) */}
      <div className="relative w-full overflow-hidden" style={{ height: HEADER_PX }}>
        <iframe
          src={src}
          title={`${title} (profile)`}
          loading="lazy"
          scrolling="no"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "125%", // pehle "100%" tha
            height: 600,
            border: 0,
            transform: "scale(0.8)", // naya: text chhota, View profile ke peeche cut nahi hoga
            transformOrigin: "top left", // naya
          }}
        />
      </div>

      {/* 2) Reel (9:16) with side crop */}
      <div
        className="relative w-full overflow-hidden bg-black"
        style={{ height: REEL_HEIGHT_PX }}
      >
        <iframe
          /* KEY: active hone par version use karo, warna "idle"
             Isse inactive reel ka iframe remount hokar ruk jaata hai */
          key={`${id}-${active ? version : "idle"}`}
          src={src}
          title={title}
          loading="lazy"
          scrolling="no"
          allowFullScreen
          allow="autoplay; encrypted-media; picture-in-picture"
          style={{
            position: "absolute",
            top: `-${REEL_CROP_TOP_PX}px`,
            left: `${leftOffset}%`,
            width: `${EMBED_SCALE * 100}%`,
            height: 900,
            border: 0,
          }}
        />

        {/* Overlay: sirf tab dikhe jab reel inactive ho.
            Ye pehla click capture karta hai -> purana reel band -> phir hat jaata hai */}
        {!active && (
          <button
            type="button"
            aria-label={`Play ${title}`}
            onClick={() => onPlay(id)}
            className="absolute inset-0 z-10 cursor-pointer bg-transparent"
          />
        )}
      </div>
    </div>
  );
}

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

export default function Testimonial() {
  /* ---------- Auto-stop previous reel ---------- */
  const [activeId, setActiveId] = useState(null);
  const [versions, setVersions] = useState(() =>
    Object.fromEntries(REELS.map((r) => [r.id, 0]))
  );
  const lastActiveRef = useRef(null);

  const handlePlay = useCallback((id) => {
    if (lastActiveRef.current === id) return;

    // Purane reel ka version badhao -> uska iframe remount -> playback ruk jaata hai
    if (lastActiveRef.current) {
      const prev = lastActiveRef.current;
      setVersions((v) => ({ ...v, [prev]: (v[prev] || 0) + 1 }));
    }

    lastActiveRef.current = id;
    setActiveId(id);
  }, []);

  /* ---------- Extra safety: jab page hide ho to sab reset ---------- */
  useEffect(() => {
    const resetOnHide = () => {
      if (document.hidden && lastActiveRef.current) {
        const prev = lastActiveRef.current;
        setVersions((v) => ({ ...v, [prev]: (v[prev] || 0) + 1 }));
        lastActiveRef.current = null;
        setActiveId(null);
      }
    };
    document.addEventListener("visibilitychange", resetOnHide);
    return () =>
      document.removeEventListener("visibilitychange", resetOnHide);
  }, []);

  return (
    <>
      {/* Instagram video testimonials */}
      {REELS.length > 0 && (
        <section
          aria-labelledby="video-testimonials-heading"
          className="mx-auto py-10 sm:py-14 px-4 sm:px-6 lg:px-8 lg:px-20"
        >
          <TitleDescription
            id="video-testimonials-heading"
            heading="Hear From Our Wellness Community"
            description="Discover genuine customer experiences with Dr. Arti’s Raaj Anandam Aushadhi. Watch short stories from customers sharing their product experience, ordering journey and overall experience with our brand."
            align="left"
            contentClassName="max-w-4xl"
          />

          <Slider
            label="Instagram reels"
            itemClassName="w-full sm:w-1/2 lg:w-1/4"
            className="mt-10"
          >
            {REELS.map((reel) => (
              <ReelFrame
                key={reel.id}
                id={reel.id}
                title={reel.title}
                active={activeId === reel.id}
                onPlay={handlePlay}
                version={versions[reel.id]}
              />
            ))}
          </Slider>
        </section>
      )}

      {/* Written reviews */}
      {REVIEWS.length > 0 && (
        <section
          aria-labelledby="reviews-heading"
          className="mx-auto py-5 px-4 sm:px-6 lg:px-8 lg:px-20"
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
      )}
    </>
  );
}