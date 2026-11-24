import Script from "next/script";
import WhatsAppButton from "@/components/home/WhatshapIntegrate";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { getSiteSettings } from "@/lib/siteSettings";

// Footer me admin ke contact/social settings aate hain, isliye har request par render
export const dynamic = "force-dynamic";


export const metadata = {
  verification: {
    google: "ULhFJUN62MplmWoy4pbXs3pSADT90Pf8xk3yAURaIkA",
  },
};

export default async function SiteLayout({ children }) {
  const settings = await getSiteSettings();

  return (
    <>
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N3X8RXTC');
          `,
        }}
      />

      <ScrollToTop />
      <Navbar />
      {children}
      <Footer
        phone={settings.phone}
        email={settings.email}
        socials={settings.socials}
      />
      <WhatsAppButton />
    </>
  );
}


// import WhatsAppButton from "@/components/home/WhatshapIntegrate";
// import Footer from "@/components/shared/Footer";
// import Navbar from "@/components/shared/Navbar";
// import ScrollToTop from "@/components/shared/ScrollToTop";
// import { getSiteSettings } from "@/lib/siteSettings";

// // Footer me admin ke contact/social settings aate hain, isliye har request par render
// export const dynamic = "force-dynamic";

// export default async function SiteLayout({ children }) {
//   const settings = await getSiteSettings();

//   return (
//     <>
//       <ScrollToTop />
//       <Navbar />
//       {children}
//       <Footer phone={settings.phone} email={settings.email} socials={settings.socials} />
//        <WhatsAppButton />
//     </>
//   );
// }
