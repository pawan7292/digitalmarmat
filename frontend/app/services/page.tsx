"use client";

import ServiceBox from "@/components/services/ServiceBox";
import { useGetAllServices } from "@/hooks/useServices";
import { ServiceType } from "@/lib/types/service";

export default function ServicesPage() {
  const {
    data: servicesData,
    isLoading,
    isError,
  } = useGetAllServices({
    sort: "most_viewed",
    category: 7,
  });
  const services = servicesData?.data || [];
  return (
    <div className="flex gap-2 w-full h-screen">
      <div className="rounded-md">filter</div>
      <div className="rounded-md w-full flex flex-wrap gap-4 justify-center">
        {services?.map((service: ServiceType) => {
          return <ServiceBox key={service.id} service={service} />;
        })}
      </div>
    </div>
  );
}
