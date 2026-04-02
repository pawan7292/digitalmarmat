"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const words = [
  "Air Conditioner technician",
  "Fridge technician",
  "CCTV technician",
  "Plumber",
  "Electrician",
];

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholder, setPlaceholder] = useState(words[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const router = useRouter();

  // Typing animation effect
  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setPlaceholder(currentWord.substring(0, placeholder.length + 1));
          if (placeholder === currentWord)
            setTimeout(() => setIsDeleting(true), 800);
        } else {
          setPlaceholder(currentWord.substring(0, placeholder.length - 1));
          if (placeholder === "") {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 50 : 100,
    );

    return () => clearTimeout(timeout);
  }, [placeholder, isDeleting, wordIndex]);

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/search?name=${encodeURIComponent(q)}`);
  };

  return (
    <div className="flex w-full max-w-lg mx-auto">
      <form
        onSubmit={submit}
        className="flex w-full items-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 shadow-sm sm:p-3"
      >
        <FaSearch className="text-gray-400 shrink-0 text-sm" aria-hidden />
        <input
          type="search"
          name="q"
          placeholder={`Find "${placeholder}"...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-0 outline-none text-sm placeholder:text-gray-400"
          enterKeyHint="search"
        />
        <button
          type="submit"
          className="shrink-0 rounded-md bg-brand-raiden-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-raiden-600"
        >
          Go
        </button>
      </form>
    </div>
  );
}
