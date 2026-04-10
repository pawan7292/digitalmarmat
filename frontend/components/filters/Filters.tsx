import { ServiceQueryParams } from "@/lib/types/service";
import LocationFilter from "./LocationFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import CategoryFilter from "./CategoryFilter";
import Link from "next/link";

function allServicesFilterFields(params: ServiceQueryParams, slug: string) {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <LocationFilter params={params} category={slug} />
      <PriceRangeFilter params={params} slug={slug} />
      <CategoryFilter params={params} slug={slug} />
    </div>
  );
}

export default async function FiltersComponent({
  params,
  slug,
}: {
  params: ServiceQueryParams;
  slug: string;
}) {
  const allServicesLink = (
    <Link
      href="/services"
      className="block text-blue-600 hover:text-blue-800 hover:underline font-medium text-sm sm:text-base mb-4 md:mb-6"
    >
      All Service Categories
    </Link>
  );

  return (
    <>
      {/* Mobile Filters Accordion */}
      <details className="group rounded-xl border border-gray-200 bg-white shadow-sm lg:hidden">
        <summary className="cursor-pointer list-none px-4 py-3 font-semibold text-brand-raiden-600 [&::-webkit-details-marker]:hidden flex items-center justify-between gap-2">
          <span>Filters</span>
          <span className="text-xs font-normal text-gray-500 group-open:rotate-180 transition-transform">
            ▼
          </span>
        </summary>
        <div className="border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          {/* Link above filters */}
          {allServicesLink}
          {allServicesFilterFields(params, slug)}
        </div>
      </details>

      {/* Desktop Sidebar Filters */}
      <aside className="hidden w-56 shrink-0 flex-col gap-2 border-r border-gray-200 py-4 md:py-8 lg:flex lg:sticky lg:top-28 lg:self-start lg:px-4">
        {/* Link above filters */}
        {allServicesLink}
        {allServicesFilterFields(params, slug)}
      </aside>
    </>
  );
}
