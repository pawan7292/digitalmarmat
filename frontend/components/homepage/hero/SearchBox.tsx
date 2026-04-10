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
      <button className="flex gap-2 items-center hover:cursor-pointer hover:bg-brand-raiden-600 body absolute right-2 top-4 bottom-2 px-5 rounded-lg bg-brand-raiden-500 text-white font-medium hover:bg-bloody-ruby-500 transition">
        <CiSearch size={24} /> Search
      </button>
    </div>
  );
}
