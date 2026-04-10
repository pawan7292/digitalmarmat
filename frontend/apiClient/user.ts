import { api } from "./api";

export async function getUser() {
  const response = await api.get("/api/user");
  return response.data;
}
