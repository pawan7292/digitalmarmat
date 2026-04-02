export interface SearchPageParams {
  page?: number;

  name?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  warranty?: string;

  // tab selector
  tab?: "services" | "products";
  // service-specific
  location?: string;
  // product-specific

  min_price?: number;
  max_price?: number;

  sort?: SortOption;
}

export type SortOption =
  | "most_viewed"
  | "most_booked"
  | "price_low"
  | "price_high"
  | undefined;
