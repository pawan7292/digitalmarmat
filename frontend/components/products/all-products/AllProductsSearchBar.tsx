"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { ProductQueryParams } from "@/lib/types/product";

interface AllProductsSearchBarProps {
  currentFilters?: ProductQueryParams;
}

export default function AllProductsSearchBar({
  currentFilters = {},
}: AllProductsSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(
    (currentFilters?.name as string) || ""
  );
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    const q = searchQuery.trim();

    // Build search params
    const params = new URLSearchParams();

    // Add search query if present
    if (q) {
      params.append("name", q);
    }

    // Preserve other filters
    if (currentFilters?.page) {
      params.append("page", String(currentFilters.page));
    }
    if (currentFilters?.category) {
      params.append("category", currentFilters.category);
    }
    if (currentFilters?.brand) {
      params.append("brand", currentFilters.brand);
    }
    if (currentFilters?.warranty) {
      params.append("warranty", currentFilters.warranty);
    }

    const queryString = params.toString();
    router.push(`/all-products${queryString ? `?${queryString}` : ""}`);
    setIsMobileOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    // Build search params without name
    const params = new URLSearchParams();

    if (currentFilters?.page) {
      params.append("page", String(currentFilters.page));
    }
    if (currentFilters?.category) {
      params.append("category", currentFilters.category);
    }
    if (currentFilters?.brand) {
      params.append("brand", currentFilters.brand);
    }
    if (currentFilters?.warranty) {
      params.append("warranty", currentFilters.warranty);
    }

    const queryString = params.toString();
    router.push(`/all-products${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <>
      {/* Desktop view */}
      <div className="hidden sm:block">
        <form
          onSubmit={submit}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-2.5 shadow-sm hover:shadow-md transition md:p-3"
        >
          <FaSearch className="text-gray-400 shrink-0 text-sm" aria-hidden />
          <input
            type="search"
            name="q"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 min-w-0 outline-none text-sm placeholder:text-gray-400 bg-transparent"
            enterKeyHint="search"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-700"
              title="Clear search"
            >
              <FaTimes size={14} />
            </button>
          )}
          <button
            type="submit"
            className="shrink-0 rounded-md bg-brand-raiden-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-raiden-600 transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Mobile view */}
      <div className="sm:hidden">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition"
          title="Search products"
        >
          <FaSearch className="text-gray-600 text-base" />
        </button>

        {isMobileOpen && (
          <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-300 shadow-lg rounded-b-lg p-3 mt-1">
            <form onSubmit={submit} className="flex flex-col gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-2.5">
                <FaSearch className="text-gray-400 shrink-0 text-sm" />
                <input
                  type="search"
                  name="q"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 min-w-0 outline-none text-sm placeholder:text-gray-400 bg-transparent"
                  autoFocus
                  enterKeyHint="search"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="p-1 hover:bg-gray-100 rounded text-gray-500"
                    title="Clear search"
                  >
                    <FaTimes size={14} />
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 rounded-md bg-brand-raiden-500 px-3 py-2 text-sm font-medium text-white hover:bg-brand-raiden-600 transition"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
