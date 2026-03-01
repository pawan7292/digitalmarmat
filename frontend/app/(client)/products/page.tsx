"use client";

import ProductBox from "@/components/products/ProductBox";
import ServiceBox from "@/components/services/ServiceBox";
import ServicePagination from "@/components/services/ServicePagination";
import { useGetAllProducts } from "@/hooks/useProducts";
import { ServiceType } from "@/lib/types/service";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function ServicesPage() {
  return (
    <Suspense fallback={<div>Loading services...</div>}>
      <ProductClient />
    </Suspense>
  );
}

function ProductClient() {
  const [page, setPage] = useState(1);
  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetAllProducts({
    page,
  });
  const links = productsData?.meta?.links || null;
  const services = productsData?.data || [];
  console.log(services)
  return (
    <div className="flex flex-col gap-2 min-h-screen gap-8 py-6">
      <div className="text-5xl font-bold text-center ">Products</div>
      <div className="flex justify-center gap-4 px-4">
        <div className="w-3/4 flex flex-col gap-4">
          <div className="rounded-md flex flex-wrap gap-4">
            {services?.map((service: ServiceType) => {
              return <ProductBox key={service.id} service={service} />;
            })}
          </div>
        </div>
      </div>
      <ServicePagination links={links} setPage={setPage} />
    </div>
  );
}
