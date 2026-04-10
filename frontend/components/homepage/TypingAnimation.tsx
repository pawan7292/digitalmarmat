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
  <div className="font-semibold flex flex-col leading-tight tracking-tight">
    <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-600">
      Nepal's leading
    </div>

    {/* mobile: "Digital platform for" */}
    <div className="text-4xl sm:text-5xl lg:text-7xl font-bold text-brand-raiden-500">
      Digital Platform <span className="sm:hidden">for</span>
    </div>

    {/* mobile combined line */}
    <div className="text-3xl sm:text-4xl lg:text-6xl">
      <span className="hidden sm:inline">For </span>
      Expert{" "}
      <span className="text-brand-raiden-800 inline-block min-w-[4ch]">
        {text}
        <span className="animate-pulse font-thin">|</span>
      </span>{" "}
      <span className="sm:hidden">services</span>
    </div>

    {/* desktop only */}
    <div className="hidden sm:block text-3xl sm:text-4xl lg:text-6xl">
      Services
    </div>
  </div>
);
}
