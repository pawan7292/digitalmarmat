import { registerUser, verifyOtp } from "@/apiClient/signup";
import { useMutation } from "@tanstack/react-query";

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
  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
