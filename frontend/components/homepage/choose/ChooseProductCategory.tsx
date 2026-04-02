import { getProductCategories } from "@/lib/fetches/category";
import { GetCategoryType } from "@/lib/types/category";
import Image from "next/image";
import Link from "next/link";

export default async function ChooseProductCategory() {
  const returnedCategories = await getProductCategories();
  const categories = returnedCategories?.data || [];
  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      <div className="h4 px-4 text-center text-brand-raiden-500 sm:px-6 md:px-12 lg:px-24">
        Choose Your Product
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:px-12 lg:grid-cols-5 lg:gap-5 lg:px-24">
        {categories.map((eachCategory: GetCategoryType) => {
          return (
            <Link
              href={`/products/${eachCategory.slug}`}
              key={eachCategory.id}
              className="group flex min-w-0 flex-col items-center rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition hover:border-brand-raiden-300 hover:shadow-md sm:p-4"
            >
              <div className="text-center">
                <div className="text-xs font-semibold text-gray-900 sm:text-[15px]">
                  {eachCategory.name}
                </div>
              </div>
              <div className="relative mt-2 h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${eachCategory.icon}`}
                  fill
                  alt=""
                  className="object-contain"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
