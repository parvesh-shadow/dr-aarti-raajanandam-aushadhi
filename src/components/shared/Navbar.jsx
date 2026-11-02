// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ArrowRight, Menu, Search, ShoppingBag, User, X } from "lucide-react";
// import logo from "@/assets/logo.svg";

// const NAV_LINKS = [
//   { label: "Home", href: "/" },
//   { label: "About Us", href: "/about" },
//   { label: "Ayurvedic Medicines", href: "/products" },
//   { label: "Blogs", href: "/blogs" },
//   { label: "Contact Us", href: "/contact" },
// ];

// const iconBtn =
//   "p-2 text-black transition-colors hover:text-[#A88C35] active:text-[#A88C35]";

// // Navbar ke bahar declare kiya hai (render ke andar nahi)
// function UserIcons({ onNavigate }) {
//   return (
//     <div className="flex items-center gap-1">
//       <Link
//         href="/account"
//         onClick={onNavigate}
//         aria-label="My account"
//         className="p-2 text-[#C5A84C] transition-colors hover:text-[#A88C35]"
//       >
//         <User className="h-5 w-5" aria-hidden="true" />
//       </Link>
//       <button type="button" aria-label="Search" className={iconBtn}>
//         <Search className="h-5 w-5" aria-hidden="true" />
//       </button>
//       <Link
//         href="/cart"
//         onClick={onNavigate}
//         aria-label="Cart"
//         className={iconBtn}
//       >
//         <ShoppingBag className="h-5 w-5" aria-hidden="true" />
//       </Link>
//     </div>
//   );
// }

// export default function Navbar() {
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);

//   // TODO: baad me auth (cookie / context / session) se aayega.
//   // Abhi test ke liye true karke icons dekh sakte ho.
//   const [isLoggedIn] = useState(true);

//   const isActive = (href) =>
//     href === "/" ? pathname === "/" : pathname.startsWith(href);

//   const close = () => setOpen(false);

//   return (
//     <header className="sticky top-0 z-40 bg-white shadow-lg">
//       <nav
//         aria-label="Main navigation"
//         className="mx-auto flex items-center justify-between  py-2 px-4 sm:px-6 lg:px-8 lg:px-20"
//       >
//         <Link href="/" aria-label="Raaj Anandam Aushadhi home" className="shrink-0">
//           <Image
//             src={logo}
//             alt="Raaj Anandam Aushadhi"
//             priority
//             className="rounded-full object-cover h-16 w-16"
//           />
//         </Link>

//         {/* Desktop links */}
//         <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
//           {NAV_LINKS.map(({ label, href }) => {
//             const active = isActive(href);
//             return (
//               <li key={href}>
//                 <Link
//                   href={href}
//                   aria-current={active ? "page" : undefined}
//                   className={`relative inline-block pb-2 text-base font-semibold transition-colors hover:text-[#A88C35] active:text-[#A88C35] ${
//                     active ? " text-[#C5A84C]" : "text-black"
//                   }`}
//                 >
//                   {label}
//                   {active && (
//                     <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#C5A84C]" />
//                   )}
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>

//         {/* Desktop buttons */}
//         <div className="hidden items-center gap-3 lg:flex">
//           <Link
//             href="/appointment"
//             className="inline-flex items-center gap-2 bg-[#C5A84C] px-5 py-2.5 text-sm text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35]"
//           >
//             Book a Appointment
//             <ArrowRight className="h-4 w-4" aria-hidden="true" />
//           </Link>

//           {isLoggedIn ? (
//             <UserIcons />
//           ) : (
//             <Link
//               href="/auth/login"
//               className="border border-black px-5 py-2.5 text-sm text-black transition-colors hover:border-[#A88C35] hover:bg-[#A88C35] hover:text-white active:border-[#A88C35] active:text-[#A88C35]"
//             >
//               Log in
//             </Link>
//           )}
//         </div>

//         {/* Mobile: icons (logged in) + toggle */}
//         <div className="flex items-center gap-1 lg:hidden">
//           {isLoggedIn && <UserIcons onNavigate={close} />}

//           <button
//             type="button"
//             onClick={() => setOpen((v) => !v)}
//             aria-expanded={open}
//             aria-controls="mobile-menu"
//             aria-label={open ? "Close menu" : "Open menu"}
//             className="p-2 text-black transition-colors hover:text-[#A88C35]"
//           >
//             {open ? (
//               <X className="h-6 w-6" aria-hidden="true" />
//             ) : (
//               <Menu className="h-6 w-6" aria-hidden="true" />
//             )}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile / tablet menu */}
//       {open && (
//         <div
//           id="mobile-menu"
//           className="border-t border-gray-200 px-4 pb-4 sm:px-6 lg:hidden"
//         >
//           <ul className="flex flex-col py-2">
//             {NAV_LINKS.map(({ label, href }) => {
//               const active = isActive(href);
//               return (
//                 <li key={href}>
//                   <Link
//                     href={href}
//                     onClick={close}
//                     aria-current={active ? "page" : undefined}
//                     className={`block border-l-4 px-3 py-3 text-base rounded-md font-semibold transition-colors hover:text-[#A88C35] active:text-[#A88C35] ${
//                       active
//                         ? "border-[#C5A84C] text-[#C5A84C]"
//                         : "border-transparent text-black"
//                     }`}
//                   >
//                     {label}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//           <div className="flex flex-col gap-3 sm:flex-row">
//             <Link
//               href="/appointment"
//               onClick={close}
//               className="flex-1 bg-[#C5A84C] px-5 py-2.5 text-center text-sm text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35]"
//             >
//               Book a Appointment
//             </Link>

//             {!isLoggedIn && (
//               <Link
//                 href="/auth/login"
//                 onClick={close}
//                 className="flex-1 border border-black px-5 py-2.5 text-center text-sm text-black transition-colors hover:border-[#A88C35] hover:text-[#A88C35] active:border-[#A88C35] active:text-[#A88C35]"
//               >
//                 Log in
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }





"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import logo from "@/assets/logo.svg";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Ayurvedic Medicines", href: "/products" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
];

const iconBtn =
  "p-2 text-black transition-colors hover:text-[#A88C35] active:text-[#A88C35]";

// Navbar ke bahar declare kiya hai (render ke andar nahi)
function UserIcons({ onNavigate, mobile = false }) {
  const pathname = usePathname();
  const onAccountPage = pathname.startsWith("/account");

  const openSidebar = () => {
    onNavigate?.();
    window.dispatchEvent(new Event("open-account-sidebar"));
  };

  return (
    <div className="flex items-center gap-1">
      {mobile && onAccountPage ? (
        // Mobile + account page: sidebar menu khulega
        <button
          type="button"
          aria-label="Open account menu"
          onClick={openSidebar}
          className="p-2 text-[#C5A84C] transition-colors hover:text-[#A88C35]"
        >
          <User className="h-5 w-5" aria-hidden="true" />
        </button>
      ) : (
        // Laptop, ya kisi aur page par: seedha /account par jao
        <Link
          href="/account"
          onClick={onNavigate}
          aria-label="My account"
          className="p-2 text-[#C5A84C] transition-colors hover:text-[#A88C35]"
        >
          <User className="h-5 w-5" aria-hidden="true" />
        </Link>
      )}

      <button type="button" aria-label="Search" className={iconBtn}>
        <Search className="h-5 w-5" aria-hidden="true" />
      </button>
      <Link
        href="/cart"
        onClick={onNavigate}
        aria-label="Cart"
        className={iconBtn}
      >
        <ShoppingBag className="h-5 w-5" aria-hidden="true" />
      </Link>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // TODO: baad me auth (cookie / context / session) se aayega.
  const [isLoggedIn] = useState(true);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-lg">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex items-center justify-between  py-2 px-4 sm:px-6 lg:px-8 lg:px-20"
      >
        <Link href="/" aria-label="Raaj Anandam Aushadhi home" className="shrink-0">
          <Image
            src={logo}
            alt="Raaj Anandam Aushadhi"
            priority
            className="rounded-full object-cover h-16 w-16"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
          {NAV_LINKS.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`relative inline-block pb-2 text-base font-semibold transition-colors hover:text-[#A88C35] active:text-[#A88C35] ${
                    active ? " text-[#C5A84C]" : "text-black"
                  }`}
                >
                  {label}
                  {active && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#C5A84C]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/appointment"
            className="inline-flex items-center gap-2 bg-[#C5A84C] px-5 py-2.5 text-sm text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35]"
          >
            Book a Appointment
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          {isLoggedIn ? (
            <UserIcons />
          ) : (
            <Link
              href="/auth/login"
              className="border border-black px-5 py-2.5 text-sm text-black transition-colors hover:border-[#A88C35] hover:bg-[#A88C35] hover:text-white active:border-[#A88C35] active:text-[#A88C35]"
            >
              Log in
            </Link>
          )}
        </div>

        {/* Mobile: icons (logged in) + toggle */}
        <div className="flex items-center gap-1 lg:hidden">
          {isLoggedIn && <UserIcons mobile onNavigate={close} />}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="p-2 text-black transition-colors hover:text-[#A88C35]"
          >
            {open ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile / tablet menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-gray-200 px-4 pb-4 sm:px-6 lg:hidden"
        >
          <ul className="flex flex-col py-2">
            {NAV_LINKS.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={`block border-l-4 px-3 py-3 text-base rounded-md font-semibold transition-colors hover:text-[#A88C35] active:text-[#A88C35] ${
                      active
                        ? "border-[#C5A84C] text-[#C5A84C]"
                        : "border-transparent text-black"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/appointment"
              onClick={close}
              className="flex-1 bg-[#C5A84C] px-5 py-2.5 text-center text-sm text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35]"
            >
              Book a Appointment
            </Link>

            {!isLoggedIn && (
              <Link
                href="/auth/login"
                onClick={close}
                className="flex-1 border border-black px-5 py-2.5 text-center text-sm text-black transition-colors hover:border-[#A88C35] hover:text-[#A88C35] active:border-[#A88C35] active:text-[#A88C35]"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}