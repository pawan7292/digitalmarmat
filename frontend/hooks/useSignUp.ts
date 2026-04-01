import { registerUser, verifyOtp } from "@/apiClient/signup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRegisterUser() {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

export function useVerifyOtp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (response) => {
      document.cookie = `token=${response.token}; path=/`;
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
