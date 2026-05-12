"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import SearchInput from "./TypeWriterSearchPlaceholder";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/search?name=${encodeURIComponent(query)}`);
  };

  return (
    <div className="relative w-full max-w-2xl md:max-w-[min(40vw,36rem)]">
      <SearchInput value={query} onChange={setQuery} onEnter={handleSearch} />
      <button
        type="button"
        onClick={handleSearch}
        className="body absolute right-2 top-4 bottom-2 flex items-center gap-2 rounded-lg bg-brand-raiden-500 px-5 font-medium text-white transition hover:cursor-pointer hover:bg-brand-raiden-600 active:bg-brand-raiden-700 active:brightness-95"
      >
        <CiSearch size={24} /> Search
      </button>
    </div>
  );
}
