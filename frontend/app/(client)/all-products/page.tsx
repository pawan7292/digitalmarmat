import FiltersComponent from "@/components/filters/Filters";
import ProductFilters from "@/components/filters/ProductFilter";
import ProductResult from "@/components/products/all-products/ProductResult";
import ServicesResult from "@/components/services/all-services/ServicesResult";
import ServicePagination from "@/components/services/ServicePagination";
import ServiceSort from "@/components/services/ServiceSort";
import { getProducts } from "@/lib/fetches/product";
import { getServices } from "@/lib/fetches/service";
import { ProductQueryParams, ProductType } from "@/lib/types/product";
import { ServiceType } from "@/lib/types/service";

export default async function AllProducts({
  searchParams,
}: {
  searchParams: Promise<ProductQueryParams>;
}) {
  const filters = await searchParams;

  const returnedProducts = await getProducts({
    page: filters.page,
    category: filters.category,
    brand: filters.brand,
    warranty: filters.warranty,
  });

  const links = returnedProducts?.meta?.links || [];
  const products: ProductType[] = returnedProducts?.data || [];
  
  return (
    <div className="flex flex-col font-general-sans">
      <div className="flex border-b border-black justify-between px-12 py-4 sticky top-12 z-6 bg-white items-center">
        <div className="font-semibold">Filters</div>
        <ServiceSort params={filters} slug="all-services" />
      </div>
      <div className="flex w-full">
        {/* <FiltersComponent params={filters} slug={"all-services"} /> */}
        <ProductFilters filters={filters} category="all-products"/>
        <ProductResult products={products} />
      </div>
      <div className="py-8">
        <ServicePagination
          filters={filters}
          category="all-services"
          links={links}
        />
      </div>
    </div>
  );
}
