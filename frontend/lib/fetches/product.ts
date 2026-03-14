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

export const getProducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
    {
      headers: {
        accept: "application/json",
      },
    },
  );
  const productData = await response.json();
  return productData
};
