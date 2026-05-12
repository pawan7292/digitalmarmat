"use client";

import { useEffect, useState } from "react";

const words = ["Home &", "Business"];

export default function TypingServices() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.substring(0, text.length + 1));

          if (text === currentWord) {
            setTimeout(() => setIsDeleting(true), 1200);
          }
        } else {
          setText(currentWord.substring(0, text.length - 1));

          if (text === "") {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 40 : 80,
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index]);

  return (
    <div className="flex flex-col font-semibold leading-tight tracking-tight">
      <div className="text-2xl font-light text-gray-600 sm:text-3xl lg:text-4xl">
        Nepal's leading
      </div>

      {/* mobile: "Digital platform for" */}
      <div className="text-4xl font-bold text-brand-raiden-500 sm:text-5xl lg:text-7xl">
        Digital Platform <span className="sm:hidden">for</span>
      </div>

      {/* mobile: keep "Expert … services" on one line; desktop splits "Services" below */}
      <div className="text-3xl sm:text-4xl lg:text-6xl">
        <span className="hidden sm:inline">For </span>
        <span className="inline-flex max-w-full flex-nowrap items-baseline gap-x-1 sm:inline">
          <span className="shrink-0">Expert</span>
          <span className="inline-block min-w-[8ch] text-brand-raiden-800">
            {text}
            <span className="animate-pulse font-thin">|</span>
          </span>
          <span className="shrink-0 sm:hidden">services</span>
        </span>
      </div>

      <div className="hidden text-3xl sm:block sm:text-4xl lg:text-6xl">Services</div>
    </div>
  );
}
