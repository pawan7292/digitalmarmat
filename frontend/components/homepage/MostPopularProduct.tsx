import Image from "next/image";
import GetRatingStar from "../ui/getRating";
import { TbClockHour10 } from "react-icons/tb";
import { getProducts } from "@/lib/fetches/product";
import { ProductType } from "@/lib/types/product";

export default async function MostPopularProduct() {
  const returnedProducts = await getProducts({});

  const products: ProductType[] = returnedProducts?.data || [];
  return (
    <div className="flex flex-col gap-12 px-24 w-full">
      <div className="h5 text-brand-raiden-500">Most Popular products</div>
      <div className="flex gap-8 w-full justify-center">
        {products.slice(0, 5).map((eachService, index) => {
          return (
            <div key={`${eachService.id}-${index}`}>
              <div className="relative h-54 w-54">
                <Image
                  alt={eachService.slug}
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${eachService.images[0]}`}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-bold line-clamp-1">{eachService.name}</div>
                <div className="flex gap-2">
                  <div className="flex flex-col">
                    <div className=" font-semibold/10 text-gray-500 text-[15px]">
                      {eachService.model}
                    </div>
                    <div className=" font-semibold text-brand-raiden-500 text-[16px]">
                      Rs.{" "}
                      {Number(eachService.price) -
                        Number(
                          (Number(eachService.price) *
                            Number(eachService.discount)) /
                            100,
                        )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center text-red-500 font-bold">
                      {Number(eachService.discount)} %
                    </div>
                    <div className="flex items-center">
                      <span className="line-through text-gray-500">
                        Rs. {Number(eachService.price)}{" "}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="line-clamp-1 text-gray-500">{eachService.seo_description}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
