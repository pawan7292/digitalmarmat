import FiltersComponent from "@/components/filters/Filters";
import ServicesResult from "@/components/services/all-services/ServicesResult";
import ServicePagination from "@/components/services/ServicePagination";
import ServiceSort from "@/components/services/ServiceSort";
import { getServices } from "@/lib/fetches/service";
import { ServiceQueryParams, ServiceType } from "@/lib/types/service";

export default async function AllServices({
  searchParams,
}: {
  searchParams: Promise<ServiceQueryParams>;
}) {
  const filters = await searchParams;
  const returnedServices = await getServices({
    sort: filters.sort ?? "most_viewed",
    name: filters.name,
    location: filters.location,
    page: filters.page,
    category: filters.category,
    min_price: filters.min_price,
    max_price: filters.max_price,
  });
  const links = returnedServices?.meta?.links || [];
  const services: ServiceType[] = returnedServices?.data || [];
  return (
    <div className="flex flex-col font-general-sans">
      <div className="flex border-b border-gray-200 justify-between gap-3 px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 sticky top-14 z-20 bg-white items-center">
        <div className="font-semibold text-sm sm:text-base">Search results</div>
        <ServiceSort params={filters} slug="all-services" />
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-0 px-4 sm:px-6 md:px-8 lg:px-12 pt-4 lg:pt-0">
        <FiltersComponent params={filters} slug={"/all-services"} />
        <div className="w-full min-w-0 flex-1">
          <ServicesResult services={services} />
        </div>
      </div>
      <div className="py-8">
        <ServicePagination
          filters={filters}
          category="all-services"
          links={links}
        />
      </div>
    </div>
  );
}
