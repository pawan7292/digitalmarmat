"use server";

import { cookies } from "next/headers";

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
    if (!response.ok) {
      throw new Error(
        typeof data?.message === "string"
          ? data.message
          : "Booking failed",
      );
    }
    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) throw error;
    throw new Error("Booking failed");
  }
}
