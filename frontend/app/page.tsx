"use client";
import MostPreferedServices from "@/components/homepage/MostPreferedServices";
import MostViewedServices from "@/components/homepage/MostViewedServices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

const heroImageUrl =
  "https://www.leatherman.com/cdn/shop/articles/blog-feature-image-multitools101_835db371-2f4b-426a-b042-4587e9da2a49_1200x.jpg?v=1754321175";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (!search.trim()) return;
    router.push(`/services?name=${encodeURIComponent(search)}`);
  };
  return (
    <div className="flex flex-col gap-4">
      <div
        className="w-full h-[70vh] bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <div className="flex gap-2 items-center">
          <Input
            id="input-demo-api-key"
            size={32}
            placeholder="What are you lookings for?"
            className="bg-white border-white py-6"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant={"secondary"} onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>
      <MostPreferedServices />
      <MostViewedServices />
    </div>
  );
}
