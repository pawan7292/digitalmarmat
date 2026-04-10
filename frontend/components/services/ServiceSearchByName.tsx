"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js App Router
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function ServiceSearchByName({ name }: { name?: string }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    // push the typed query into URL
    router.push(`/services?name=${encodeURIComponent(query)}`);
  };

  return (
    <div className="text-xl font-bold w-1/2 flex gap-4 flex-col">
      <div className="flex gap-2 items-center">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you looking for?"
          className="bg-white border-white py-6"
        />
        <Button variant="secondary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      {name ? `Search results for "${name}"` : null}
    </div>
  );
}
