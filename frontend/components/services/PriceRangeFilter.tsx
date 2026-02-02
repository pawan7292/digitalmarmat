"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useGetPriceRange } from "@/hooks/usePriceRange";

export default function PriceRangeFilter({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: {
  minPrice: number | undefined;
  setMinPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
  maxPrice: number | undefined;
  setMaxPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
  const { data: priceData, isLoading } = useGetPriceRange();

  // Initialize slider value
  const [value, setValue] = useState<[number, number]>([0, 50000]);

  // When API price range loads, update both slider and parent state
  useEffect(() => {
    if (priceData?.min_price != null && priceData?.max_price != null) {
      setValue([priceData.min_price, priceData.max_price]);
      setMinPrice(priceData.min_price);
      setMaxPrice(priceData.max_price);
    }
  }, [priceData, setMinPrice, setMaxPrice]);

  // Update parent state when slider changes
  const handleSliderChange = (newValue: [number, number]) => {
    setValue(newValue);
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  const priceRange = priceData || { min_price: 0, max_price: 50000 };

  if (isLoading) {
    return <div>Loading price range...</div>;
  }

  return (
    <div className="mx-auto grid w-full max-w-xs gap-3">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor="slider-price-range">Price Range</Label>
        <span className="text-muted-foreground text-sm">
          {value[0].toLocaleString()} - {value[1].toLocaleString()}
        </span>
      </div>
      <Slider
        id="slider-price-range"
        value={value}
        onValueChange={handleSliderChange}
        min={priceRange.min_price}
        max={priceRange.max_price}
        step={1}
      />
    </div>
  );
}
