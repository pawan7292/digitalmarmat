"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

/**
 * When the booking card has scrolled off-screen (e.g. user is reading the description),
 * show a thumb-friendly bar to jump back to date selection and Book Now.
 */
export default function ServiceBookingMobileBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = document.getElementById("service-booking");
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShow(!entry.isIntersecting);
      },
      { threshold: 0.08, rootMargin: "0px 0px -8px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToBooking = () => {
    document.getElementById("service-booking")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-background/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm lg:hidden"
      role="region"
      aria-label="Quick book"
    >
      <Button
        type="button"
        className="w-full touch-manipulation"
        size="lg"
        onClick={scrollToBooking}
      >
        Book this service
      </Button>
    </div>
  );
}
