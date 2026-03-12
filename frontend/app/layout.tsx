import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digital Marmat",
  description: "Fix your home appliances",
  keywords: ["repair", "home appliances", "marmat"],
  authors: [{ name: "Asim Poudel" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col`}
      >
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-right" />
          <div className="flex flex-col">{children}</div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
