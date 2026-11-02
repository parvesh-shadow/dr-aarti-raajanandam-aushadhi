"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.svg";

// ---------- Static content (footer sab jagah same) ----------
const TAGLINE =
  "Thoughtful Ayurvedic formulations for modern, everyday wellbeing";
const NEWSLETTER_TITLE = "Stay in touch";
const NEWSLETTER_TEXT = "Receive seasonal wisdom, rituals and product notes.";
const ADDRESS =
  "Shop No. 12, Anand Wellness Plaza, MG Road, Near City Hospital, Pune, Maharashtra – 411001, India";
const PHONE = "+91 98765 43210";
const EMAIL = "info@raajanandamaushadhi.com";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Ayurvedic Medicines", href: "/products" },
      { label: "Blogs", href: "/blogs" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Shipping & Delivery Policy", href: "/shipping-policy" },
      { label: "Return / Refund Policy", href: "/refund-policy" },
      { label: "Appointment", href: "/appointment" },
    ],
  },
  {
    title: "My account",
    links: [
      { label: "My Profile", href: "/account" },
      { label: "My Orders", href: "/account/orders" },
      { label: "Order History", href: "/account/order-history" },
      { label: "Saved Addresses", href: "/account/addresses" },
      { label: "My Appointments", href: "/account/appointments" },
      { label: "Wishlist", href: "/account/wishlist" },
    ],
  },
];

// Social icons (lucide ke naye version me brand icons nahi hote, isliye inline SVG)
const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/raajanandam_aushadhi",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const linkClass =
  "text-xs text-white transition-colors hover:text-[#C5A84C] active:text-[#A88C35] sm:text-sm";

export default function Footer() {
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: newsletter API baad me jodenge
    setSubscribed(true);
    setSubscribeEmail("");
  };

  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-12 xl:px-20">
        {/* ROW 1: logo + newsletter + contact */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12 lg:items-start">
          {/* Logo + tagline */}
          <div className="flex items-center gap-4 sm:gap-6 md:col-span-2 lg:col-span-5">
            <Link
              href="/"
              aria-label="Raaj Anandam Aushadhi home"
              className="shrink-0 rounded-full bg-white p-1"
            >
              <Image
                src={logo}
                alt="Raaj Anandam Aushadhi"
                className="h-14 w-14 rounded-full object-cover md:h-[72px] md:w-[72px] xl:h-24 xl:w-24"
              />
            </Link>
            <p className="max-w-[240px] text-sm xl:max-w-[200px] xl:text-[18px]">
              {TAGLINE}
            </p>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1 lg:col-span-4">
            <p className="text-sm">{NEWSLETTER_TITLE}</p>
            <p className="mt-1 max-w-[260px] text-sm sm:text-base xl:max-w-[220px]">
              {NEWSLETTER_TEXT}
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-1 flex w-full max-w-xs items-center border-b border-gray-400 focus-within:border-[#C5A84C]"
            >
              <label htmlFor="footer-email" className="sr-only">
                Your email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={subscribeEmail}
                onChange={(e) => {
                  setSubscribeEmail(e.target.value);
                  setSubscribed(false);
                }}
                placeholder="Your email address"
                className="w-full bg-transparent py-2 text-sm text-white placeholder:text-white focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="pl-2 text-white transition-colors hover:text-[#C5A84C] active:text-[#A88C35]"
              >
                <ArrowRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </form>
            {subscribed && (
              <p
                role="status"
                className="mt-2 text-xs text-[#C5A84C] xl:text-sm"
              >
                Thank you for subscribing.
              </p>
            )}
          </div>

          {/* Contact */}
          <ul className="space-y-4 text-sm md:col-span-1 lg:col-span-3">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{ADDRESS}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              <a
                href={`tel:${PHONE.replace(/\s/g, "")}`}
                className="transition-colors hover:text-[#C5A84C]"
              >
                {PHONE}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <a
                href={`mailto:${EMAIL}`}
                className="break-all transition-colors hover:text-[#C5A84C]"
              >
                {EMAIL}
              </a>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-400" />

        {/* ROW 2: social icons + link columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-8 xl:px-20">
          {/* Column 1: Social icons (mobile par row, sm+ par column) */}
          <ul className="col-span-2 flex gap-5 sm:col-span-1 sm:flex-col sm:gap-5">
            {SOCIALS.map(({ label, href, icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex transition-colors hover:text-[#C5A84C] active:text-[#A88C35]"
                >
                  {icon}
                </a>
              </li>
            ))}
          </ul>

          {/* Columns 2, 3, 4: links */}
          {COLUMNS.map(({ title, links }) => (
            <div key={title}>
              <h3 className="text-sm font-medium sm:text-base">{title}</h3>
              <ul className="mt-3 space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className={linkClass}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className="mb-4 mt-10 border-gray-600" />

        {/* ROW 3: bottom bar */}
        <div className="flex flex-col gap-3 text-center text-xs sm:text-sm md:flex-row md:items-center md:justify-between md:text-left lg:text-base">
          <p>
            © {new Date().getFullYear()} Raaj Anandam Aushadhi
            <span className="mx-2" aria-hidden="true">
              •
            </span>
            Designed &amp; Developed by{" "}
            <a
              href="https://dgtlinnovations.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#C5A84C]"
            >
              Digital Innovations
            </a>
          </p>
          <p>
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-[#C5A84C]"
            >
              Privacy Policy
            </Link>
            <span className="mx-2" aria-hidden="true">
              •
            </span>
            <Link
              href="/terms"
              className="transition-colors hover:text-[#C5A84C]"
            >
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}