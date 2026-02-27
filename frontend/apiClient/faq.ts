import { api } from "./api";

export async function getAllFaq(params?: { page: number }) {
  const response = await api.get("/api/faq", { params });
  return response.data;
}
