import GetRatingStar from "@/components/ui/getRating";
import { ServiceQueryParams, ServiceType } from "@/lib/types/service";
import Image from "next/image";
import ServiceSort from "@/components/services/ServiceSort";
import Link from "next/link";
import { TbClockHour10 } from "react-icons/tb";

export default async function ExploreServices({
  services,
  filters,
  category,
}: {
  services: ServiceType[];
  filters: ServiceQueryParams;
  category: string;
}) {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12">
      <div className="flex justify-between items-center">
        <div className="h4 text-brand-raiden-500">Explore</div>
        <div>
          <ServiceSort slug={category} params={filters} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 w-full">
        {services.map((eachService: ServiceType, index) => {
          return (
            <Link
              href={`/service-details/${eachService.slug}`}
              key={`${eachService.id}-${index}`}
              className="group rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-105 h-full flex flex-col bg-white"
            >
              {/* Image */}
              <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
                <Image
                  alt={eachService.name}
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${eachService.images[0]}`}
                  fill
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
                <div className="font-bold line-clamp-2 text-sm sm:text-base md:text-lg transition-colors duration-300 group-hover:text-brand-raiden-600 leading-snug">
                  {eachService.name}
                </div>

                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <GetRatingStar
                      rating={eachService.avg_rating}
                      size={14}
                    />
                    <span className="text-gray-700 font-semibold text-xs sm:text-sm">{Number(eachService.avg_rating).toFixed(1)}</span>
                  </div>
                </div>

                <div className="text-gray-600 text-xs sm:text-sm line-clamp-1 font-medium">
                  {eachService.location}
                </div>

                <div className="flex gap-2 sm:gap-3 text-xs sm:text-sm mt-auto pt-3 border-t border-gray-200 flex-wrap">
                  <div className="font-bold text-brand-raiden-700">Rs. {Number(eachService.price).toLocaleString()}</div>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <TbClockHour10 size={14} /> {eachService.duration}
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
