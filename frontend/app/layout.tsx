import type { Metadata } from "next";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query";
import { Toaster } from "sonner";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title:
    "Digital Marmat |AC Service Near Me | AC Repair & Installation in Nepal",
  description:
    "Professional AC service near you. We also provide fridge, washing machine, mobile &amp; laptop repair in Kathmandu, Bhaktapur and Lalitpur . Fast service, expert technicians and affordable pricing.",
  keywords: ["repair", "home appliances", "marmat"],
  authors: [{ name: "Asim Poudel" }],
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
      <body
        className={`antialiased flex flex-col ${trenchSlab.variable} min-h-screen`}
      >
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-right" />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
