import { api } from "./api";

export async function getUserBookings() {
  const response = await api.get("/api/get-user-bookings");
  return response.data;
}
