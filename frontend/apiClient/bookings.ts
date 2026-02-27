import { api } from "./api";

export async function getUserBookings() {
  const response = await api.get("/api/get-user-bookings");
  return response.data;
}

export async function bookService({ body }: { body: any }) {
  console.log(body)
  const response = await api.post("/api/book-service", body);
  return response.data;
}
