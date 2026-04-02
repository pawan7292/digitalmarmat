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
    <div className="flex gap-8 w-5/6 px-4 justify-center flex-wrap">
      {services.map((eachService, index) => {
        return (
          <Link href={`/service-details/${eachService.slug}`} key={`${eachService.id}-${index}`}>
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
          </Link>
        );
      })}
    </div>
  );
}
