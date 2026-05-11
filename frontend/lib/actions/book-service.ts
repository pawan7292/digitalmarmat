"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function bookServiceAction(body: any) {
  try {
    const token = (await cookies()).get("token")?.value;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/book-service`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      },
    );

    const data = await response.json();
    console.log("data", data);
    
    // Revalidate the profile bookings and service details pages after successful booking
    if (data?.booking_id) {
      revalidatePath("/profile/bookings");
      revalidatePath("/profile");
    }
    
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Booking failed");
  }
}
