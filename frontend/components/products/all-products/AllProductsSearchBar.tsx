"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ProductQueryParams } from "@/lib/types/product";
import ListPageSearchBar from "@/components/search/ListPageSearchBar";

interface AllProductsSearchBarProps {
  currentFilters?: ProductQueryParams;
}

export default function AllProductsSearchBar({
  currentFilters = {},
}: AllProductsSearchBarProps) {
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

    if (currentFilters?.page) {
      params.append("page", String(currentFilters.page));
    }
    if (currentFilters?.category) {
      params.append("category", String(currentFilters.category));
    }
    if (currentFilters?.brand) {
      params.append("brand", String(currentFilters.brand));
    }
    if (currentFilters?.warranty) {
      params.append("warranty", String(currentFilters.warranty));
    }

    const queryString = params.toString();
    router.push(`/all-products${queryString ? `?${queryString}` : ""}`);
  };

  const clearSearch = () => {
    setSearchQuery("");
    const params = new URLSearchParams();

    if (currentFilters?.page) {
      params.append("page", String(currentFilters.page));
    }
    if (currentFilters?.category) {
      params.append("category", String(currentFilters.category));
    }
    if (currentFilters?.brand) {
      params.append("brand", String(currentFilters.brand));
    }
    if (currentFilters?.warranty) {
      params.append("warranty", String(currentFilters.warranty));
    }

    const queryString = params.toString();
    router.push(`/all-products${queryString ? `?${queryString}` : ""}`);
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
