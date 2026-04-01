import { getServices } from "@/lib/fetches/service";
import { ServiceType } from "@/lib/types/service";
import Image from "next/image";
import GetRatingStar from "../ui/getRating";
import { TbClockHour10 } from "react-icons/tb";

export default async function MostBookedServices() {
  const returnedServices = await getServices({
    sort: "most_booked",
  });

  const services: ServiceType[] = returnedServices?.data || [];
  return (
    <div className="flex flex-col gap-12 px-24 w-full">
      <div className="h5 text-brand-raiden-500">Most Booked Services</div>
      <div className="flex gap-8 w-full justify-center">
        {services.slice(0, 5).map((eachService, index) => {
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
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <GetRatingStar rating={eachService.avg_rating} size={12} />{" "}
                    {eachService.avg_rating}
                  </div>
                </div>
                <div className="text-gray-500 text-[15px]">
                  {eachService.location}
                </div>
                <div className="flex gap-8">
                  <div>
                   <div>Rs. {eachService.price}</div>
                  </div>

                  <div className="flex items-center gap-1">
                    <TbClockHour10 size={12} /> {eachService.duration}
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
