export type BlogType = {
  id: number;
  title: string;
  image: string;
  slug: string;
  category: string;
  category_id: number;
  seo_description: string;
  seo_title: string;
  seo_tags: string;
  created_at: Date;
};

export type BlogDetailsType = {
  id: number;
  title: string;
  image: string;
  slug: string;
  category: string;
  category_id: number;
  seo_description: string;
  seo_title: string;
  seo_tags: string;
  created_at: Date;
  description: string;
};
