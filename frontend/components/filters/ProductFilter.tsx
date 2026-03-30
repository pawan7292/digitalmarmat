import { ServiceQueryParams } from "@/lib/types/service";
import LocationFilter from "./LocationFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import ProductBrandFilter from "./ProductBrandFilter";
import ProductWarrantyFilter from "./ProductWarrantyFilter";

export default async function ProductFilters({
  category,
  filters,
}: {
  category: string;
  filters: ServiceQueryParams;
}) {
  return (
    <div className="sticky self-start px-8 w-1/6 top-24 font-general-sans text-[15px] flex flex-col gap-8">
      <div>
        <ProductBrandFilter params={filters} category={category} />
      </div>
      <div>
        <ProductWarrantyFilter params={filters} category={category} />
      </div>
    </div>
  );
}
