import { getPriceRange } from "@/apiClient/priceRange";
import { useQuery } from "@tanstack/react-query";

export function useGetPriceRange() {
  return useQuery({
    queryKey: ["priceRange"],
    queryFn: getPriceRange,
  });
}
