"use client";

import ServiceBox from "@/components/services/ServiceBox";
import ServiceFilter from "@/components/services/ServiceFilter";
import ServicePagination from "@/components/services/ServicePagination";
import ServiceSearchByName from "@/components/services/ServiceSearchByName";
import ServiceSort from "@/components/services/ServiceSort";
import { useGetAllServices } from "@/hooks/useServices";
import { ServiceType } from "@/lib/types/service";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function ServicesPage() {
  return (
    <Suspense fallback={<div>Loading services...</div>}>
      <ServicesClient />
    </Suspense>
  );
}
function ServicesClient() {
  const searchParams = useSearchParams();
  const nameFromUrl = searchParams.get("name") || undefined;
  const [category, setCategory] = useState<number | undefined>(undefined);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(nameFromUrl);
  const [sort, setSort] = useState<
    "most_viewed" | "most_booked" | "price_low" | "price_high" | undefined
  >(undefined);
  const [page, setPage] = useState(1);
  const {
    data: servicesData,
    isLoading,
    isError,
  } = useGetAllServices({
    name,
    sort,
    location,
    category,
    page,
    min_price: minPrice,
    max_price: maxPrice,
  });

  useEffect(() => {
    setName(nameFromUrl);
  }, [nameFromUrl]);

  const links = servicesData?.meta?.links || null;
  console.log(servicesData?.data || []);
  const services = servicesData?.data || [];
  return (
    <div className="flex flex-col gap-2 min-h-screen gap-8 py-6">
      <div className="text-5xl font-bold text-center ">Services</div>
      <div className="self-end mr-24">
        <ServiceSort sort={sort} onChange={setSort} />
      </div>
      <div className="flex justify-center gap-4 px-4">
        <div className="w-1/4 flex flex-col gap-4">
          <ServiceFilter
            category={category}
            setCategory={setCategory}
            location={location}
            setLocation={setLocation}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>

        <div className="w-3/4 flex flex-col gap-4">
          <ServiceSearchByName name={name} setName={setName} />
          <div className="rounded-md flex flex-wrap gap-4">
            {services?.map((service: ServiceType) => {
              return <ServiceBox key={service.id} service={service} />;
            })}
          </div>
        </div>
      </div>
      <ServicePagination links={links} setPage={setPage} />
    </div>
  );
}
