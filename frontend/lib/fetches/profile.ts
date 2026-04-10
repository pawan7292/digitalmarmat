"use server";

import { cookies } from "next/headers";

export async function getUserBookings({ page }: { page?: number }) {
  const cleanParams = Object.fromEntries(
    Object.entries(page || {}).filter(
      ([_, v]) => v !== undefined && v !== null && v !== "",
    ),
  );

  const query = new URLSearchParams(cleanParams as any).toString();
  try {
    const token = (await cookies()).get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/get-user-bookings?${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Booking failed");
  }
}
