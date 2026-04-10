export type RatingType = {
  id: string;
  rating: number;
  review: string;
  product_id: number;
  user_id: number;
  product: {
    id: number;
    source_name: string;
  };
  user: {
    id: number;
    name: string;
  };
};
