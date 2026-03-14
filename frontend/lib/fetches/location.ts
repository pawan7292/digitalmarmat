import { cache } from "react";

export const getLocations = cache(async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/locations`,
    {
      headers: {
        accept: "application/json",
      },
      next: {
        revalidate: 3600,
      },
    },
  );
  const locationData = await response.json();
  return locationData;
});
