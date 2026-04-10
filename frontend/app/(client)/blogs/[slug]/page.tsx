import { FaRegCalendarAlt, FaFolderOpen } from "react-icons/fa";
import { getBlogDetails } from "@/lib/fetches/blogs";
import { BlogDetailsType } from "@/lib/types/blog";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogData: BlogDetailsType = await getBlogDetails(slug);
  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-6">
      {/* Blog Image */}
      <div className="w-full h-80 md:h-[400px] rounded-xl overflow-hidden shadow-md">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/storage/blogs/${blogData.image}`}
          alt={blogData.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Blog Meta */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between text-gray-500 text-sm gap-2">
        <div className="flex items-center gap-2">
          <FaRegCalendarAlt />
          <span>{new Date(blogData.created_at).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaFolderOpen />
          <span>{blogData.category}</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
        {blogData.title}
      </h1>

      {/* SEO Description */}
      <p className="text-gray-700 text-base md:text-lg">
        {blogData.seo_description}
      </p>

      {/* Full Description */}
      <div
        className="prose prose-lg md:prose-xl text-gray-800"
        dangerouslySetInnerHTML={{ __html: blogData.description || "" }}
      ></div>
    </div>
  );
}
