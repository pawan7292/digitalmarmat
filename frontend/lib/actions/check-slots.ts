"use server";

import { cookies } from "next/headers";

export async function checkSlotsAction(
  bookingDate: string,
  slotIds: number[],
): Promise<Record<string, boolean>> {
  // const token = (await cookies()).get("token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/check-slots`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        // authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ booking_date: bookingDate, slot_ids: slotIds }),
    },
  );
  const data = await res.json();
  console.log(data)
  return data.slots;
}