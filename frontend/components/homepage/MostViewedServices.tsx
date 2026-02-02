"use client";

import { useGetAllServices } from "@/hooks/useServices";
import { ServiceType } from "@/lib/types/service";
import { Badge } from "../ui/badge";

export default function MostViewedServices() {
  const { data: getViewedServices, isLoading } = useGetAllServices({
    sort: "most_viewed",
  });
  const viewedServices = getViewedServices?.data?.slice(0, 4) || [];
  return (
    <div className="p-4 px-8 flex flex-col gap-4">
      <div className="text-2xl font-bold">Most Viewed Services</div>
      <div className="flex gap-8">
        {viewedServices.map((eachService: ServiceType) => {
          return (
            <div className="w-1/4 border-1 rounded-lg" key={eachService.id}>
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
                  <Badge variant={"secondary"}>{eachService.views} views</Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
