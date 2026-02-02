import { api } from "./api";

export async function getAllCategories() {
  const response = await api.get("/api/categories");
  return response.data;
}
