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
      <div className="flex border-b border-black justify-between px-12 py-4 sticky top-12 z-6 bg-white items-center">
        <div className="font-semibold">Filters</div>
        <ServiceSort params={filters} slug="all-services" />
      </div>
      <div className="flex w-full">
        <FiltersComponent params={filters} slug={"all-services"} />
        <ServicesResult services={services} />
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
