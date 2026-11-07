"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  FileText,
  CalendarDays,
  MessageSquare,
  Mail,
  Settings,
  ExternalLink,
  Star,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
  { href: "/admin/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
  { href: "/admin/subscribers", label: "Subscribers", icon: Mail },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function logout() {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "admin" }),
      });
    } catch {}
    router.replace("/admin/login");
    router.refresh();
  }

  const active = (href) => pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="min-h-screen bg-gray-50 text-black flex flex-col lg:flex-row">
      <style>
        {`
    @keyframes pulse-online {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.5);
        opacity: 0.4;
      }
    }
  `}
      </style>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex  h-20 items-center justify-between border-b border-gray-200 bg-white px-4 py-3 lg:hidden w-full">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={60}
            height={60}
            className="object-contain"
            unoptimized
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none text-gray-800">
              Dr Arti
            </span>
            <span className="text-sm text-gray-500 leading-tight">
              Raaj Anandam Aushadhi
            </span>
          </div>
        </div>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <Menu size={22} />
        </button>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header - Laptop par 80px, Mobile par 110px (Badi height) */}
        <div
          style={{
            minHeight: "80px",
            height: "80px",
            backgroundColor: "#1B365D",
          }}
          className="flex items-center px-4 py-4 border-b border-gray-400 shrink-0 w-full max-lg:!min-h-[110px]"
        >
          <div className="flex items-center gap-3 w-full">
            <Image
              src="/logo.svg"
              alt="Dr Arti Logo"
              width={50}
              height={50}
              className="object-contain shrink-0 border border-white rounded-full"
              priority
              unoptimized
            />
            <div className="flex flex-col justify-center overflow-hidden">
              <span className="text-lg font-bold text-white leading-tight">
                Dr Arti
              </span>
              <span className=" text-xs lg:text-sm text-white leading-tight whitespace-nowrap">
                Raaj Anandam Aushadhi
              </span>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="lg:hidden text-white p-1 rounded-full shrink-0 ml-auto"
            style={{backgroundColor:"#005A9C"}}
          >
            <X size={20} />
          </button>
        </div>

        <nav
          className="flex-1 space-y-1 p-3  overflow-y-auto "
          aria-label="Admin"
         style={{ backgroundColor: "#1B365D", fontWeight: "600" }}
        >
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={active(href) ? "page" : undefined}
              onMouseEnter={(e) => {
                if (!active(href))
                  e.currentTarget.style.backgroundColor = "#005A9C";
              }}
              onMouseLeave={(e) => {
                if (!active(href)) e.currentTarget.style.backgroundColor = "";
              }}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm ${
                active(href) ? "text-white" : "text-white"
              }`}
              style={{
                backgroundColor: active(href) ? "#005A9C" : "transparent",
              }}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        <div
          style={{ backgroundColor: "#1B365D" }}
          className="border-t border-gray-200 p-3"
        >
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#005A9C")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
            className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-white"
          >
            <ExternalLink size={18} />
            View Website
          </Link>

          <button
            onClick={logout}
            disabled={loggingOut}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#005A9C")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
            className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-white disabled:opacity-60"
          >
            <LogOut size={18} />
            {loggingOut ? "Signing out..." : "Logout"}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* DESKTOP TOP HEADER - Laptop par 80px */}
        <header
          style={{ height: "80px", minHeight: "80px" }}
          className="hidden lg:flex items-center justify-end border-b border-gray-200 bg-white px-8 sticky top-0 z-20 shrink-0"
        >
          {/* Right Side: Admin Control + Online + Avatar */}
          <div className="flex items-center gap-5">
            {/* Text Status */}
            <div className="flex flex-col items-end justify-center">
              <span className="text-lg font-bold text-gray-800 text-right leading-tight">
                Admin Control
              </span>
              <div className="flex items-center justify-end gap-1.5 mt-1 w-full">
                <span className="relative flex h-2 w-2">
                  <span
                    style={{
                      backgroundColor: "#4ade80",
                      animation: "pulse-online 1.5s ease-in-out infinite",
                    }}
                    className="absolute inline-flex h-full w-full rounded-full"
                  ></span>

                  <span
                    style={{ backgroundColor: "#22c55e" }}
                    className="relative inline-flex rounded-full h-2 w-2"
                  ></span>
                </span>

                <span
                  style={{
                    color: "#22c55e",
                    fontSize: "10px",
                    fontWeight: 600,
                    textAlign: "right",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Online
                </span>
              </div>
            </div>

            {/* Avatar (A) */}
            <div  className="flex items-center justify-center h-11 w-11  border border-gray-200 text-white font-bold text-lg shadow-sm" style={{backgroundColor:"#1B365D"}}>
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 xl:p-8">{children}</main>
      </div>
    </div>
  );
}
