import { QueryClient } from "@tanstack/react-query";

export function logout(queryClient: QueryClient) {
  queryClient.removeQueries({ queryKey: ["user"] });
}
