import { getPriceRange } from "@/lib/fetches/filters";
import PriceSlider from "./PriceSlider";
import { ServiceQueryParams } from "@/lib/types/service";
import Link from "next/link";

export default async function PriceRangeFilter({
  params,
  slug,
}: {
  params: ServiceQueryParams;
  slug: string;
}) {
  const returnedPriceRange = await getPriceRange();
  const maxPrice = returnedPriceRange?.max_price || 5000;
  const minPrice = returnedPriceRange?.min_price || 0;
  const resetPrice = { ...params };
  delete resetPrice.min_price;
  delete resetPrice.max_price;
  const resetPriceQuery = new URLSearchParams(resetPrice as any).toString();

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold">Price Range</div>
      <PriceSlider minPrice={minPrice} maxPrice={maxPrice} />
      <Link
        href={`/${slug}?${resetPriceQuery}`}
        className="text-[15px] text-brand-raiden-500 hover:underline hover:cursor-pointer"
      >
        Reset Price
      </Link>
    </div>
  );
}
