import { getServices } from "@/lib/fetches/service";
import { ServiceType } from "@/lib/types/service";
import Image from "next/image";
import GetRatingStar from "../ui/getRating";
import { FaHourglass, FaStar } from "react-icons/fa";
import { TbClockHour10 } from "react-icons/tb";
import Link from "next/link";

export default async function MostPopularProduct() {
  const returnedServices = await getServices({
    sort: "most_viewed",
  });

  const services: ServiceType[] = returnedServices?.data || [];
  return (
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4 sm:px-6 md:px-12 lg:px-24 w-full">
      <div className="h5 text-brand-raiden-500">Most Popular Services</div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 w-full">
        {services.slice(0, 5).map((eachService, index) => {
          return (
            <Link href={`/service-details/${eachService.slug}`} key={`${eachService.id}-${index}`}>
              <div className="rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                <div className="relative h-32 sm:h-40 md:h-48 w-full bg-gray-100">
                  <Image
                    alt={eachService.slug}
                    src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${eachService.images[0]}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-2 sm:p-3">
                  <div className="font-bold line-clamp-1 text-xs sm:text-sm md:text-base">{eachService.name}</div>
                  <div className="flex justify-between items-center text-xs mt-1">
                    <div className="flex items-center gap-1">
                      <GetRatingStar rating={eachService.avg_rating} size={10} />
                      <span>{Number(eachService.avg_rating).toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="text-gray-500 text-[10px] sm:text-xs line-clamp-1">
                    {eachService.location}
                  </div>
                  <div className="flex gap-1 sm:gap-2 text-xs mt-1">
                    <div>Rs. {Number(eachService.price).toLocaleString()}</div>
                    <div className="flex items-center gap-1">
                      <TbClockHour10 size={12} /> {eachService.duration}
                    </div>
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
