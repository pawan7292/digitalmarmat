import { cache } from "react";

export const getAllRatings = cache(async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/all-ratings`,
    {
      headers: {
        accept: "application/json",
      },
      // next: {
      //   revalidate: 3600,
      // },
    },
  );
  const ratingsData = await response.json();
  return ratingsData;
});
