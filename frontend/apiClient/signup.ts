import { RegisterFormType } from "@/lib/types/register";
import { api } from "./api";

export async function registerUser({ body }: { body: RegisterFormType }) {
  const response = await api.post("/api/register", body);
  return response.data;
}

export async function verifyOtp({
  body,
}: {
  body: { otp: string; email: string };
}) {
  const response = await api.post("/api/verifyOtp", body);
  return response.data;
}
