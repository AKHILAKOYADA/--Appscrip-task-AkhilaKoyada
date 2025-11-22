import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./style.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mettā muse | Discover Handcrafted Products | Sustainable Fashion & Home Decor",
  description: "Discover our curated collection of handcrafted products including sustainable fashion, accessories, and home decor. Free shipping on orders above ₹5000. Easy returns and COD available.",
  keywords: "handcrafted products, sustainable fashion, eco-friendly accessories, home decor, artisan products, mettā muse",
  authors: [{ name: "mettā muse" }],
  openGraph: {
    title: "mettā muse | Discover Handcrafted Products",
    description: "Discover our curated collection of handcrafted products including sustainable fashion, accessories, and home decor.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "mettā muse | Discover Handcrafted Products",
    description: "Discover our curated collection of handcrafted products including sustainable fashion, accessories, and home decor.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "mettā muse",
    description: "Handcrafted sustainable fashion, accessories, and home decor products",
    url: "https://mettamuse.com",
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          id="store-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {children}
      </body>
    </html>
  );
}
