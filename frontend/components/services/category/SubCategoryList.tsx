import { GetCategoryType } from "@/lib/types/category";
import Image from "next/image";
import Link from "next/link";

export default async function SubCategoryList({
  categoryName,
  subCategories,
  category,
}: {
  categoryName: string;
  subCategories: GetCategoryType[];
  category: string;
}) {
  let link = "services";
  if (category.includes("product")) {
    link = "products";
  }

  return (
    <div className="bg-white pt-6 w-full flex flex-col">
      {/* Breadcrumb Navigation - Smaller text */}
      <div className="flex justify-center gap-2 mb-2">
        <Link
          href={`/all-${link}`}
          className="flex items-center text-xs text-blue-600 hover:underline font-medium"
        >
          All <span className="capitalize">&nbsp;{link}</span>
        </Link>
        <div className="text-gray-300 text-xs">|</div>
        <Link
          href={`/${link}`}
          className="flex items-center text-xs text-blue-600 hover:underline font-medium"
        >
          <span className="capitalize">{link}&nbsp;</span> Categories
        </Link>
      </div>

      <div className="flex flex-col px-4 sm:px-8 md:px-16 lg:px-24 py-4">
        {/* Section Heading - Scaled down */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-left">
          {categoryName}
        </h2>

        {/* Grid: Increased column count on large screens to make items appear smaller */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-6">
          {subCategories.map((eachCategory) => (
            <Link
              href={`/${category}/${eachCategory.slug}`}
              key={eachCategory.id}
              className="group flex flex-col items-center gap-2 transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Image Container: Max-width constraint added to keep images small */}
              <div className="relative aspect-square w-full max-w-[100px] sm:max-w-[120px] overflow-hidden rounded-2xl bg-gray-50 shadow-sm border border-gray-100">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${eachCategory.icon}`}
                  fill
                  alt={eachCategory.name}
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text Label: Smaller, tighter typography */}
              <div className="text-center px-1">
                <span className="text-[12px] sm:text-[13px] font-semibold text-gray-700 leading-tight block">
                  {eachCategory.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}