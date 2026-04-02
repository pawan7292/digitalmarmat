"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

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
          placeholder="Search services or products..."
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
