"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchService() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (!search.trim()) return;
    router.push(`/services?name=${encodeURIComponent(search)}`);
  };
  const quickTags = [
    "AC install",
    "Leak",
    "Light fix",
    "Wall Mount",
    "Data Recovery",
    "Clean",
  ];
  return (
    <div>
      <div className="flex w-full max-w-xl rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20 focus-within:ring-2 focus-within:ring-[#1d58a9] transition-all duration-200">
        <input
          className="flex-1 bg-white text-gray-800 placeholder-gray-400 px-5 py-4 text-sm outline-none"
          placeholder="Search — e.g. AC install, plumber..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="flex items-center gap-2 bg-[#1d58a9] hover:bg-[#165092] active:bg-[#0e3a6b] text-white px-6 font-semibold text-sm transition-colors whitespace-nowrap"
        >
          <Search size={15} />
          Search
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {quickTags.map((tag) => (
          <button
            key={tag}
            onClick={() =>
              router.push(`/services?name=${encodeURIComponent(tag)}`)
            }
            className="text-xs text-white/55 border border-white/15 bg-white/5 hover:bg-white/15 hover:text-white hover:border-white/30 px-3 py-1 rounded-full transition-all"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
