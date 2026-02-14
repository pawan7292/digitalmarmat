"use client";

import { useGetAllServices } from "@/hooks/useServices";
import { ServiceType } from "@/lib/types/service";
import { Badge } from "../ui/badge";
import Link from "next/link";

export default function MostPreferedServices() {
  const { data: getPreferedServices, isLoading } = useGetAllServices({
    sort: "most_booked",
  });
  const preferedServices = getPreferedServices?.data?.slice(0, 4) || [];
  return (
    <div className="p-4 px-8 flex flex-col gap-4">
      <div className="text-2xl font-bold">Most Prefered Services</div>
      <div className="flex gap-8">
        {preferedServices.map((eachService: ServiceType) => {
          return (
            <Link
              href={`/services/${eachService.slug}`}
              className="w-1/4 border-1 rounded-lg"
              key={eachService.id}
            >
              <div
                className="h-48 bg-cover bg-center rounded-t-lg"
                style={{ backgroundImage: `url(${eachService.images[0]})` }}
              ></div>
              <div className="p-4">
                <div className="text-xl font-extrabold truncate">
                  {eachService.name}
                </div>
                <div className="flex justify-between">
                  <div className="text-lg font-bold">
                    Price: Rs. {eachService.price}
                  </div>
                  <Badge variant={"secondary"}>
                    {eachService.bookings} bookings
                  </Badge>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
