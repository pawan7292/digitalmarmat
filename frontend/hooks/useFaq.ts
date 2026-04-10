import { getAllFaq } from "@/apiClient/faq";
import { useQuery } from "@tanstack/react-query";

export function useGetAllFaq(params?: { page: number }) {
  return useQuery({
    queryKey: ["faqs", params],
    queryFn: () => getAllFaq(params),
  });
}
