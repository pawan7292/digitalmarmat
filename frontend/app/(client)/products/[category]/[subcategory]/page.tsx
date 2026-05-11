import ServicePagination from "@/components/services/ServicePagination";
import Link from "next/link";
import { getProducts } from "@/lib/fetches/product";
import { ProductQueryParams, ProductType } from "@/lib/types/product";
import ExploreProducts from "@/components/products/ExploreProducts";
import ProductFilters from "@/components/filters/ProductFilter";
import ProductEmptyState from "@/components/products/ProductEmptyState";
import ProductCategorySearchBar from "@/components/products/ProductCategorySearchBar";
import { Metadata, ResolvingMetadata } from "next";
import { getSubCategories } from "@/lib/fetches/category";

export const revalidate = 3600;

type Props = {
  params: Promise<{ subcategory: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { subcategory } = await params;
  const returnedSubCategories = await getSubCategories(subcategory);
  console.log(returnedSubCategories)
  return {
    title:
      returnedSubCategories?.categories_details?.seo_title ||
      "Product SubCategories",
    description:
      returnedSubCategories?.categories_details?.seo_description ||
      "Product SubCategory Description",
    keywords: returnedSubCategories?.categories_details?.seo_tags
      ?.split(",")
      .map((tag: string) => tag.trim()) || ["digital marmat"],
  };
}

export default async function ProductBySubCategory({
  params,
  searchParams,
}: {
  params: Promise<{ category: string; subcategory: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category, subcategory } = await params;

  const filters: ProductQueryParams = await searchParams;

  const returnedProducts = await getProducts({
    subcategory: subcategory,
    name: filters.name,
    brand: filters.brand,
    warranty: filters.warranty,
  });

  const products: ProductType[] = returnedProducts?.data || [];
  const links = returnedProducts?.meta?.links ?? [];
  
  // Check if any filters are applied
  const hasFiltersApplied = !!(filters.name || filters.brand || filters.warranty);
  
  // Get subcategory details for header when no products exist
  const subcategoryDetails = products.length === 0 
    ? await getSubCategories(subcategory)
    : null;
  return (
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
      {products.length > 0 && (
        <div className="flex flex-col px-4 sm:px-6 md:px-12 lg:px-24 gap-3 sm:gap-4 bg-gray-100 py-4 sm:py-6 md:py-8 lg:py-12">
          <div className="h4 text-brand-raiden-800 text-lg sm:text-xl md:text-2xl">
            {products[0]?.sub_category?.name}
          </div>
          <div className="small flex text-xs sm:text-sm">
            <Link
              href={`/products/${category}`}
              className="text-blue-500 hover:underline"
            >
              {products[0]?.category?.name}
            </Link>
            {" > "} {products[0]?.sub_category?.name}
          </div>
        </div>
      )}
      
      <div className="px-4 sm:px-6 md:px-12 lg:px-24">
        <ProductCategorySearchBar 
          category={`products/${category}/${subcategory}`}
          currentFilters={filters}
        />
      </div>

      {products.length === 0 ? (
        <ProductEmptyState
          category={category}
          subcategory={subcategory}
          hasFiltersApplied={hasFiltersApplied}
        />
      ) : (
        <>
          <div className="flex flex-col gap-4 px-4 sm:px-6 md:px-12 lg:flex-row lg:gap-8 lg:px-24">
            <ProductFilters
              filters={filters}
              category={`products/${category}/${subcategory}`}
            />
            <div className="w-full min-w-0 flex-1">
              <ExploreProducts products={products} />
            </div>
          </div>

          <ServicePagination
            links={links || []}
            category={`products/${category}/${subcategory}`}
            filters={filters}
          />
        </>
      )}
    </div>
  );
}
