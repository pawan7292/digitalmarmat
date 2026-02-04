// lib/logout.ts
import { QueryClient } from "@tanstack/react-query";

export function logout(queryClient: QueryClient) {
  localStorage.removeItem("token");

  // remove user from cache
  queryClient.removeQueries({ queryKey: ["user"] });
}
