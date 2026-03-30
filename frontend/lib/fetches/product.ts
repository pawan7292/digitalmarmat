import { ProductQueryParams } from "../types/product";
import { ServiceType } from "../types/service";

export const getProductDetails = async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
    {
      headers: {
        accept: "application/json",
      },
    },
  );
  const productData = await response.json();
  return productData.data.find((eachProduct: ServiceType) => {
    return eachProduct.slug === slug;
  });
};

export const getProducts = async (params: ProductQueryParams) => {
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
    },
  );
  const productData = await response.json();
  return productData;
};
