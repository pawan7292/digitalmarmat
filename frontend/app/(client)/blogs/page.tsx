import BlogBox from "@/components/blog/BlogBox";
import { getBlogs } from "@/lib/fetches/blogs";
import { BlogType } from "@/lib/types/blog";

export const revalidate = 3600;

export default async function BlogPage() {
  const blogs = await getBlogs() || [];
  return (
    <div className="flex flex-col p-4 sm:p-6 md:p-8 items-center gap-8 sm:gap-10 md:gap-12">
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold">Blogs</div>
      <div className="flex gap-4 sm:gap-6 md:gap-8 flex-wrap justify-center">
        {blogs.map((eachBlog: BlogType) => {
          return <BlogBox eachBlog={eachBlog} key={eachBlog.id} />;
        })}
      </div>
    </div>
  );
}
