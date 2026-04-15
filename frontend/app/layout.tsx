import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/lib/providers";
import localFont from "next/font/local";

const schemaData = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: "Digital Marmat Pvt. Ltd.",
  url: "https://digitalmarmat.vercel.app",
  logo: "https://digitalmarmat.vercel.app/icon.svg",
  image: "https://digitalmarmat.vercel.app/acoffer.jpg",
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
    { "@type": "City", name: "Kathmandu" },
    { "@type": "City", name: "Lalitpur" },
    { "@type": "City", name: "Bhaktapur" },
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
  openGraph: {
    title: "Digital Marmat | AC Service Near Me",
    description: "Professional AC service near you...",
    url: "https://digitalmarmat.vercel.app",
    siteName: "Digital Marmat",
    images: [
      {
        url: "https://digitalmarmat.vercel.app/acoffer.jpg",
        width: 1200,
        height: 630,
        alt: "AC Service Offer",
      },
    ],
    type: "website",
  },

  icons: {
    icon: "https://digitalmarmat.vercel.app/icon.svg",
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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
