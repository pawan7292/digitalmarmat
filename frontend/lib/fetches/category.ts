import { cache } from "react";

export const getCategories = cache(async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
    {
      headers: {
        accept: "application/json",
      },
      next: {
        revalidate: 3600,
      },
    },
  );
  const categoryData = await response.json();
  return categoryData;
});
