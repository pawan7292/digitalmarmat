"use client";
import FaqPage from "@/components/homepage/FaqPage";
import MostPreferedServices from "@/components/homepage/MostPreferedServices";
import MostViewedServices from "@/components/homepage/MostViewedServices";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (!search.trim()) return;
    router.push(`/services?name=${encodeURIComponent(search)}`);
  };

  const quickTags = ["AC Service", "Plumbing", "Electrician", "TV Mounting", "Painting", "Carpentry"];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* HERO */}
      <section
        className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/multitools.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Pure dark neutral overlay — no blue tint, lets image stay natural */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/75" />
        {/* Red accent stripe at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ed1e24] via-white/30 to-[#ed1e24]" />

        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto flex flex-col items-center">
          {/* Badge — white/neutral so it reads clearly against any image tone */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ed1e24] animate-pulse" />
            Nepal&apos;s #1 Home Services Platform
          </div>

          {/* Title — white body, red accent word for max contrast */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-3">
            Expert Help,{" "}
            <span className="text-[#ed1e24]">Right at Your Door</span>
          </h1>

          <p className="text-white/60 text-base md:text-lg mb-8 leading-relaxed">
            AC installation, plumbing, electrician, TV mounting &amp; more —{" "}
            trusted professionals across Nepal
          </p>

          {/* Search bar — blue lives only here on white bg, unmissable */}
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

          {/* Quick tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {quickTags.map((tag) => (
              <button
                key={tag}
                onClick={() => router.push(`/services?name=${encodeURIComponent(tag)}`)}
                className="text-xs text-white/55 border border-white/15 bg-white/5 hover:bg-white/15 hover:text-white hover:border-white/30 px-3 py-1 rounded-full transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      <MostPreferedServices />
      <MostViewedServices />
      <FaqPage />
    </div>
  );
}