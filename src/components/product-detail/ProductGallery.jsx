"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";

// images = [src, src, ...]
// Laptop/desktop (lg+): main box 480 x 550 + thumbs column (106px wide), side by side.
// Tablet/mobile (< lg): main image full width, thumbnails 5-column row below it.

const ZOOM = 2.5;

// Bada image viewer. Image par click/tap karo to us point par zoom hota hai (mouse hilao to
// zoomed image us taraf khiskti hai). Dobara click karne par wapas normal size.
function Lightbox({ images, name, active, onSelect, onClose }) {
  const [zoom, setZoom] = useState(null); // null = normal, {x, y} = zoomed (% me origin)
  const boxRef = useRef(null);
  // Image box square hai: height = 80vh, width = height (chhoti screen me screen ke andar fit)
  const [vp, setVp] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));
  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const wide = vp.w >= 640; // thumbnails side me (wide) ya niche (mobile)
  // Navbar (~88px) ke neeche rahe, isliye upar se TOP_GAP chhodte hain
  const TOP_GAP = 88;
  const size = Math.max(
    200,
    Math.floor(
      wide
        ? Math.min(vp.h * 0.8, vp.h - TOP_GAP - 36, vp.w - 190)
        : Math.min(vp.h * 0.7, vp.h - TOP_GAP - 120, vp.w - 56)
    )
  );
  const down = useRef({ x: 0, y: 0, moved: false });
  const src = images[active];

  // Esc se band, aur peeche ka page scroll na ho
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const point = (e) => {
    const r = boxRef.current.getBoundingClientRect();
    return {
      x: Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)),
      y: Math.min(100, Math.max(0, ((e.clientY - r.top) / r.height) * 100)),
    };
  };

  const handleDown = (e) => {
    down.current = { x: e.clientX, y: e.clientY, moved: false };
  };
  const handleMove = (e) => {
    if (!zoom) return;
    if (Math.hypot(e.clientX - down.current.x, e.clientY - down.current.y) > 8) down.current.moved = true;
    setZoom(point(e));
  };
  const handleClick = (e) => {
    if (down.current.moved) {
      down.current.moved = false; // touch drag ke baad unzoom na ho
      return;
    }
    setZoom(zoom ? null : point(e));
  };

  // Portal: navbar (sticky, z-40) ke upar aaye, kisi parent ke stacking context me na phase
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${name} - image viewer`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.7)",
        padding: `${TOP_GAP}px 12px 12px`,
      }}
      onClick={onClose}
    >
      <div
        className="relative flex flex-col gap-2 border-4 border-black bg-white p-2 sm:flex-row"
        style={{ maxWidth: "100%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="absolute -right-3 -top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white shadow"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="relative shrink-0" style={{ width: size, height: size }}>
          <div
            ref={boxRef}
            onPointerDown={handleDown}
            onPointerMove={handleMove}
            onClick={handleClick}
            style={{ position: "absolute", inset: 0, overflow: "hidden", touchAction: "none" }}
            className={zoom ? "cursor-zoom-out" : "cursor-zoom-in"}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={name}
              draggable={false}
              className="select-none"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                transform: zoom ? `scale(${ZOOM})` : "scale(1)",
                transformOrigin: zoom ? `${zoom.x}% ${zoom.y}%` : "50% 50%",
                transition: "transform 200ms ease",
              }}
            />
          </div>
        </div>

        <ul
          className="flex shrink-0 gap-2 sm:flex-col"
          style={
            wide
              ? { width: 92, height: size, overflowY: "auto" }
              : { width: size, maxWidth: "100%", overflowX: "auto", overflowY: "hidden" }
          }
        >
          {images.map((t, i) => (
            <li
              key={i}
              className="shrink-0"
              style={
                wide
                  ? images.length === 1
                    ? { width: 92, height: 92 }
                    : { flex: "1 1 0%", minHeight: 0 }
                  : { flex: "0 0 auto", width: 64, height: 64 }
              }
            >
              <button
                type="button"
                onClick={() => {
                  setZoom(null);
                  onSelect(i);
                }}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === active}
                className={`relative block h-full w-full overflow-hidden border-2 bg-white ${
                  i === active ? "border-[#C5A84C]" : "border-gray-200 hover:border-[#A88C35]"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t} alt="" className="h-full w-full object-cover" draggable={false} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  );
}

export default function ProductGallery({
  images = [],
  name = "Product",
  className = "",
}) {
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState(false);
  const armed = useRef(true); // band hone ke baad hover se turant dobara na khule
  const shown = images.slice(0, 5); // max 5 images (thumbnails aur viewer dono me)
  const thumbs = shown;
  const viewable = shown.filter(Boolean);

  const openViewer = () => {
    if (images[active]) setViewer(true);
  };
  const closeViewer = useCallback(() => {
    armed.current = false;
    setViewer(false);
  }, []);

  return (
    <div
      className={`flex w-full flex-col gap-3 lg:max-w-1/2 lg:flex-row ${className}`}
    >
      {/* Main Image */}
      <div className="w-full min-w-0 lg:w-auto lg:shrink-0">
        <div
          // Mouse hover par bada viewer khulta hai; mobile/touch par tap se
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse" && armed.current) openViewer();
          }}
          onPointerLeave={() => {
            armed.current = true;
          }}
          onClick={openViewer}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), openViewer())}
          role={images[active] ? "button" : undefined}
          tabIndex={images[active] ? 0 : undefined}
          aria-label={images[active] ? `Open large image of ${name}` : undefined}
          className={`relative mx-auto aspect-[480/550] w-full max-w-[480px] overflow-hidden border border-[#C2C2C2] bg-white lg:mx-0 lg:aspect-auto lg:h-[550px] lg:w-[480px] lg:max-w-none ${
            images[active] ? "cursor-zoom-in" : ""
          }`}
        >
          {images[active] ? (
            <Image
              src={images[active]}
              alt={name}
              fill
              priority
              quality={100}
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover object-center"
            />
          ) : (
            <ImagePlaceholder
              label="Product image"
              className="absolute inset-0"
            />
          )}
        </div>
      </div>

      {/* Thumbnails: desktop par height 550px (main image ke barabar), 5 slots + 4 gaps (4 x 8px = 32px) */}
      <ul className="mx-auto grid w-full max-w-[480px] grid-cols-5 gap-2 lg:mx-0 lg:flex lg:h-[550px] lg:w-[106px] lg:max-w-none lg:shrink-0 lg:flex-col">
        {thumbs.map((src, i) => (
          <li
            key={i}
            className="aspect-[110/100] lg:aspect-auto lg:h-[calc((100%-32px)/5)] lg:min-h-0 lg:flex-none"
          >
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              className={`relative block h-full w-full overflow-hidden border bg-white transition-colors ${
                i === active
                  ? "border-[#C5A84C]"
                  : "border-gray-200 hover:border-[#A88C35]"
              }`}
            >
              {src ? (
                <Image
                  src={src}
                  alt={`${name} thumbnail ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 106px, 20vw"
                  className="object-cover object-center"
                />
              ) : (
                <ImagePlaceholder label="" className="absolute inset-0" />
              )}
            </button>
          </li>
        ))}
      </ul>

      {viewer && viewable.length > 0 && (
        <Lightbox
          images={shown}
          name={name}
          active={active}
          onSelect={setActive}
          onClose={closeViewer}
        />
      )}
    </div>
  );
}