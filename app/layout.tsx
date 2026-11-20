import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gil-creative-co-portfolio.noisymimosa.chatgpt.site'),
  title: {
    default: 'Gil Creative Co. — Independent Creative Practice',
    template: '%s',
  },
  description: 'Branding, campaigns, motion, video and digital design by Gilbert Gospel Jacob in Port Harcourt, Nigeria.',
  openGraph: {
    title: 'Gil Creative Co. — Independent Creative Practice',
    description: 'Branding, campaigns, motion, video and digital design by Gilbert Gospel Jacob in Port Harcourt, Nigeria.',
    url: '/',
    siteName: 'Gil Creative Co.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Gil Creative Co. — Design with a point of view.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gil Creative Co. — Independent Creative Practice',
    description: 'Branding, campaigns, motion, video and digital design by Gilbert Gospel Jacob in Port Harcourt, Nigeria.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
