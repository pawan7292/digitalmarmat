import ServicePagination from "@/components/services/ServicePagination";
import Link from "next/link";
import { getProducts } from "@/lib/fetches/product";
import { ProductQueryParams, ProductType } from "@/lib/types/product";
import ExploreProducts from "@/components/products/ExploreProducts";
import ProductFilters from "@/components/filters/ProductFilter";

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
    brand: filters.brand,
    warranty: filters.warranty,
  });

  const products: ProductType[] = returnedProducts?.data || [];
  const links = returnedProducts?.meta?.links ?? [];
  return (
    <div className="flex flex-col gap-12 mb-12">
      <div className="flex flex-col px-24 gap-4 bg-gray-100 py-12">
        <div className="h4 text-brand-raiden-800">
          {products[0]?.sub_category?.name}
        </div>
        <div className="small flex">
          <Link
            href={`/products/${category}`}
            className="text-blue-500 hover:underline"
          >
            {products[0]?.category?.name}
          </Link>
          {" > "} {products[0]?.sub_category?.name}
        </div>
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
          <div className="flex">
            <ProductFilters
              filters={filters}
              category={`products/${category}/${subcategory}`}
            />
            <div className="w-5/6">
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
