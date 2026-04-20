import { ProductQueryParams } from "../types/product";

export const getProductDetails = async (slug: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`,
      {
        headers: {
          accept: "application/json",
        },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(10000),
      },
    );
    
    if (!response.ok) {
      console.error(`Product fetch failed: ${response.status}`);
      return null;
    }
    
    const productData = await response.json();
    return productData || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export const getProducts = async (params: ProductQueryParams) => {
  try {
    const cleanParams = Object.fromEntries(
      Object.entries(params || {}).filter(
        ([_, v]) => v !== undefined && v !== null && v !== "",
      ),
    );

    const query = new URLSearchParams(cleanParams as any).toString();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?${query}`,
      {
        headers: {
          accept: "application/json",
        },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(10000),
      },
    );
    
    if (!response.ok) {
      console.error(`Products fetch failed: ${response.status}`);
      return { data: [] };
    }
    
    const productData = await response.json();
    return productData || { data: [] };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { data: [] };
  }
};
