import ExploreServices from "@/components/services/category/ExploreService";
import SubCategoryList from "@/components/services/category/SubCategoryList";
import ServicePagination from "@/components/services/ServicePagination";
import { getSubCategories } from "@/lib/fetches/category";
import { getServices } from "@/lib/fetches/service";
import { ServiceQueryParams } from "@/lib/types/service";

export default async function ServiceBySubCategory({
  params,
  searchParams,
}: {
  params: Promise<{ subcategory: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { subcategory } = await params;

  const filters: ServiceQueryParams = await searchParams;

  const returnedServices = await getServices({
    subcategory: subcategory,
    sort: filters.sort ?? "most_booked",
    page: filters.page,
  });

  const services = returnedServices?.data || [];
  const links = returnedServices?.meta?.links ?? [];
  return (
    <div className="flex flex-col gap-12 mb-12">
      <ExploreServices
        services={services}
        category={subcategory}
        filters={filters}
      />
      <ServicePagination
        links={links || []}
        category={subcategory}
        filters={filters}
      />
    </div>
  );
}
