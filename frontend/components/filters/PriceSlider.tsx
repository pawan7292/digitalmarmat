"use client";

import { Slider } from "@/components/ui/slider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PriceSlider({
  minPrice,
  maxPrice,
}: {
  minPrice: number;
  maxPrice: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  function handleSliderCommit(value: number[]) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("min_price", value[0].toString());
    params.set("max_price", value[1].toString());

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-1">
      {priceRange[0]} - {priceRange[1]}
      <Slider
        value={priceRange}
        onValueChange={setPriceRange}
        onValueCommit={handleSliderCommit}
        min={minPrice}
        max={maxPrice}
        step={20}
      />
    </div>
  );
}
