import { getAllCategories } from "@/apiClient/categories";
import { useQuery } from "@tanstack/react-query";

export function useGetAllCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
}
