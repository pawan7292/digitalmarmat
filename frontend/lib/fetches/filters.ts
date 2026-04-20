import { cache } from "react";

export const getLocations = cache(async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/locations`,
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
      console.error(`Locations fetch failed: ${response.status}`);
      return [];
    }
    const locationData = await response.json();
    return locationData || [];
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
});

export const getPriceRange = cache(async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/price-range`,
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
      console.error(`Price range fetch failed: ${response.status}`);
      return {};
    }
    const priceRangeData = await response.json();
    return priceRangeData || {};
  } catch (error) {
    console.error("Error fetching price range:", error);
    return {};
  }
});

export const getProductBrands = cache(async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/unique-brand`,
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
      console.error(`Product brands fetch failed: ${response.status}`);
      return [];
    }
    const brandData = await response.json();
    return brandData || [];
  } catch (error) {
    console.error("Error fetching product brands:", error);
    return [];
  }
});

export const getProductWarranty = cache(async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/unique-warranty`,
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
      console.error(`Product warranty fetch failed: ${response.status}`);
      return [];
    }
    const warrantyData = await response.json();
    return warrantyData || [];
  } catch (error) {
    console.error("Error fetching product warranty:", error);
    return [];
  }
});
