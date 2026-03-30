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
    <div className="flex flex-col gap-12 mb-12">
      <div className="flex flex-col px-24 gap-4 bg-gray-100 py-12">
        <div className="h4 text-brand-raiden-800">
          {services[0]?.sub_category?.name}
        </div>
        <div className="small flex">
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
            href={`/services/${category}`}
            className="text-center body text-brand-raiden-500 hover:underline"
          >
            Go back {"<"}-
          </Link>
        </>
      ) : (
        <>
          <div className="flex">
            <ServiceFilters
              filters={filters}
              category={`services/${category}/${subcategory}`}
            />
            <div className="w-5/6">
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
