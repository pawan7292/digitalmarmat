import { cache } from "react";
import { ServiceQueryParams } from "../types/service";

export const getServiceDetail = async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/services/${slug}`,
    {
      headers: {
        accept: "application/json",
      },
      next: { revalidate: 3600 },
    },
  );
  const serviceData = await response.json();
  return serviceData.data;
};

export const getServices = cache(async (params?: ServiceQueryParams) => {
  const query = new URLSearchParams(params as any).toString();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/services?${query}`,
    {
      headers: {
        accept: "application/json",
      },
      next: {
        revalidate: 3600,
      },
    },
  );
  const serviceData = await response.json();
  return serviceData;
});
