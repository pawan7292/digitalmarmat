import { bookService, getUserBookings } from "@/apiClient/bookings";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetUserBookings() {
  return useQuery({
    queryKey: ["userBookings"],
    queryFn: getUserBookings,
  });
}

export function useBookService() {
  return useMutation({
    mutationFn: bookService,
    onSuccess: (response) => {
      toast.success("Successfully Booked Service");
    },
    onError: (error) => {
      toast.error("Error while booking service");
    },
  });
}
