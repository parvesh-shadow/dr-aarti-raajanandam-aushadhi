"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Leaf,
  User,
  Box,
  Truck,
  CalendarDays,
  Lock,
  LogOut,
  ChevronRight,
  X,
} from "lucide-react";
import RequireLogin from "@/components/auth/RequireLogin";
import heroImg from "@/assets/pageimage.jpg";

const links = [
  { label: "Dashboard", href: "/account", icon: Leaf },
  { label: "My Profile", href: "/account/profile", icon: User },
  { label: "My Orders", href: "/account/order", icon: Box },
  { label: "My Appointments", href: "/account/appointments", icon: CalendarDays },
  { label: "Saved Address", href: "/account/address", icon: Truck },
  {
    label: "Password & Security",
    href: "/account/password-security",
    icon: Lock,
  },
];

// Layout ke bahar declare kiya hai, taaki "component created during render" error na aaye
function SidebarContent({ pathname, user, onNavigate }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const isActive = (href) =>
    href === "/account" ? pathname === href : pathname.startsWith(href);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "user" }),
      });
    } catch {
      // network error aaye tab bhi home par bhej do
    } finally {
      onNavigate?.();
      router.push("/");
      router.refresh();
      setLoggingOut(false);
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center gap-3 border-b border-[#C5A84C] pb-4">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-[#C5A84C] font-semibold text-white xl:text-xl">
          {user?.name?.[0]?.toUpperCase() || "U"}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium sm:text-base">
            {user?.name || "Loading..."}
          </p>
          <p className="truncate text-sm text-gray-500">{user?.email || ""}</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={`flex items-center justify-between rounded px-3 py-1.5 text-sm sm:text-base ${
                isActive(link.href)
                  ? "bg-[#C5A84C] text-white"
                  : "text-gray-800"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon size={20} strokeWidth={1.75} />
                {link.label}
              </span>
              <ChevronRight size={18} />
            </Link>
          );
        })}

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="mt-4 flex items-center justify-between rounded px-3 py-2.5 text-left text-sm font-semibold text-[#E3122E] transition-colors disabled:opacity-60"
        >
          <span className="flex items-center gap-3">
            <LogOut size={20} strokeWidth={1.75} />
            {loggingOut ? "Logging out..." : "Log Out"}
          </span>
          <ChevronRight size={18} />
        </button>
      </nav>
    </>
  );
}

export default function AccountLayout({ children }) {
  return (
    <RequireLogin>
      <AccountShell>{children}</AccountShell>
    </RequireLogin>
  );
}

function AccountShell({ children }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Asli logged-in user ka data
  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setUser(d?.user ?? null))
      .catch(() => setUser(null));
  }, []);

  // Profile save hone par sidebar/heading ka naam turant badle
  useEffect(() => {
    const onUpdate = (e) => setUser((u) => (u ? { ...u, ...e.detail } : u));
    window.addEventListener("profile-updated", onUpdate);
    return () => window.removeEventListener("profile-updated", onUpdate);
  }, []);

  // Navbar ke profile icon se aane wala event sunna
  useEffect(() => {
    const open = () => setDrawerOpen(true);
    window.addEventListener("open-account-sidebar", open);
    return () => window.removeEventListener("open-account-sidebar", open);
  }, []);

  // Drawer khula ho to: Escape se band, laptop size par band, scroll lock
  useEffect(() => {
    if (!drawerOpen) return;

    const onKey = (e) => e.key === "Escape" && setDrawerOpen(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => e.matches && setDrawerOpen(false);

    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      {/* Hero */}
      <section className="relative w-full overflow-hidden md:h-[240px] lg:h-[300px]">
        <Image
          src={heroImg}
          alt="Account hero"
          sizes="100vw"
          priority
          className="block h-auto w-full md:absolute md:inset-0 md:h-full md:object-cover md:object-[center_40%]"
        />

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-20">
            <h1 className="text-3xl font-semibold text-gray-800 md:text-[44px]">
              Welcome Back, {user?.name?.split(" ")[0] || "there"}!
            </h1>
            <p className="mt-2 max-w-md text-sm text-gray-600 sm:text-base">
              Manage your profile, track orders, and explore your wellness
              essentials.
            </p>
          </div>
        </div>
      </section>

      {/* Sidebar + Page content */}
      <section className="mx-auto grid grid-cols-1 items-start gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[350px_1fr] lg:px-20">
        <aside className="hidden rounded-md border border-gray-200 p-4 lg:sticky lg:top-24 lg:block">
          <SidebarContent pathname={pathname} user={user} />
        </aside>

        <div className="min-w-0">{children}</div>
      </section>

      {/* Mobile menu (right side se khulta hai) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={closeDrawer} />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Account menu"
            className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white p-4 shadow-xl"
          >
            <button
              type="button"
              onClick={closeDrawer}
              aria-label="Close account menu"
              className="mb-2 ml-auto block p-1 text-black transition-colors hover:text-[#C5A84C]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <SidebarContent
              pathname={pathname}
              user={user}
              onNavigate={closeDrawer}
            />
          </div>
        </div>
      )}
    </>
  );
}