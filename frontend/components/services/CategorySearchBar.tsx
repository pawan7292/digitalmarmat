"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ServiceQueryParams } from "@/lib/types/service";
import ListPageSearchBar from "@/components/search/ListPageSearchBar";

interface CategorySearchBarProps {
  category: string;
  currentFilters?: ServiceQueryParams;
}

export default function CategorySearchBar({
  category,
  currentFilters = {},
}: CategorySearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(
    (currentFilters?.name as string) || "",
  );
  const router = useRouter();

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    const q = searchQuery.trim();

    const params = new URLSearchParams();

    if (q) {
      params.append("name", q);
    }

    if (currentFilters?.sort && currentFilters.sort !== "most_booked") {
      params.append("sort", String(currentFilters.sort));
    }
    if (currentFilters?.page) {
      params.append("page", String(currentFilters.page));
    }
    if (currentFilters?.location) {
      params.append("location", String(currentFilters.location));
    }
    if (currentFilters?.min_price) {
      params.append("min_price", String(currentFilters.min_price));
    }
    if (currentFilters?.max_price) {
      params.append("max_price", String(currentFilters.max_price));
    }

    const queryString = params.toString();
    router.push(`/${category}${queryString ? `?${queryString}` : ""}`);
  };

  const clearSearch = () => {
    setSearchQuery("");
    const params = new URLSearchParams();

    if (currentFilters?.sort && currentFilters.sort !== "most_booked") {
      params.append("sort", String(currentFilters.sort));
    }
    if (currentFilters?.page) {
      params.append("page", String(currentFilters.page));
    }
    if (currentFilters?.location) {
      params.append("location", String(currentFilters.location));
    }
    if (currentFilters?.min_price) {
      params.append("min_price", String(currentFilters.min_price));
    }
    if (currentFilters?.max_price) {
      params.append("max_price", String(currentFilters.max_price));
    }

    const queryString = params.toString();
    router.push(`/${category}${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <ListPageSearchBar
      value={searchQuery}
      onChange={setSearchQuery}
      onSubmit={submit}
      onClear={clearSearch}
      placeholder="Search services..."
    />
  );
}
