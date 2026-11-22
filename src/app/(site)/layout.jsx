import WhatsAppButton from "@/components/home/WhatshapIntegrate";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { getSiteSettings } from "@/lib/siteSettings";

// Footer me admin ke contact/social settings aate hain, isliye har request par render
export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }) {
  const settings = await getSiteSettings();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      {children}
      <Footer phone={settings.phone} email={settings.email} socials={settings.socials} />
       <WhatsAppButton />
    </>
  );
}
