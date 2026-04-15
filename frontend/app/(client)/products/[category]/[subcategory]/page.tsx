import ServicePagination from "@/components/services/ServicePagination";
import Link from "next/link";
import { getProducts } from "@/lib/fetches/product";
import { ProductQueryParams, ProductType } from "@/lib/types/product";
import ExploreProducts from "@/components/products/ExploreProducts";
import ProductFilters from "@/components/filters/ProductFilter";
import ProductCategorySearchBar from "@/components/products/ProductCategorySearchBar";
import { Metadata, ResolvingMetadata } from "next";
import { getSubCategories } from "@/lib/fetches/category";

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
  return (
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
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
      
      <div className="px-4 sm:px-6 md:px-12 lg:px-24">
        <ProductCategorySearchBar 
          category={`products/${category}/${subcategory}`}
          currentFilters={filters}
        />
      </div>

      {products.length === 0 ? (
        <>
          <div className="bodyheadingsmall text-center text-brand-ruby-500">
            No products found
          </div>
          <Link
            href={`/products/${category}/${subcategory}`}
            className="text-center body text-brand-raiden-500 hover:underline"
          >
            Go back {"<"}-
          </Link>
        </>
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
