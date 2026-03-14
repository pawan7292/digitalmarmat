import BlogBox from "@/components/blog/BlogBox";
import { getBlogs } from "@/lib/fetches/blogs";
import { BlogType } from "@/lib/types/blog";

export default async function BlogPage() {
  const blogs = await getBlogs();
  return (
    <div className="flex flex-col p-8 items-center gap-12">
      <div className="text-5xl font-bold">Blogs</div>
      <div className="flex gap-8 flex-wrap">
        {blogs.map((eachBlog: BlogType) => {
          return <BlogBox eachBlog={eachBlog} key={eachBlog.id} />;
        })}
      </div>
    </div>
  );
}
