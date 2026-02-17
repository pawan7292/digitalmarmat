import { api } from "@/apiClient/api";
import { login } from "@/apiClient/login";
import { getUser } from "@/apiClient/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      document.cookie = `token=${data.token}; path=/`;
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem("token");
      delete api.defaults.headers.common.Authorization;
    },
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
