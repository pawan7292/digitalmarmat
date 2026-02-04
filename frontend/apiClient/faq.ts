import { api } from "./api";

export async function getAllFaq() {
  const response = await api.get("/api/faq");
  return response.data;
}
