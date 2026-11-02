"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Pencil } from "lucide-react";

const inputClass =
  "mt-2 h-12 w-full border border-gray-200 bg-white px-4 text-sm text-black outline-none transition-colors placeholder:text-gray-400 focus:border-[#C5A84C] sm:text-base";

const labelClass = "text-sm font-medium text-black sm:text-base";

export default function ProfilePage() {
  const [form, setForm] = useState({
    fullName: "Priya Sharma",
    email: "priya@example.com",
    mobile: "+91 98745 61230",
    dob: "2000-01-31",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API call yahan aayegi
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      <h2 className="text-2xl font-semibold leading-8 text-gray-800 sm:text-[28px]">
        Personal details
      </h2>

      {/* Fields */}
      <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="mobile" className={labelClass}>
            Mobile Number
          </label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            value={form.mobile}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="dob" className={labelClass}>
            Date of Birth
          </label>
          <div className="relative">
            <input
              id="dob"
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
              className={`${inputClass} [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0`}
            />
            <CalendarDays
              className="pointer-events-none absolute right-4 top-1/2 mt-1 h-5 w-5 -translate-y-1/2 text-black"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="mt-6">
        <p className={labelClass}>Address</p>

        <div className="relative mt-3 border-l-4 border-[#C5A84C] bg-gray-50 p-4">
          <p className="text-xs text-black sm:text-sm">Saved delivery address</p>
          <p className="mt-3 text-base font-medium text-black sm:text-lg">Home</p>
          <p className="mt-2 text-xs text-black sm:text-sm">
            24 C-Scheme, Ashok Marg, Jaipur, Rajasthan 302001
          </p>

          <Link
            href="/account/address"
            aria-label="Edit saved address"
            className="absolute right-4 top-4 text-black transition-colors hover:text-[#C5A84C]"
          >
            <Pencil className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-end">
        <Link
          href="/account/password-security"
                    className="group flex h-12 items-center justify-center gap-2 bg-[#C5A84C] px-8 text-sm font-medium uppercase text-white transition-colors hover:bg-[#A88C35] sm:min-w-[190px]"
     
 >
          Change Password
           <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>

        <button
          type="submit"
                  className="flex h-12 items-center justify-center border border-black bg-white px-8 text-sm font-medium text-black transition-colors hover:bg-gray-50 sm:min-w-[190px]"
         >
          Save Changes
         
        </button>
      </div>
    </form>
  );
}