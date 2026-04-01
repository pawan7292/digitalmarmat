import GetRatingStar from "@/components/ui/getRating";
import { ServiceQueryParams, ServiceType } from "@/lib/types/service";
import Image from "next/image";
import ServiceSort from "@/components/services/ServiceSort";
import { ProductType } from "@/lib/types/product";

export default async function ExploreProducts({
  products,
}: {
  products: ProductType[];
}) {
  return (
    <div className="flex flex-col gap-16 px-24">
      <div className="flex justify-between items-center">
        <div className="bodyheading text-brand-raiden-500">Explore</div>
        <div>{/* <ServiceSort slug={category} params={filters} /> */}</div>
      </div>
      <div className="flex flex-col gap-8">
        {products.map((eachService: ProductType, index) => {
          return (
            <div
              className="flex gap-4 items-stretch border-1 border-brand-raiden-500 rounded-xl"
              key={`${eachService.id}-${index}`}
            >
              <div className="w-96 relative">
                <Image
                  fill
                  alt={eachService.name}
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${eachService.images[0]}`}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col py-4 gap-8">
                <div className="">
                  <div className="font-general-sans font-medium text-[26.7px]">
                    {eachService.name}
                  </div>
                  <div className="font-general-sans text-brand-grey-500 text-[15px]">
                    {eachService.brand}
                  </div>
                </div>
                <div className="flex">
                  <button className="body font-medium text-brand-raiden-700 hover:text-brand-raiden-100 hover:cursor-pointer border-2 border-brand-raiden-700 hover:bg-brand-raiden-700 px-4 py-2 rounded-xl">
                    View Product
                  </button>
                </div>
                <div className="body flex gap-2 items-center">
                  <span className="line-through">Rs. {eachService.price}</span>
                  <span>
                    Rs.{" "}
                    {Number(eachService.price) -
                      Number(
                        (Number(eachService.price) *
                          Number(eachService.discount)) /
                          100,
                      )}
                  </span>
                  <div className="text-[12px] bg-brand-ruby-500 text-white px-2 rounded-xs">
                    {Number(eachService.discount)}% discount
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
