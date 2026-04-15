"use server";

import { cookies } from "next/headers";

export async function rateServiceAction(
  slug: string,
  rating: number,
  review: string,
) {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rating/${slug}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating, review }),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to submit review");
  }

  return res.json();
}