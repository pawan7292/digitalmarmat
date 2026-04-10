import { api } from "./api";

export async function getAllLocations() {
  const response = await api.get("/api/locations");
  return response.data;
}
