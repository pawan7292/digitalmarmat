import { BlogType } from "@/lib/types/blog";
import Link from "next/link";
import { FiCalendar } from "react-icons/fi";

export default async function BlogBox({ eachBlog }: { eachBlog: BlogType }) {
  const formattedDate = new Date(eachBlog.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <Link
      href={`/blogs/${eachBlog.slug}`}
      className="flex w-98 flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 bg-white"
    >
      {/* Image */}
      <div
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/storage/blogs/${eachBlog.image})`,
        }}
        className="h-60 w-98 bg-no-repeat bg-cover bg-center"
      ></div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5">
        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FiCalendar className="text-base" />
          <span>{formattedDate}</span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 hover:text-black transition">
          {eachBlog.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3">
          {eachBlog.seo_description}
        </p>
      </div>
    </Link>
  );
}
