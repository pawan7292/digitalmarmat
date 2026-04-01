"use client";

import { useEffect, useState } from "react";

const services = [
  "Air Conditioner technician",
  "Fridge technician",
  "CCTV technician",
  "Plumber",
  "Electrician",
];

export default function SearchInput() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = services[index];

    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(word.substring(0, text.length + 1));

        if (text === word) {
          setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        setText(word.substring(0, text.length - 1));

        if (text === "") {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % services.length);
        }
      }
    }, deleting ? 40 : 70);

    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return (
    <input
      className="w-full px-4 font-medium py-4 body pr-28 rounded-xl border-2 border-brand-raiden-500 bg-white outline-none"
      placeholder={`Find "${text}"`}
    />
  );
}