import { cache } from "react";

export const getAllRatings = cache(async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/all-ratings`,
      {
        headers: {
          accept: "application/json",
        },
        next: {
          revalidate: 3600,
        },
        signal: AbortSignal.timeout(10000),
      },
    );
    if (!response.ok) {
      console.error(`All ratings fetch failed: ${response.status}`);
      return [];
    }
    const ratingsData = await response.json();
    return ratingsData || [];
  } catch (error) {
    console.error("Error fetching all ratings:", error);
    return [];
  }
});
