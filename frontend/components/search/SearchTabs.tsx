"use client";

// app/search/_components/SearchTabs.tsx

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { SearchPageParams } from "@/lib/types/search";

interface SearchTabsProps {
  activeTab: "services" | "products";
  searchParams: SearchPageParams;
}

const TABS = [
  {
    key: "services" as const,
    label: "Services",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    key: "products" as const,
    label: "Products",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
];

export default function SearchTabs({ activeTab, searchParams }: SearchTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function handleTabChange(tab: "services" | "products") {
    if (tab === activeTab) return;

    // Build new query string — preserve ALL existing params, just swap tab and reset page
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && key !== "tab" && key !== "page") {
        params.set(key, value);
      }
    });

    params.set("tab", tab);
    // Reset to page 1 when switching tabs

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="sticky top-12 z-10 bg-white border-b border-gray-200">
      <div className="flex items-center gap-1 px-12 pt-3">
        {TABS.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              disabled={isPending}
              className={`
                flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-t-lg border-b-2 transition-all duration-200
                ${isActive
                  ? "border-black text-black bg-gray-50"
                  : "border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }
                ${isPending ? "opacity-60 cursor-wait" : "cursor-pointer"}
              `}
            >
              <span className={isActive ? "text-black" : "text-gray-400"}>
                {tab.icon}
              </span>
              {tab.label}
              {isPending && isActive && (
                <span className="ml-1 w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}