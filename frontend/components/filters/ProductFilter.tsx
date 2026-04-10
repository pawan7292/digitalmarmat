import { ProductQueryParams } from "@/lib/types/product";
import ProductBrandFilter from "./ProductBrandFilter";
import ProductWarrantyFilter from "./ProductWarrantyFilter";

function productFilterFields(filters: ProductQueryParams, category: string) {
  return (
    <div className="flex px-12 flex-col gap-6 font-general-sans text-sm sm:text-base">
      <ProductBrandFilter params={filters} category={category} />
      <ProductWarrantyFilter params={filters} category={category} />
    </div>
  );
}

export default async function ProductFilters({
  category,
  filters,
}: {
  category: string;
  filters: ProductQueryParams;
}) {
  return (
    <>
      <details className="group mb-4 rounded-xl border border-gray-200 bg-white shadow-sm lg:hidden">
        <summary className="cursor-pointer list-none px-4 py-3 font-semibold text-brand-raiden-600 [&::-webkit-details-marker]:hidden flex items-center justify-between gap-2">
          <span>Filters</span>
          <span className="text-xs font-normal text-gray-500 group-open:rotate-180 transition-transform">
            ▼
          </span>
        </summary>
        <div className="border-t border-gray-100 px-4 py-4">
          {productFilterFields(filters, category)}
        </div>
      </details>

      <aside className="hidden w-full shrink-0 flex-col gap-6 self-start border-r border-gray-100 pr-4 lg:flex lg:w-56 lg:sticky lg:top-24">
        {productFilterFields(filters, category)}
      </aside>
    </>
  );
}
