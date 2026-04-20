import { cache } from "react";

export const getServiceCategories = cache(async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/serviceCategories`,
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
      console.error(`Service categories fetch failed: ${response.status}`);
      return { data: [] };
    }
    
    const categoryData = await response.json();
    return categoryData || { data: [] };
  } catch (error) {
    console.error("Error fetching service categories:", error);
    return { data: [] };
  }
});

export const getProductCategories = cache(async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/productCategories`,
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
      console.error(`Product categories fetch failed: ${response.status}`);
      return { data: [] };
    }
    
    const categoryData = await response.json();
    return categoryData || { data: [] };
  } catch (error) {
    console.error("Error fetching product categories:", error);
    return { data: [] };
  }
});

export const getSubCategories = cache(async (slug: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/sub-categories/${slug}`,
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
      console.error(`Sub-categories fetch failed: ${response.status}`);
      return { sub_categories: [] };
    }
    
    const subCategoriesData = await response.json();
    return subCategoriesData || { sub_categories: [] };
  } catch (error) {
    console.error("Error fetching sub-categories:", error);
    return { sub_categories: [] };
  }
});
