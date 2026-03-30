export type ProductType = {
  id: number;
  name: string;
  slug: string;
  category: {
    id: number;
    name: string;
    slug: string;
    icon: string;
    image: string;
    description: string;
  };
  sub_category: {
    id: number;
    name: string;
    slug: string;
    icon: string;
    image: string;
    description: string;
  };
  brand: string;
  model: string;
  capacity: string;
  warranty: string;
  images: [string];
  price: string;
  discount: string;
  seo_description: string;
  seo_title: string;
};
