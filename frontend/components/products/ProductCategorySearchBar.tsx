"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ProductQueryParams } from "@/lib/types/product";
import ListPageSearchBar from "@/components/search/ListPageSearchBar";

interface ProductCategorySearchBarProps {
  category: string;
  currentFilters?: ProductQueryParams;
}

export default function ProductCategorySearchBar({
  category,
  currentFilters = {},
}: ProductCategorySearchBarProps) {
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

    if (currentFilters?.brand) {
      params.append("brand", String(currentFilters.brand));
    }
    if (currentFilters?.warranty) {
      params.append("warranty", String(currentFilters.warranty));
    }
    if (currentFilters?.page) {
      params.append("page", String(currentFilters.page));
    }

    const queryString = params.toString();
    router.push(`/${category}${queryString ? `?${queryString}` : ""}`);
  };

  const clearSearch = () => {
    setSearchQuery("");
    const params = new URLSearchParams();

    if (currentFilters?.brand) {
      params.append("brand", String(currentFilters.brand));
    }
    if (currentFilters?.warranty) {
      params.append("warranty", String(currentFilters.warranty));
    }
    if (currentFilters?.page) {
      params.append("page", String(currentFilters.page));
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
      placeholder="Search products..."
    />
  );
}
