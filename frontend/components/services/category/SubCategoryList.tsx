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
  return (
    <div className="bg-gray-100 pt-8 w-full flex flex-col">
      <Link href={"/services"} className="self-center">
        All Services
      </Link>
      <div className="flex flex-col px-4 sm:px-6 md:px-12 lg:px-24 gap-8 sm:gap-12 md:gap-16 lg:gap-20  py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="h4 text-brand-raiden-800 text-center sm:text-left">
          {categoryName}
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-10 justify-items-center">
          {subCategories.map((eachCategory) => (
            <Link
              href={`/${category}/${eachCategory.slug}`}
              key={eachCategory.id}
              className="flex flex-col shadow-sm items-center hover:underline hover:cursor-pointer px-3 sm:px-4 py-3 sm:py-4 rounded-2xl gap-3 sm:gap-4 justify-center bg-white w-full max-w-[120px] sm:max-w-[140px]"
            >
              {/* Category Name */}
              <div className="text-center w-full overflow-hidden">
                <div className="font-general-sans text-[11px] sm:text-[12px] font-bold break-words">
                  {eachCategory.name}
                </div>
              </div>

              {/* Icon */}
              <div className="relative h-12 w-20 sm:h-16 sm:w-24">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${eachCategory.icon}`}
                  fill
                  alt={eachCategory.slug}
                  className="object-contain"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
