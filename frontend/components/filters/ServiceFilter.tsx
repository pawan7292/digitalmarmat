import { ServiceQueryParams } from "@/lib/types/service";
import LocationFilter from "./LocationFilter";
import PriceRangeFilter from "./PriceRangeFilter";

export default async function ServiceFilters({
  category,
  filters,
}: {
  category: string;
  filters: ServiceQueryParams;
}) {
  return (
    <div className="sticky self-start px-8 w-1/6 top-24 font-general-sans text-[15px] flex flex-col gap-8">
      <div>
        <LocationFilter params={filters} category={category} />
      </div>
      <div>
        <PriceRangeFilter params={filters} slug={category} />
      </div>
    </div>
  );
}
