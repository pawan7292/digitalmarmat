export const getBlogs = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
    headers: {
      accept: "application/json",
    },
    next: { revalidate: 3600 },
  });
  const blogData = await response.json();
  return blogData.data;
};

export const getBlogDetails = async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`,
    {
      headers: {
        accept: "application/json",
      },
      next: { revalidate: 3600 },
    },
  );
  const blogDetails = await response.json();
  return blogDetails.data;
};
