"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useCartCount } from "@/lib/checkoutStore";
import { useWishlistCount } from "@/lib/wishlistStore";
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

// Icon ke upar chhota count badge (0 par chhupa rehta hai)
function CountBadge({ count }) {
  if (!count) return null;
  return (
    <span
      aria-hidden="true"
      className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C5A84C] px-1 text-[10px] font-semibold leading-none text-white"
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

// Search icon (laptop + mobile dono me same). data-search-toggle: outside-click isse ignore karta hai
function SearchToggle({ open, onToggle }) {
  return (
    <button
      type="button"
      aria-label={open ? "Close search" : "Search"}
      aria-expanded={open}
      data-search-toggle
      onClick={onToggle}
      className={`${iconBtn} ${open ? "text-[#A88C35]" : ""}`}
    >
      <Search className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

const subscribeDesktop = (cb) => {
  const mq = window.matchMedia("(min-width: 1024px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const useIsDesktop = () =>
  useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false
  );

// Search bar + live product results. Laptop par dropdown, mobile par niche expand hota hai.
function SearchPanel({ query, setQuery, onClose, mobile = false, panelRef }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const [res, setRes] = useState({ q: "", items: [], total: 0, error: false });
  const q = query.trim();
  const active = q.length >= 2;
  const current = res.q === q ? res : null;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!active) return;
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const r = await fetch(`/api/products?q=${encodeURIComponent(q)}&limit=5`, {
          signal: ctrl.signal,
          cache: "no-store",
        });
        const d = r.ok ? await r.json() : null;
        if (!d) throw new Error("bad");
        setRes({ q, items: d.products || [], total: d.total || 0, error: false });
      } catch (e) {
        if (e.name !== "AbortError") setRes({ q, items: [], total: 0, error: true });
      }
    }, 250);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [q, active]);

  const submit = (e) => {
    e.preventDefault();
    if (!q) return;
    router.push(`/products?q=${encodeURIComponent(q)}`);
    onClose();
  };

  return (
    <div ref={panelRef} className={mobile ? "w-full" : "relative w-72 xl:w-96"}>
      <form
        role="search"
        onSubmit={submit}
        className="flex items-center border border-gray-300 bg-white focus-within:border-[#C5A84C]"
      >
        <Search className="ml-3 h-4 w-4 shrink-0 text-gray-500" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          enterKeyHint="search"
          autoComplete="off"
          maxLength={60}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Ayurvedic medicines..."
          aria-label="Search products"
          className="h-10 w-full bg-transparent px-3 text-sm text-black outline-none placeholder:text-gray-500"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="px-3 text-gray-500 hover:text-black"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </form>

      {active && (
        <div
          className={
            mobile
              ? "mt-2 max-h-[60vh] overflow-y-auto border border-gray-200 bg-white"
              : "absolute left-0 right-0 top-full z-50 mt-1 max-h-96 overflow-y-auto border border-gray-200 bg-white shadow-lg"
          }
        >
          {!current ? (
            <p className="p-4 text-sm text-gray-600">Searching...</p>
          ) : current.error ? (
            <p className="p-4 text-sm text-[#E3122E]">Could not search right now. Please try again.</p>
          ) : current.items.length === 0 ? (
            <p className="p-4 text-sm text-gray-600">No products found for “{q}”.</p>
          ) : (
            <>
              <ul>
                {current.items.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={p.href}
                      onClick={onClose}
                      className="flex items-center gap-3 border-b border-gray-100 p-3 transition-colors hover:bg-gray-50"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image || "/medicine1.jpg"}
                        alt=""
                        loading="lazy"
                        className="h-12 w-12 shrink-0 bg-gray-100 object-cover"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-black">{p.name}</span>
                        <span className="block truncate text-xs text-gray-500">{p.category}</span>
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-black">₹{p.price}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/products?q=${encodeURIComponent(q)}`}
                onClick={onClose}
                className="block p-3 text-center text-sm font-medium text-[#A88C35] hover:bg-gray-50"
              >
                View all {current.total} result{current.total === 1 ? "" : "s"}
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Navbar ke bahar declare kiya hai (render ke andar nahi)
function UserIcons({ onNavigate, mobile = false, searchOpen = false, onToggleSearch }) {
  const pathname = usePathname();
  const onAccountPage = pathname.startsWith("/account");
  const cartCount = useCartCount();
  const wishlistCount = useWishlistCount();

  const openSidebar = () => {
    onNavigate?.();
    window.dispatchEvent(new Event("open-account-sidebar"));
  };

  return (
    <div className="flex items-center gap-1">
      {searchOpen ? null : mobile && onAccountPage ? (
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

      <SearchToggle open={searchOpen} onToggle={onToggleSearch} />
      <Link
        href="/wishlist"
        onClick={onNavigate}
        aria-label={`Wishlist${wishlistCount ? `, ${wishlistCount} items` : ""}`}
        className={`relative ${iconBtn}`}
      >
        <Heart className="h-5 w-5" aria-hidden="true" />
        <CountBadge count={wishlistCount} />
      </Link>
      <Link
        href="/cart"
        onClick={onNavigate}
        aria-label={`Cart${cartCount ? `, ${cartCount} items` : ""}`}
        className={`relative ${iconBtn}`}
      >
        <ShoppingBag className="h-5 w-5" aria-hidden="true" />
        <CountBadge count={cartCount} />
      </Link>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Asli login status: user = null (logged out), authReady = check ho chuka hai
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const panelRef = useRef(null);
  const isDesktop = useIsDesktop();

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setQuery("");
  }, []);
  const toggleSearch = () => {
    if (searchOpen) return closeSearch();
    setOpen(false);
    setSearchOpen(true);
  };

  // Search ke bahar tap / Escape par band
  useEffect(() => {
    if (!searchOpen) return;
    const onDown = (e) => {
      if (panelRef.current?.contains(e.target) || e.target.closest?.("[data-search-toggle]")) return;
      closeSearch();
    };
    const onKey = (e) => e.key === "Escape" && closeSearch();
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [searchOpen, closeSearch]);

  // Har page change par status dobara check hota hai (login/logout ke baad update ho jaye)
  useEffect(() => {
    let cancelled = false;

    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const data = res.ok ? await res.json() : null;
        if (!cancelled) setUser(data?.user ?? null);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setAuthReady(true);
      }
    }

    checkAuth();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const isLoggedIn = !!user;

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-lg">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex items-center justify-between px-4 py-2 sm:px-6 lg:px-20"
      >
        <Link href="/" aria-label="Raaj Anandam Aushadhi home" className="shrink-0">
          <Image
            src={logo}
            alt="Raaj Anandam Aushadhi"
            priority
            className="h-16 w-16 rounded-full object-cover"
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
                    active ? "text-[#C5A84C]" : "text-black"
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
          {searchOpen && isDesktop ? (
            <SearchPanel query={query} setQuery={setQuery} onClose={closeSearch} panelRef={panelRef} />
          ) : (
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 bg-[#C5A84C] px-5 py-2.5 text-sm text-white transition-colors hover:bg-[#A88C35] active:bg-[#A88C35]"
            >
              Book a Appointment
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}

          {!authReady ? (
            // Check hone tak jagah rok kar rakho, taaki button jump na kare
            <div className="h-10 w-24" aria-hidden="true" />
          ) : isLoggedIn ? (
            <UserIcons searchOpen={searchOpen} onToggleSearch={toggleSearch} />
          ) : (
            <>
              {!searchOpen && (
                <Link
                  href="/auth/login"
                  className="border border-black px-5 py-2.5 text-sm text-black transition-colors hover:border-[#A88C35] hover:bg-[#A88C35] hover:text-white active:border-[#A88C35] active:text-[#A88C35]"
                >
                  Log in
                </Link>
              )}
              <SearchToggle open={searchOpen} onToggle={toggleSearch} />
            </>
          )}
        </div>

        {/* Mobile: icons (logged in) + toggle */}
        <div className="flex items-center gap-1 lg:hidden">
          {authReady &&
            (isLoggedIn ? (
              <UserIcons mobile onNavigate={close} searchOpen={searchOpen} onToggleSearch={toggleSearch} />
            ) : (
              <SearchToggle open={searchOpen} onToggle={toggleSearch} />
            ))}

          <button
            type="button"
            onClick={() => {
              closeSearch();
              setOpen((v) => !v);
            }}
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

      {/* Mobile / tablet search bar */}
      {searchOpen && !isDesktop && (
        <div className="border-t border-gray-200 px-4 py-3 sm:px-6 lg:hidden">
          <SearchPanel mobile query={query} setQuery={setQuery} onClose={closeSearch} panelRef={panelRef} />
        </div>
      )}

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
                    className={`block rounded-md border-l-4 px-3 py-3 text-base font-semibold transition-colors hover:text-[#A88C35] active:text-[#A88C35] ${
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

            {authReady && !isLoggedIn && (
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