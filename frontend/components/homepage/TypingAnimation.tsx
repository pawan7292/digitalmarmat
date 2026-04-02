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
    <div className="h4 font-semibold flex flex-col">
      <div className="text-[clamp(1.125rem,2.5vw+0.5rem,1.67rem)] font-light">
        Nepal's leading
      </div>
      <div className="h3">Digital Platform </div>
      <div className="">
        For Expert{" "}
        <span className="text-brand-raiden-800">
          {text}
          <span className="animate-pulse">|</span>
        </span>
      </div>
      <div>Services</div>
    </div>
  );
}
