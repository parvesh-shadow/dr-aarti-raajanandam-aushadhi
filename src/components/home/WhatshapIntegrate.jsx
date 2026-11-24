"use client";

import { useState } from "react";
import Image from "next/image";
import whatsappIcon from "@/assets/whatsapp.webp";

// Number: country code ke saath, + ya space ke bina.
// Better: .env.local mein NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX rakho.
const WHATSAPP_NUMBER = "918057091291";
const PREFILLED_MESSAGE =
  "Hello Raajanandam Aushadhi, I have a question about your products / my order.";

const CHAT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`;

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const onEnter = (e) => {
    if (e.pointerType === "mouse") setOpen(true);
  };
  const onLeave = (e) => {
    if (e.pointerType === "mouse") setOpen(false);
  };

  return (
    <div
      className="pointer-events-none fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:right-6"
      // onMouseEnter={() => setOpen(true)}
      // onMouseLeave={() => setOpen(false)}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      {/* chat card */}
      <div
        role="status"
        className={`w-64 origin-bottom-right rounded-2xl border border-[#C5A84C]/30 bg-white p-4 shadow-xl transition-all duration-300 ease-out ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "translate-y-2 scale-95 opacity-0"
        }`}
      >
        <div className="mb-1 flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full bg-[#25D366]"
            aria-hidden="true"
          />
          <p className="text-sm font-semibold text-[#1f2a44]">
            Raajanandam Aushadhi
          </p>
        </div>
        <p className="text-sm leading-snug text-slate-600">
          Questions about our products, orders or delivery? Message us on
          WhatsApp.
        </p>
      </div>

      {/* floating button */}
      <a
        href={CHAT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Raajanandam Aushadhi on WhatsApp"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="pointer-events-auto relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#25D366] shadow-lg ring-4 ring-white transition-transform duration-300 hover:scale-110 sm:h-16 sm:w-16"
      >
        <span className="absolute inset-1 animate-ping rounded-full bg-[#25D366] opacity-60 [animation-duration:2.5s]" />
        <Image
          src={whatsappIcon}
          alt=""
          width={48}
          height={48}
          className="relative h-10 w-10 rounded-full sm:h-12 sm:w-12"
        />
      </a>
    </div>
  );
}
