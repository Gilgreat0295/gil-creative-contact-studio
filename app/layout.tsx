import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://gil-creative-co-portfolio.noisymimosa.chatgpt.site"),
  title: {
    default: "Gil Creative Co. — Design with a point of view",
    template: "%s — Gil Creative Co.",
  },
  description:
    "Gil Creative Co. is the independent practice of Gilbert Gospel Jacob: branding, campaigns, motion, video and digital design.",
  authors: [{ name: "Gilbert Gospel Jacob" }],
  openGraph: {
    title: "Gil Creative Co. — Design with a point of view",
    description: "Visual identities, campaigns, motion, video and websites by Gilbert Gospel Jacob.",
    url: "/",
    siteName: "Gil Creative Co.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Gil Creative Co. — Design with a point of view." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gil Creative Co. — Design with a point of view",
    description: "Visual identities, campaigns, motion, video and websites by Gilbert Gospel Jacob.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/brand/gil-creative-icon.png",
    apple: "/brand/gil-creative-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <a
          href="#main"
          className="fixed left-4 top-3 z-[60] -translate-y-24 bg-signal px-4 py-3 text-sm font-semibold text-signal-foreground transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="min-h-screen">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
