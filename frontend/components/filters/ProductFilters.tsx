import { ProductQueryParams } from "@/lib/types/product";
import ProductBrandFilter from "./ProductBrandFilter";
import ProductWarrantyFilter from "./ProductWarrantyFilter";
import ProductCategoryFilter from "./ProductCategoryFilter";

function allProductsFilterFields(params: ProductQueryParams, slug: string) {
  return (
    <div className="flex flex-col gap-6 font-general-sans text-sm sm:text-base">
      <ProductCategoryFilter params={params} slug={slug} />
      <ProductBrandFilter params={params} category={slug} />
      <ProductWarrantyFilter params={params} category={slug} />
    </div>
  );
}

export default async function ProductFilterComponent({
  params,
  slug,
}: {
  params: ProductQueryParams;
  slug: string;
}) {
  return (
    <>
      <details className="group mb-4 rounded-xl border border-gray-200 bg-white shadow-sm lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 font-semibold text-brand-raiden-600 [&::-webkit-details-marker]:hidden">
          <span>Filters</span>
          <span className="text-xs font-normal text-gray-500 transition-transform group-open:rotate-180">
            ▼
          </span>
        </summary>
        <div className="border-t border-gray-100 px-4 py-4">
          {allProductsFilterFields(params, slug)}
        </div>
      </details>

      <aside className="hidden w-full shrink-0 flex-col gap-6 self-start border-r border-gray-200 pr-4 lg:flex lg:w-56 lg:sticky lg:top-28">
        {allProductsFilterFields(params, slug)}
      </aside>
    </>
  );
}
