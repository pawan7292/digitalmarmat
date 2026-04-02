import GetRatingStar from "@/components/ui/getRating";
import { ServiceQueryParams, ServiceType } from "@/lib/types/service";
import Image from "next/image";
import ServiceSort from "@/components/services/ServiceSort";
import { ProductType } from "@/lib/types/product";
import Link from "next/link";

export default async function ExploreProducts({
  products,
}: {
  products: ProductType[];
}) {
  return (
    <div className="flex flex-col gap-6 sm:gap-10 md:gap-14 lg:gap-16 px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="flex justify-between items-center">
        <div className="bodyheading text-brand-raiden-500">Explore</div>
        <div>{/* <ServiceSort slug={category} params={filters} /> */}</div>
      </div>
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
        {products.map((eachService: ProductType, index) => {
          return (
            <Link
              href={`/product-details/${eachService.slug}`}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch border border-brand-raiden-500 rounded-xl hover:shadow-md transition"
              key={`${eachService.id}-${index}`}
            >
              <div className="w-full sm:w-48 md:w-64 lg:w-80 relative h-32 sm:h-auto">
                <Image
                  fill
                  alt={eachService.name}
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${eachService.images[0]}`}
                  className="object-cover rounded-t-xl sm:rounded-l-xl"
                />
              </div>
              <div className="flex flex-col py-2 sm:py-4 px-2 sm:px-4 gap-2 sm:gap-4 flex-1">
                <div>
                  <div className="font-general-sans font-medium text-base sm:text-lg md:text-xl lg:text-2xl line-clamp-1">
                    {eachService.name}
                  </div>
                  <div className="font-general-sans text-gray-500 text-xs sm:text-sm">
                    {eachService.brand}
                  </div>
                </div>
                <div className="flex">
                  <button className="text-xs sm:text-sm font-medium text-brand-raiden-700 hover:text-brand-raiden-100 hover:cursor-pointer border border-brand-raiden-700 hover:bg-brand-raiden-700 px-2 sm:px-4 py-1 sm:py-2 rounded">
                    View Product
                  </button>
                </div>
                <div className="text-xs sm:text-sm font-general-sans flex gap-2 flex-wrap items-center">
                  <span className="line-through text-gray-500">Rs. {eachService.price}</span>
                  <span className="font-semibold text-brand-raiden-500">
                    Rs. {Number(eachService.price) - Number((Number(eachService.price) * Number(eachService.discount)) / 100)}
                  </span>
                  <div className="text-[10px] bg-brand-ruby-500 text-white px-1.5 py-0.5 rounded">
                    {Number(eachService.discount)}% off
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
