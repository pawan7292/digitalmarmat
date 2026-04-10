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

export const getPriceRange = cache(async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/price-range`,
    {
      headers: {
        accept: "application/json",
      },
      // next: {
      //   revalidate: 3600,
      // },
    },
  );
  const priceRangeData = await response.json();
  return priceRangeData;
});

export const getProductBrands = cache(async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/unique-brand`,
    {
      headers: {
        accept: "application/json",
      },
    },
  );
  const brandData = await response.json();
  return brandData;
});

export const getProductWarranty = cache(async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/unique-warranty`,
    {
      headers: {
        accept: "application/json",
      },
    },
  );
  const warrantyData = await response.json();
  return warrantyData;
});
