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
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      delete api.defaults.headers.common.Authorization;
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    },
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
