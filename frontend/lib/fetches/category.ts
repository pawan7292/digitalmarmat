import { cache } from "react";

export const getServiceCategories = cache(async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/serviceCategories`,
    {
      headers: {
        accept: "application/json",
      },
      // next: {
      //   revalidate: 3600,
      // },
    },
  );
  const categoryData = await response.json();
  return categoryData;
});

export const getProductCategories = cache(async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/productCategories`,
    {
      headers: {
        accept: "application/json",
      },
      // next: {
      //   revalidate: 3600,
      // },
    },
  );
  const categoryData = await response.json();
  return categoryData;
});

export const getSubCategories = cache(async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sub-categories/${slug}`,
    {
      headers: {
        accept: "application/json",
      },
      // next: {
      //   revalidate: 3600,
      // },
    },
  );
  const subCategoriesData = await response.json();
  return subCategoriesData;
});
