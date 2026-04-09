export type ServiceQueryParams = {
  page?: number;

  name?: string;
  category?: string;
  subcategory?: string;
  location?: string;

  min_price?: number;
  max_price?: number;

  sort?: SortOption;
};

export type SortOption =
  | "most_viewed"
  | "most_booked"
  | "price_low"
  | "price_high"
  | undefined;

export type ServiceType = {
  id: number;
  name: string;
  views: number;
  slug: string;
  rating: [number];
  avg_rating: number;
  duration: string;
  rating_count: number;
  seo_description: string;
  category: {
    id: number;
    name: string;
  };
  sub_category: {
    id: number;
    name: string;
  };
  category_id: number;
  price_type: string;
  price: number;
  location: string;
  images: [string];
  bookings: number;
};

export type ServiceRatingType = {
  id: number;
  user_id: number;
  product_id: number;
  parent_id: number;
  review: string;
  rating: string;
  review_date: string;
};

export type ServiceDetailsType = {
  id: number;
  name: string;
  slug: string;
  category: {
    id: number;
    slug: string;
    name: string;
  };
  subcategory: {
    id: number;
    slug: string;
    name: string;
  };
  ratings: [ServiceRatingType];
  avg_rating: string;
  views: number;
  price_type: string;
  price: number;
  location: string;
  seo_description: string;
  seo_title: string;
  seo_tags: string;
  images: [string];
  bookings: number;
  include: string;

  slots: [SlotsType];
  description: string;
  duration: number;
};

export type SlotsType = {
  id: number;
  source_key: string;
  source_values: string;
  available?: boolean;
};

export type PriceType = {
  service_amount: number;
  amount_tax: number;
  total_amount: number;
};
