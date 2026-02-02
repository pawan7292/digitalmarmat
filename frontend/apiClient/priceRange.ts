import { api } from "./api";

export async function getPriceRange() {
  const response = await api.get("/api/price-range");
  return response.data;
}
