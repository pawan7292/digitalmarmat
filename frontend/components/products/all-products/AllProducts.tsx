import ProductFilterComponent from "@/components/filters/ProductFilters";
import ProductResult from "@/components/products/all-products/ProductResult";
import ServicePagination from "@/components/services/ServicePagination";
import ServiceSort from "@/components/services/ServiceSort";
import { getProducts } from "@/lib/fetches/product";
import { ProductQueryParams, ProductType } from "@/lib/types/product";

export default async function AllProducts({
  searchParams,
}: {
  searchParams: Promise<ProductQueryParams>;
}) {
  const filters = await searchParams;

  const returnedProducts = await getProducts({
    page: filters.page,
    name: filters.name,
    category: filters.category,
    brand: filters.brand,
    warranty: filters.warranty,
  });

  const links = returnedProducts?.meta?.links || [];
  const products: ProductType[] = returnedProducts?.data || [];

  return (
    <div className="flex min-w-0 flex-col font-general-sans">
      <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-4 py-3 sm:px-6 md:px-8 lg:px-12 sticky top-14 z-20 bg-white">
        <div className="text-sm font-semibold sm:text-base">All products</div>
        <ServiceSort params={filters as any} slug="all-products" />
      </div>
      <div className="flex w-full min-w-0 flex-col gap-4 px-4 py-4 sm:px-6 md:px-8 lg:flex-row lg:gap-0 lg:px-12">
        <ProductFilterComponent params={filters} slug="all-products" />
        <div className="min-w-0 flex-1 lg:pl-4">
          <ProductResult products={products} />
        </div>
      </div>
      <div className="px-4 pb-10 pt-4 sm:px-6 md:px-8 lg:px-12">
        <ServicePagination
          filters={filters as any}
          category="all-products"
          links={links}
        />
      </div>
    </div>
  );
}
