"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.svg";
import SocialIcon from "@/components/shared/SocialIcon";
import { platformLabel } from "@/lib/socials";

// ---------- Static content (footer sab jagah same) ----------
const TAGLINE =
  "Thoughtful Ayurvedic formulations for modern, everyday wellbeing";
const NEWSLETTER_TITLE = "Stay in touch";
const NEWSLETTER_TEXT = "Receive seasonal wisdom, rituals and product notes.";
const ADDRESS =
  "Shop No. 12, Anand Wellness Plaza, MG Road, Near City Hospital, Pune, Maharashtra – 411001, India";

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
      { label: "My Orders", href: "/account/order" },
      // { label: "Order History", href: "/account/order" },
      { label: "Saved Addresses", href: "/account/address" },
      { label: "My Appointments", href: "/account/appointments" },
      { label: "Wishlist", href: "/wishlist" },
    ],
  },
];

const linkClass =
  "text-xs text-white transition-colors hover:text-[#C5A84C] active:text-[#A88C35] sm:text-sm";

// phone, email, socials admin (Site Settings) se aate hain
export default function Footer({ phone = "", email = "", socials = [] }) {
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const [sending, setSending] = useState(false);
  const [subError, setSubError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setSubError("");
    setSubscribed(false);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: subscribeEmail }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubError(d.error || "Could not subscribe. Please try again.");
        return;
      }
      setSubscribed(true);
      setSubscribeEmail("");
    } catch {
      setSubError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
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
                  setSubError("");
                }}
                placeholder="Your email address"
                className="w-full bg-transparent py-2 text-sm text-white placeholder:text-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={sending}
                aria-label="Subscribe"
                className="pl-2 text-white transition-colors hover:text-[#C5A84C] active:text-[#A88C35]"
              >
                <ArrowRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </form>
            {subError && (
              <p role="alert" className="mt-2 text-xs text-red-400 xl:text-sm">
                {subError}
              </p>
            )}
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
            {phone && (
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${phone.replace(/[\s()-]/g, "")}`}
                  className="transition-colors hover:text-[#C5A84C]"
                >
                  {phone}
                </a>
              </li>
            )}
            {email && (
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${email}`}
                  className="break-all transition-colors hover:text-[#C5A84C]"
                >
                  {email}
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-400" />

        {/* ROW 2: social icons + link columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-8 xl:px-20">
          {/* Column 1: Social icons (mobile par row, sm+ par column) */}
          <ul className="col-span-2 flex gap-5 sm:col-span-1 sm:flex-col sm:gap-5">
            {socials.map(({ platform, url }, i) => (
              <li key={`${platform}-${i}`}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platformLabel(platform)}
                  className="inline-flex transition-colors hover:text-[#C5A84C] active:text-[#A88C35]"
                >
                  <SocialIcon platform={platform} />
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