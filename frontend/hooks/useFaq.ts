import { getAllFaq } from "@/apiClient/faq";
import { useQuery } from "@tanstack/react-query";

export function useGetAllFaq() {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: getAllFaq,
  });
}
