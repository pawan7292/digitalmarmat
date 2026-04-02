import ExploreServices from "@/components/services/category/ExploreService";
import ServiceFilters from "@/components/filters/ServiceFilter";
import ServicePagination from "@/components/services/ServicePagination";
import { getServices } from "@/lib/fetches/service";
import { ServiceQueryParams, ServiceType } from "@/lib/types/service";
import Link from "next/link";

export default async function ServiceBySubCategory({
  params,
  searchParams,
}: {
  params: Promise<{ category: string; subcategory: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category, subcategory } = await params;

  const filters: ServiceQueryParams = await searchParams;

  const returnedServices = await getServices({
    subcategory: subcategory,
    sort: filters.sort ?? "most_booked",
    page: filters.page,
    location: filters.location,
    max_price: filters.max_price,
    min_price: filters.min_price,
  });

  const services: ServiceType[] = returnedServices?.data || [];
  const links = returnedServices?.meta?.links ?? [];
  return (
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
      <div className="flex flex-col px-4 sm:px-6 md:px-12 lg:px-24 gap-3 sm:gap-4 bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="h4 text-brand-raiden-800 text-lg sm:text-xl md:text-2xl">
          {services[0]?.sub_category?.name}
        </div>
        <div className="small flex text-xs sm:text-sm">
          <Link
            href={`/services/${category}`}
            className="text-blue-500 hover:underline"
          >
            {services[0]?.category?.name}
          </Link>
          {" > "} {services[0]?.sub_category?.name}
        </div>
      </div>
      {services.length === 0 ? (
        <>
          <div className="bodyheadingsmall text-center text-brand-ruby-500">
            No services found
          </div>
          <Link
            href={`/services/${category}/${subcategory}`}
            className="text-center body text-brand-raiden-500 hover:underline"
          >
            Go back {"<"}-
          </Link>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:flex-row lg:gap-8 lg:px-24">
            <ServiceFilters
              filters={filters}
              category={`services/${category}/${subcategory}`}
            />
            <div className="w-full min-w-0 flex-1">
              <ExploreServices
                services={services}
                category={`services/${category}/${subcategory}`}
                filters={filters}
              />
            </div>
          </div>

          <ServicePagination
            links={links || []}
            category={`services/${category}/${subcategory}`}
            filters={filters}
          />
        </>
      )}
    </div>
  );
}
