import ProductFilters from "@/components/filters/ProductFilter";
import ExploreProducts from "@/components/products/ExploreProducts";
import SubCategoryList from "@/components/services/category/SubCategoryList";
import ServicePagination from "@/components/services/ServicePagination";
import { getSubCategories } from "@/lib/fetches/category";
import { getProducts } from "@/lib/fetches/product";
import { GetCategoryType } from "@/lib/types/category";
import { ProductQueryParams, ProductType } from "@/lib/types/product";
import Link from "next/link";

export default async function ProductCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<ProductQueryParams>;
}) {
  const { category } = await params;
  const filters = await searchParams;

  const returnedSubCategory = await getSubCategories(category);

  const subCategories: GetCategoryType[] =
    returnedSubCategory?.sub_categories || [];

  const returnedProducts = await getProducts({
    category: category,
    brand: filters.brand,
    warranty: filters.warranty,
  });
  const products: ProductType[] = returnedProducts?.data || [];
  const categoryName = products[0]?.category.name ?? "";
  const links = returnedProducts?.meta?.links ?? [];

  return (
    <div className="flex flex-col gap-24 mb-12">
      <SubCategoryList
        categoryName={categoryName}
        category={`products/${category}`}
        subCategories={subCategories}
      />
      {products.length === 0 ? (
        <>
          <div className="bodyheadingsmall text-center text-brand-ruby-500">
            No services found
          </div>
          <Link
            href={`/products/${category}`}
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
              category={`products/${category}`}
            />
            <div className="w-5/6">
              <ExploreProducts products={products} />
            </div>
          </div>

          <ServicePagination
            links={links || []}
            category={`products/${category}`}
            filters={filters}
          />
        </>
      )}
    </div>
  );
}
