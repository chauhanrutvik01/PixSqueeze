import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "PixSqueeze — Compress Images to an Exact Size", template: "%s | PixSqueeze" },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.name, title: "PixSqueeze Image Compressor", description: site.description, url: site.url },
  twitter: { card: "summary_large_image" },
  verification: { google: "ADD_SEARCH_CONSOLE_VERIFICATION_CODE" },
};

export const viewport: Viewport = { themeColor: "#fbfaf5", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${fraunces.variable}`}>
      <body>
        {/* Google Analytics hook: add the approved Script tags here after choosing a consent configuration. */}
        <Header /><main>{children}</main><Footer />
      </body>
    </html>
  );
}
