export type ServiceQueryParams = {
  page?: number;

  name?: string;
  category?: number;
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
  category: string;
  category_id: number;
  price_type: string;
  price: number;
  location: string;
  images: [string];
  bookings: number;
};

export type ServiceDetailsType = {
  id: number;
  name: string;
  slug: string;
  category: {
    id: number;
    name: string;
  };
  views: number;
  price_type: string;
  price: number;
  location: string;
  images: [string];
  bookings: number;
  include: string;
  slots: [
    {
      id: number;
      source_key: string;
      source_values: string;
    },
  ];
  description: string;
  duration: number;
};

export type PriceType = {
  service_amount: number;
  amount_tax: number;
  total_amount: number;
};
