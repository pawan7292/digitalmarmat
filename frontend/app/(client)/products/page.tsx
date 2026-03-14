import ProductBox from "@/components/products/ProductBox";
import ServicePagination from "@/components/services/ServicePagination";
import { getProducts } from "@/lib/fetches/product";
import { ServiceType } from "@/lib/types/service";

export default async function ProductPage() {
  const returnedProducts = await getProducts();
  const products = returnedProducts.data;
  const links = returnedProducts?.meta?.links || null;
  return (
    <div className="flex flex-col gap-2 min-h-screen gap-8 py-6">
      <div className="text-5xl font-bold text-center ">Products</div>
      <div className="flex justify-center gap-4 px-4">
        <div className="w-3/4 flex flex-col gap-4">
          <div className="rounded-md flex flex-wrap gap-4">
            {products.map((product: ServiceType) => {
              return <ProductBox key={product.id} service={product} />;
            })}
          </div>
        </div>
      </div>
      <ServicePagination links={links}/>
    </div>
  );
}
