import GetRatingStar from "@/components/ui/getRating";
import { ServiceQueryParams, ServiceType } from "@/lib/types/service";
import Image from "next/image";
import ServiceSort from "@/components/services/ServiceSort";
import Link from "next/link";

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
    <div className="flex flex-col gap-6 sm:gap-10 md:gap-14 lg:gap-16 px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="flex justify-between items-center">
        <div className="bodyheading text-brand-raiden-500">Explore</div>
        <div>
          <ServiceSort slug={category} params={filters} />
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
        {services.map((eachService: ServiceType, index) => {
          return (
            <Link
              href={`/service-details/${eachService.slug}`}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch bg-gray-100 shadow-sm rounded-xl hover:shadow-md transition"
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
                  <div className="flex gap-2 items-center font-general-sans text-[11px] sm:text-[12px] font-medium mt-1">
                    <div>{Number(eachService.avg_rating).toFixed(1)}</div>
                    <GetRatingStar size={12} rating={eachService.avg_rating} />
                  </div>
                  <div className="font-general-sans text-gray-500 text-xs sm:text-sm">
                    {eachService.bookings} Services booked
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button className="text-xs sm:text-sm font-medium text-brand-raiden-700 hover:text-brand-raiden-100 hover:cursor-pointer border border-brand-raiden-700 hover:bg-brand-raiden-700 px-2 sm:px-4 py-1 sm:py-2 rounded">
                    View Service
                  </button>
                </div>
                <div className="text-xs sm:text-sm font-medium font-general-sans">
                  Rs. {eachService.price} | {eachService.price_type}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
