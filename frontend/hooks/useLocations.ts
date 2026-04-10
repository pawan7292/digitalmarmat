import { getAllLocations } from "@/apiClient/locations";
import { useQuery } from "@tanstack/react-query";

export function useGetallLocation() {
  return useQuery({
    queryKey: ["locations"],
    queryFn: getAllLocations,
  });
}
