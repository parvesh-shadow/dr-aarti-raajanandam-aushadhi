"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";
import { syncShopSession } from "@/lib/shopSession";

// Image mil jaye to yahan path daalo, e.g. "/login-banner.jpg"
const LOGIN_IMAGE = "/authimage.jpg";

const INPUT_CLASS =
  "mt-0.5 w-full border border-gray-200 bg-gray-100 px-4 py-3 text-xs text-black placeholder:text-gray-500 focus:border-[#C5A84C] focus:outline-none focus:ring-1 focus:ring-[#C5A84C] sm:text-sm";
const LABEL_CLASS = "block text-sm font-medium text-black sm:text-base";

export default function LoginForm({ className = "" }) {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/user-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        // Guest cart/wishlist ko account me merge karo, phir aage badho
        await syncShopSession();
        // /cart ya /wishlist se aaye the to wahin wapas bhejo (sirf apni site ke path)
        const next = new URLSearchParams(window.location.search).get("next");
        const safeNext = next && /^\/(?!\/|\\)/.test(next) ? next : "/account";
        router.push(safeNext);
        router.refresh();
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      aria-label="Log in"
      className={`mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 ${className}`}
    >
      {/* Left: form */}
      <div className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-center">
        <h1 className="text-xl font-semibold text-black sm:text-2xl">
          Welcome Back
        </h1>
        <p className="mt-1 text-xs text-gray-800 sm:text-sm">
          Log in to access your account, orders, and saved details.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
          <div>
            <label htmlFor="login-identifier" className={LABEL_CLASS}>
              Email Address or Mobile Number
            </label>
            <input
              id="login-identifier"
              name="identifier"
              type="text"
              autoComplete="username"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter your email address or mobile number"
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label htmlFor="login-password" className={LABEL_CLASS}>
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`${INPUT_CLASS} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute bottom-0 right-0 flex h-[46px] w-11 items-center justify-center text-gray-600 transition-colors hover:text-[#A88C35] sm:h-[50px]"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 bg-[#C5A84C] px-4 py-3 text-xs font-medium uppercase tracking-wide text-white transition-colors hover:bg-[#A88C35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A88C35] disabled:opacity-60 sm:text-sm"
            >
              {loading ? "Please wait..." : "Sign in"}
              {!loading && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
            </button>

            <Link
              href="/auth/register"
              className="flex w-full items-center justify-center gap-2 border border-black bg-white px-4 py-3 text-xs font-medium uppercase tracking-wide text-black transition-colors hover:border-[#A88C35] hover:bg-[#C5A84C] hover:text-white sm:text-sm"
            >
              Create new account
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </form>
      </div>

      {/* Right: image
          small screen: hidden
          lg+: square image, max 440px */}
      <div className="relative hidden w-full overflow-hidden lg:block lg:aspect-square lg:max-w-[440px] lg:justify-self-center">
        {LOGIN_IMAGE ? (
          <Image
            src={LOGIN_IMAGE}
            alt="Raaj Anandam Aushadhi Ayurvedic products in a wicker basket"
            width={1000}
            height={1000}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full lg:h-full lg:object-cover lg:object-center"
          />
        ) : (
          <div className="relative aspect-[1/1] w-full lg:aspect-auto lg:h-full">
            <ImagePlaceholder
              label="Login banner"
              className="absolute inset-0"
            />
          </div>
        )}
      </div>
    </section>
  );
}