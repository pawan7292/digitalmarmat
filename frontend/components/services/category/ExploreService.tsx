import GetRatingStar from "@/components/ui/getRating";
import { ServiceQueryParams, ServiceType } from "@/lib/types/service";
import Image from "next/image";
import ServiceSort from "../ServiceSort";

export default function ExploreServices({
  services,
  filters,
  category,
}: {
  services: ServiceType[];
  filters: ServiceQueryParams;
  category: string;
}) {
  return (
    <div className="flex flex-col gap-16 px-24">
      <div className="flex justify-between items-center">
        <div className="h4 text-brand-raiden-500">Explore</div>
        <div>
          <ServiceSort slug={category} params={filters} />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {services.map((eachService: ServiceType) => {
          return (
            <div
              className="flex gap-4 items-stretch border-1 border-brand-raiden-900 rounded-xl"
              key={eachService.id}
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
                  <div className="flex gap-2 items-center font-general-sans text-[12px] font-medium">
                    <div>{Number(eachService.avg_rating)}</div>
                    <GetRatingStar size={12} rating={eachService.avg_rating} />
                  </div>
                  <div className="font-general-sans text-brand-grey-500 text-[15px]">
                    {eachService.bookings} Services booked
                  </div>
                </div>
                <div className="flex">
                  <button className="body font-medium text-brand-raiden-700 hover:text-brand-raiden-100 hover:cursor-pointer border-2 border-brand-raiden-700 hover:bg-brand-raiden-700 px-4 py-2 rounded-xl">
                    View Service
                  </button>
                </div>
                <div className="body">
                  Rs. {eachService.price} | {eachService.price_type}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
