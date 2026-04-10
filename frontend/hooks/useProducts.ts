import { useQuery } from "@tanstack/react-query";
import { ServiceQueryParams } from "@/lib/types/service";
import { getAllProducts } from "@/apiClient/products";

export function useGetAllProducts(params?: ServiceQueryParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getAllProducts(params),
  });
}
