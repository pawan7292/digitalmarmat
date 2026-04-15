import { getServices } from "@/lib/fetches/service";
import { ServiceType } from "@/lib/types/service";
import Image from "next/image";
import GetRatingStar from "../ui/getRating";
import { TbClockHour10 } from "react-icons/tb";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default async function MostBookedServices() {
  const returnedServices = await getServices({
    sort: "most_booked",
  });

  const services: ServiceType[] = returnedServices?.data || [];
  return (
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4 sm:px-6 md:px-12 lg:px-24 w-full">
      <Link
        href={"/all-services"}
        className="h5 flex items-center gap-2 text-brand-raiden-500 group w-fit"
      >
        <div className="relative inline-block">
          <span>Most Booked Services</span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-raiden-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </div>
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
      <div className="relative">
        {/* left icon */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 md:hidden bg-white shadow rounded-full p-1">
          <ChevronLeft size={18} />
        </div>

        {/* right icon */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 md:hidden bg-white shadow rounded-full p-1">
          <ChevronRight size={18} />
        </div>
        <div className="flex md:grid flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible gap-2 sm:gap-3 md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 scroll-smooth snap-x snap-mandatory pb-2">
          {services.slice(0, 5).map((eachService, index) => {
            return (
              <Link
                href={`/service-details/${eachService.slug}`}
                key={`${eachService.id}-${index}`}
                className="group min-w-[220px] sm:min-w-[240px] md:min-w-0 snap-start rounded-lg shadow-sm overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative h-48 sm:h-40 md:h-48 w-full bg-gray-100 overflow-hidden">
                  <Image
                    alt={eachService.slug}
                    src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${eachService.images[0]}`}
                    fill
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="p-2 sm:p-3">
                  <div className="font-bold line-clamp-1 text-xs sm:text-sm md:text-base transition-colors duration-300 group-hover:text-brand-raiden-500">
                    {eachService.name}
                  </div>

                  <div className="flex justify-between items-center text-xs mt-1 gap-1">
                    <div className="flex items-center gap-1">
                      <GetRatingStar
                        rating={eachService.avg_rating}
                        size={10}
                      />
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
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
