import { getAllServices } from "@/apiClient/services";
import { useQuery } from "@tanstack/react-query";
import { ServiceQueryParams } from "@/lib/types/service";

export function useGetAllServices(params?: ServiceQueryParams) {
  return useQuery({
    queryKey: ["services", params],
    queryFn: () => getAllServices(params),
  });
}
