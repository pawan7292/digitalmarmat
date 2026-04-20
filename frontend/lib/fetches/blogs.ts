export const getBlogs = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
      headers: {
        accept: "application/json",
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });
    
    if (!response.ok) {
      console.error(`Blog fetch failed: ${response.status}`);
      return [];
    }
    
    const blogData = await response.json();
    return blogData?.data || [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

export const getBlogDetails = async (slug: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`,
      {
        headers: {
          accept: "application/json",
        },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(10000), // 10 second timeout
      },
    );
    
    if (!response.ok) {
      console.error(`Blog details fetch failed: ${response.status}`);
      return null;
    }
    
    const blogDetails = await response.json();
    return blogDetails?.data || null;
  } catch (error) {
    console.error("Error fetching blog details:", error);
    return null;
  }
};
