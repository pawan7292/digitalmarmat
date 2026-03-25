import ExploreServices from "@/components/services/category/ExploreService";
import SubCategoryList from "@/components/services/category/SubCategoryList";
import ServicePagination from "@/components/services/ServicePagination";
import { getSubCategories } from "@/lib/fetches/category";
import { getServices } from "@/lib/fetches/service";
import { ServiceQueryParams } from "@/lib/types/service";

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
    page: filters.page
  });

  const services = returnedServices?.data || [];
  const categoryName = services[0].category.name ?? "";
  const returnedSubCategories = await getSubCategories(category);
  const subCategories = returnedSubCategories?.sub_categories || [];
  const links = returnedServices?.meta?.links ?? [];
  return (
    <div className="flex flex-col gap-12 mb-12">
      <SubCategoryList
        categoryName={categoryName}
        subCategories={subCategories}
        category={category}
      />
      <ExploreServices
        services={services}
        category={category}
        filters={filters}
      />
      <ServicePagination links={links || []} category={category} filters={filters} />
    </div>
  );
}
