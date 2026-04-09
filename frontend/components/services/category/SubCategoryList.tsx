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
  console.log("categoryName", category);
  let link = "services";
  if (category.includes("product")) {
    link = "products";
  }
  return (
    <div className="bg-gray-100 pt-8 w-full flex flex-col">
      <div className="flex justify-center gap-2">
        <Link
          href={`/all-${link}`}
          className="flex items-center self-center text-sm sm:text-base text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
        >
          All <span className="capitalize">&nbsp;{link}</span>
        </Link>
        <div className="text-gray-500"> |</div>
        <Link
          href={`/${link}`}
          className="flex items-center self-center text-sm sm:text-base text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
        >
          <span className="capitalize">{link}&nbsp;</span> Categories
        </Link>
      </div>

      <div className="flex flex-col px-4 sm:px-6 md:px-12 lg:px-24 gap-8 sm:gap-12 md:gap-16 lg:gap-20  py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="h4 text-brand-raiden-800 text-center sm:text-left">
          {categoryName}
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6 md:gap-8 lg:gap-10 justify-items-center">
          {subCategories.map((eachCategory) => (
            <Link
              href={`/${category}/${eachCategory.slug}`}
              key={eachCategory.id}
              className="group flex flex-col shadow-sm items-center px-3 sm:px-4 py-3 sm:py-4 rounded-2xl gap-3 sm:gap-4 justify-center bg-white w-full max-w-[120px] sm:max-w-[140px] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-12 w-20 sm:h-16 sm:w-24 transition-transform duration-300 ease-out group-hover:scale-110">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${eachCategory.icon}`}
                  fill
                  alt={eachCategory.slug}
                  className="object-contain"
                />
              </div>
              <div className="text-center w-full overflow-hidden">
                <div className="font-general-sans text-[11px] sm:text-[12px] font-bold break-words transition-colors duration-300 group-hover:text-brand-raiden-500">
                  {eachCategory.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
