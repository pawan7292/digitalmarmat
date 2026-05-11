import { createContact } from "@/apiClient/contact";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateContact() {
  return useMutation({
    mutationFn: createContact,
    onSuccess: (response) => {
      console.log(response);
      toast.success("Your Message was Succesfully sent");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error creating contact");
    },
  });
}
