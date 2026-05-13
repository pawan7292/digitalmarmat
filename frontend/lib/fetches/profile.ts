"use server";

import { cookies } from "next/headers";

export async function getUserBookings({ page }: { page?: number }) {
  const cleanParams = Object.fromEntries(
    Object.entries({ page }).filter(([_, v]) => v !== undefined && v !== null),
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



export async function cancelBooking(booking_id: number) {

  try {

    const token = (await cookies()).get("token")?.value;

    const response = await fetch(

      `${process.env.NEXT_PUBLIC_API_URL}/api/cancel-booking`,

      {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

          accept: "application/json",

          authorization: `Bearer ${token}`,

        },

        body: JSON.stringify({ booking_id }),

      }

    );

    const data = await response.json();

    if (!response.ok) {

      throw new Error(data.message || "Cancel failed");

    }

    return data;

  } catch (error: any) {

    console.error(error);

    throw new Error(error.message || "Cancel booking failed");

  }

}