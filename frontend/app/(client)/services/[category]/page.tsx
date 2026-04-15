import ExploreServices from "@/components/services/category/ExploreService";
import SubCategoryList from "@/components/services/category/SubCategoryList";
import ServiceFilters from "@/components/filters/ServiceFilter";
import ServicePagination from "@/components/services/ServicePagination";
import CategorySearchBar from "@/components/services/CategorySearchBar";
import { getSubCategories } from "@/lib/fetches/category";
import { getServices } from "@/lib/fetches/service";
import { ServiceDetailsType, ServiceQueryParams } from "@/lib/types/service";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { category } = await params;
  const returnedSubCategories = await getSubCategories(category);
  return {
    title:
      returnedSubCategories?.categories_details?.seo_title ||
      "Service Categories",
    description:
      returnedSubCategories?.categories_details?.seo_description ||
      "Service Category Description",
    keywords: returnedSubCategories?.categories_details?.seo_tags
      ?.split(",")
      .map((tag: string) => tag.trim()) || ["digital marmat"],
  };
}

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
    name: filters.name,
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
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
      <SubCategoryList
        categoryName={categoryName}
        subCategories={subCategories}
        category={`services/${category}`}
      />
      
      <div className="px-4 sm:px-6 md:px-12 lg:px-24">
        <CategorySearchBar 
          category={`services/${category}`}
          currentFilters={filters}
        />
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
          <div className="flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:flex-row lg:gap-8 lg:px-24">
            <ServiceFilters
              filters={filters}
              category={`services/${category}`}
            />
            <div className="w-full min-w-0 flex-1 lg:max-w-none">
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
