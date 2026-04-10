import { api } from "./api";

export async function createContact({ body }: { body: any }) {
  const response = await api.post("/api/contact", body);
  return response.data;
}
