import { NextResponse } from "next/server";
import { COOKIE, verifyToken } from "@/lib/auth";

export async function proxy(req) {
  const { pathname } = req.nextUrl;
  const go = (path) => NextResponse.redirect(new URL(path, req.url));

  if (pathname.startsWith("/admin")) {
    const t = req.cookies.get(COOKIE.admin)?.value;
    const ok = t ? !!(await verifyToken(t, "admin")) : false;
    if (pathname === "/admin/login") return ok ? go("/admin/dashboard") : NextResponse.next();
    if (!ok) return go("/admin/login");
  }

  if (pathname.startsWith("/account")) {
    const t = req.cookies.get(COOKIE.user)?.value;
    const ok = t ? !!(await verifyToken(t, "user")) : false;
    if (!ok) return go("/auth/login?next=/account");
  }

  // Cart / wishlist dekhne ke liye login zaroori; login ke baad wapas usi page par
  if (pathname === "/cart" || pathname === "/wishlist") {
    const t = req.cookies.get(COOKIE.user)?.value;
    const ok = t ? !!(await verifyToken(t, "user")) : false;
    if (!ok) return go(`/auth/login?next=${pathname}`);
  }

  // Buy (checkout) ke liye login zaroori; login ke baad wapas checkout par
  if (pathname.startsWith("/checkout")) {
    const t = req.cookies.get(COOKIE.user)?.value;
    const ok = t ? !!(await verifyToken(t, "user")) : false;
    if (!ok) return go("/auth/login?next=/checkout");
  }

  if (pathname === "/auth/login" || pathname === "/auth/register") {
    const t = req.cookies.get(COOKIE.user)?.value;
    if (t && (await verifyToken(t, "user"))) return go("/account");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/auth/:path*", "/cart", "/wishlist", "/checkout/:path*"],
};