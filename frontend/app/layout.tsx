import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/lib/providers";
import localFont from "next/font/local";
import MetaPixel from "@/components/meta/MetaPixel";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // maximumScale: 1, // Optional: prevents auto-zoom on input focus in iOS
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: "Digital Marmat Pvt. Ltd.",
  url: `${process.env.NEXT_PUBLIC_APP_URL}`,
  logo: `${process.env.NEXT_PUBLIC_APP_URL}/icon.svg`,
  image: `${process.env.NEXT_PUBLIC_APP_URL}/acoffer.jpg`,
  description:
    "Kathmandu's leading service for AC repair, sales, and home appliance maintenance. Authorized dealer and expert service provider for Daikin, Midea, TCL, CG, Samsung, and more.",
  telephone: "+977-9802362210",
  priceRange: "रू 300 - रू 5000",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "124",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Machhapokhari",
    addressLocality: "Kathmandu",
    addressRegion: "Bagmati",
    postalCode: "44600",
    addressCountry: "NP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "27.7324",
    longitude: "85.3015",
  },
  brand: [
    { "@type": "Brand", name: "Daikin" },
    { "@type": "Brand", name: "Midea" },
    { "@type": "Brand", name: "TCL" },
    { "@type": "Brand", name: "CG" },
    { "@type": "Brand", name: "Yasuda" },
    { "@type": "Brand", name: "Gree" },
    { "@type": "Brand", name: "Samsung" },
    { "@type": "Brand", name: "LG" },
    { "@type": "Brand", name: "Baltra" },
  ],
  areaServed: [
    { "@city": "City", name: "Kathmandu" },
    { "@city": "City", name: "Lalitpur" },
    { "@city": "City", name: "Bhaktapur" },
  ],
  sameAs: [
    "https://www.facebook.com/digitalmarmat",
    "https://x.com/digitalmarmat",
    "https://www.instagram.com/digitalmarmat_official",
    "https://www.youtube.com/@DigitalMarmat-DM",
    "https://www.linkedin.com/in/digital-marmat-967623379",
    "https://www.pinterest.com/ddigitalmarmat/",
  ],
};

export const metadata: Metadata = {
  title: "Digital Marmat | AC Service Near Me",
  description: "Professional AC service near you...",
  // Added Facebook Domain Verification here
  verification: {
    other: {
      "facebook-domain-verification": ["b5f1xhru08sjotwb5a2h6umdml5uhd"],
    },
  },
  openGraph: {
    title: "Digital Marmat | AC Service Near Me",
    description: "Professional AC service near you...",
    url: `${process.env.NEXT_PUBLIC_APP_URL}`, // Fixed the missing backticks here
    siteName: "Digital Marmat",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/acoffer.jpg`,
        width: 1200,
        height: 630,
        alt: "AC Service Offer",
      },
    ],
    type: "website",
  },

  icons: {
    icon: `${process.env.NEXT_PUBLIC_APP_URL}/icon.svg`,
  },
};

const trenchSlab = localFont({
  src: "../public/fonts/TrenchSlab-Variable.ttf",
  variable: "--font-trenchslab",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body
        className={`antialiased flex flex-col ${trenchSlab.variable} min-h-screen`}
      >
        <MetaPixel />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
