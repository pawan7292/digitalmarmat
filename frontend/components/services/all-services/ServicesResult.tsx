import GetRatingStar from "@/components/ui/getRating";
import { ServiceType } from "@/lib/types/service";
import Image from "next/image";
import Link from "next/link";
import { TbClockHour10 } from "react-icons/tb";

export default async function ServicesResult({
  services,
}: {
  services: ServiceType[];
}) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 w-full px-2 sm:px-4">
      {services.map((eachService, index) => {
        return (
          <Link href={`/service-details/${eachService.slug}`} key={`${eachService.id}-${index}`}>
            <div className="rounded-lg shadow-sm overflow-hidden hover:shadow-md transition h-full">
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
                <div className="flex justify-between items-center text-xs mt-1 gap-1">
                  <div className="flex items-center gap-1">
                    <GetRatingStar rating={eachService.avg_rating} size={10} />
                    <span>{Number(eachService.avg_rating).toFixed(1)}</span>
                  </div>
                </div>
                <div className="text-gray-500 text-[10px] sm:text-xs line-clamp-1">
                  {eachService.location}
                </div>
                <div className="flex gap-1 sm:gap-2 text-xs mt-1 flex-wrap">
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
  );
}
