import { ServiceQueryParams } from "@/lib/types/service";
import LocationFilter from "./LocationFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import CategoryFilter from "./CategoryFilter";

export default async function FiltersComponent({
  params,
  slug,
}: {
  params: ServiceQueryParams;
  slug: string;
}) {
  return (
    <div className="flex flex-col gap-8 w-1/6 border-b border-r border-black sticky top-32 py-8 self-start px-4">
      <LocationFilter params={params} category={slug} />
      <PriceRangeFilter params={params} slug={slug} />
      <CategoryFilter params={params} slug={slug} />
    </div>
  );
}
