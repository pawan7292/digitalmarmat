import { cache } from "react";
import { ServiceQueryParams } from "../types/service";

export const getServiceDetail = async (slug: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/services/${slug}`,
      {
        headers: {
          accept: "application/json",
        },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(10000),
      },
    );
    
    if (!response.ok) {
      console.error(`Service detail fetch failed: ${response.status}`);
      return null;
    }
    
    const serviceData = await response.json();
    return serviceData?.data || null;
  } catch (error) {
    console.error("Error fetching service detail:", error);
    return null;
  }
};

export const getServices = cache(async (params: ServiceQueryParams = {}) => {
  try {
    const cleanParams = Object.fromEntries(
      Object.entries(params || {}).filter(
        ([_, v]) => v !== undefined && v !== null && v !== "",
      ),
    );

    const query = new URLSearchParams(cleanParams as any).toString();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/services?${query}`,
      {
        headers: {
          accept: "application/json",
        },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(10000),
      },
    );

    if (!response.ok) {
      console.error(`Services fetch failed: ${response.status}`);
      return { data: [] };
    }
    
    const data = await response.json();
    return data || { data: [] };
  } catch (error) {
    console.error("Error fetching services:", error);
    return { data: [] };
  }
});
