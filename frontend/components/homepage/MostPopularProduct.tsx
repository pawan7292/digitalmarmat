import Image from "next/image";
import GetRatingStar from "../ui/getRating";
import { TbClockHour10 } from "react-icons/tb";
import { getProducts } from "@/lib/fetches/product";
import { ProductType } from "@/lib/types/product";

export default async function MostPopularProduct() {
  const returnedProducts = await getProducts({});

  const products: ProductType[] = returnedProducts?.data || [];
  return (
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4 sm:px-6 md:px-12 lg:px-24 w-full">
      <div className="h5 text-brand-raiden-500">Most Popular products</div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 w-full">
        {products.slice(0, 5).map((eachService, index) => {
          return (
            <div key={`${eachService.id}-${index}`} className="rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="relative h-32 sm:h-40 md:h-48 w-full bg-gray-100">
                <Image
                  alt={eachService.slug}
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${eachService.images[0]}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2 sm:p-3">
                <div className="font-bold line-clamp-1 text-xs sm:text-sm">{eachService.name}</div>
                <div className="flex gap-1 text-[10px] sm:text-xs mt-1">
                  <div className="flex flex-col">
                    <div className="text-gray-500">{eachService.model}</div>
                    <div className="font-semibold text-brand-raiden-500">
                      Rs. {Number(eachService.price) - Number((Number(eachService.price) * Number(eachService.discount)) / 100)}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-red-500 font-bold">{Number(eachService.discount)}%</div>
                    <del className="text-gray-500 text-[8px]">Rs. {Number(eachService.price)}</del>
                  </div>
                </div>
                <div className="line-clamp-1 text-gray-500 text-[8px] sm:text-[9px] mt-1">{eachService.seo_description}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
