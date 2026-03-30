import ExploreServices from "@/components/services/category/ExploreService";
import SubCategoryList from "@/components/services/category/SubCategoryList";
import ServiceFilters from "@/components/filters/ServiceFilter";
import ServicePagination from "@/components/services/ServicePagination";
import { getSubCategories } from "@/lib/fetches/category";
import { getServices } from "@/lib/fetches/service";
import { ServiceQueryParams } from "@/lib/types/service";
import Link from "next/link";

export default async function ServiceByCategory({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category } = await params;

  const filters: ServiceQueryParams = await searchParams;
  const returnedServices = await getServices({
    category: category,
    sort: filters.sort ?? "most_booked",
    page: filters.page,
    location: filters.location,
    max_price: filters.max_price,
    min_price: filters.min_price,
  });

  const services = returnedServices?.data || [];
  const categoryName = services[0]?.category.name ?? "";
  const returnedSubCategories = await getSubCategories(category);
  const subCategories = returnedSubCategories?.sub_categories || [];
  const links = returnedServices?.meta?.links ?? [];

  return (
    <div className="flex flex-col gap-12 mb-12">
      <SubCategoryList
        categoryName={categoryName}
        subCategories={subCategories}
        category={`services/${category}`}
      />
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
              category={`services/${category}`}
            />
            <div className="w-5/6">
              <ExploreServices
                services={services}
                category={`services/${category}`}
                filters={filters}
              />
            </div>
          </div>

          <ServicePagination
            links={links || []}
            category={`services/${category}`}
            filters={filters}
          />
        </>
      )}
    </div>
  );
}
