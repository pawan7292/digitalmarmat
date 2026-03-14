import { ServiceQueryParams } from "@/lib/types/service";
import CategoryFilter from "./CategoryFilter";
import LocationFilter from "./LocationFilter";
import PriceRangeFilter from "./PriceRangeFilter";

export default function ServiceFilter({
  params,
}: {
  params: ServiceQueryParams;
}) {
  return (
    <div className="sticky top-24">
      <div className="font-semibold text-lg">Filters</div>
      <CategoryFilter params={params} />
      <LocationFilter params={params} />
      {/* <PriceRangeFilter
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      /> */}
    </div>
  );
}
