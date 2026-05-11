import GetRatingStar from "@/components/ui/getRating";
import { ServiceQueryParams, ServiceType } from "@/lib/types/service";
import Image from "next/image";
import ServiceSort from "@/components/services/ServiceSort";
import { ProductType } from "@/lib/types/product";
import Link from "next/link";
import ProductCard from "@/components/homepage/ProductBox";

export default async function ExploreProducts({
  products,
}: {
  products: ProductType[];
}) {
  return (
    <div className="flex flex-col gap-6 sm:gap-10 md:gap-14 lg:gap-16 px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="flex justify-between items-center">
        <div className="h4 text-brand-raiden-500">Explore</div>
        <div>{/* <ServiceSort slug={category} params={filters} /> */}</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 w-full">
        {products.map((eachProduct: ProductType, index) => {
          return (
            <ProductCard
              product={eachProduct}
              key={`${eachProduct.id}-${index}`}
            />
          );
        })}
      </div>
    </div>
  );
}
