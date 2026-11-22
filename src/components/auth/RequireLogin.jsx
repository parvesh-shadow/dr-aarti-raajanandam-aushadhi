"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Login check (client side backup). Login nahi hai to login page par bhejta hai,
// login ke baad user wapas isi page par aata hai. Login hone par hi children dikhte hain.
export default function RequireLogin({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive) return;
        if (d?.user) setOk(true);
        else router.replace(`/auth/login?next=${encodeURIComponent(pathname)}`);
      })
      .catch(() => alive && router.replace(`/auth/login?next=${encodeURIComponent(pathname)}`));
    return () => {
      alive = false;
    };
  }, [pathname, router]);

  return ok ? children : null;
}
