import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/siteUrl";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Raaj Anandam Aushadhi | Authentic Ayurvedic Medicines",
  description:
    "Dr. Arti\u2019s Raaj Anandam Aushadhi \u2013 shop authentic Ayurvedic medicines online, read wellness blogs and book an appointment.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
   
        <main>{children}</main>
   
      </body>
    </html>
  );
}
