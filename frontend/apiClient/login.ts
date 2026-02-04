import { api } from "./api";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await api.post("/api/login", { email, password });
  return response.data;
}
