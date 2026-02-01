export type ServiceQueryParams = {
  page?: number;
  per_page?: number;

  name?: string;
  category?: number;
  location?: string;

  min_price?: number;
  max_price?: number;

  sort?: "most_viewed" | "most_booked" | "price_low" | "price_high";
};

export type ServiceType = {
  id: number;
  name: string;
  views: number;
  slut: string;
  category: string;
  category_id: number;
  price_type: string;
  price: number;
  location: string;
  images: string;
  bookings: number;
};
