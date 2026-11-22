"use client";

import { syncShopSession } from "@/lib/shopSession";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";

// Image mil jaye to yahan path daalo, e.g. "/signup-banner.jpg"
const SIGNUP_IMAGE = "/authimage.jpg";

const INPUT_CLASS =
  "mt-0.5 w-full border border-gray-200 bg-gray-100 px-4 py-3 text-xs text-black placeholder:text-gray-500 focus:border-[#C5A84C] focus:outline-none focus:ring-1 focus:ring-[#C5A84C] sm:text-sm";
const LABEL_CLASS = "block text-sm font-medium text-black sm:text-base";

export default function SignupForm({ className = "" }) {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          phone: form.mobile,
          password: form.password,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        await syncShopSession(); // guest cart/wishlist naye account me chali jaye
        router.push("/account");
        router.refresh();
      } else {
        setError(data.error || "Signup failed. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      aria-label="Create account"
      className={`mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-8 lg:grid-cols-2 lg:gap-16 lg:px-8 ${className}`}
    >
      {/* Left: form */}
      <div className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-center">
        <h1 className="text-xl font-semibold text-black sm:text-2xl">
          Create Your Account
        </h1>
        <p className="mt-1 text-xs text-gray-800 sm:text-sm">
          Join our wellness community for a more personalized shopping
          experience.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <label htmlFor="signup-name" className={LABEL_CLASS}>
              Full Name
            </label>
            <input
              id="signup-name"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label htmlFor="signup-email" className={LABEL_CLASS}>
              Email Address
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label htmlFor="signup-mobile" className={LABEL_CLASS}>
              Mobile Number
            </label>
            <input
              id="signup-mobile"
              name="mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              required
              maxLength={10}
              value={form.mobile}
              onChange={handleChange}
              placeholder="Enter your 10-digit mobile number"
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label htmlFor="signup-password" className={LABEL_CLASS}>
              Create Password
            </label>
            <div className="relative">
              <input
                id="signup-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={8}
                value={form.password}
                onChange={handleChange}
                placeholder="Min 8 chars, A-z, 0-9"
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

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 bg-[#C5A84C] px-4 py-3 text-xs font-medium uppercase tracking-wide text-white transition-colors hover:bg-[#A88C35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A88C35] disabled:opacity-60 sm:text-sm"
            >
              {loading ? "Please wait..." : "Create account"}
              {!loading && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
            </button>

            <p className="mt-4 text-center text-xs text-gray-800 sm:text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-[#A88C35] underline-offset-2 transition-colors hover:text-[#8A7229] hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Right: image
          small screen: hidden
          lg+: square image, max 440px */}
      <div className="relative hidden w-full overflow-hidden lg:block lg:aspect-square lg:max-w-[440px] lg:justify-self-center">
        {SIGNUP_IMAGE ? (
          <Image
            src={SIGNUP_IMAGE}
            alt="Raaj Anandam Aushadhi Ayurvedic products in a wicker basket"
            width={1000}
            height={1000}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full lg:h-full lg:object-cover lg:object-center"
          />
        ) : (
          <div className="relative aspect-[1/1] w-full lg:aspect-auto lg:h-full">
            <ImagePlaceholder
              label="Signup banner"
              className="absolute inset-0"
            />
          </div>
        )}
      </div>
    </section>
  );
}