import { getProductCategories } from "@/lib/fetches/category";
import { GetCategoryType } from "@/lib/types/category";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default async function ChooseProductComponent() {
  const returnedCategories = await getProductCategories();
  const categories = returnedCategories?.data || [];
  return (
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4 sm:px-6 md:px-12 lg:px-24">
      <Link
        href={"/products"}
        className="h5 flex items-center gap-2 text-brand-raiden-500 group w-fit"
      >
        <div className="relative inline-block">
          <span>Choose Your Product</span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-raiden-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </div>
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
        {categories.map((eachCategory: GetCategoryType) => {
          return (
            <Link
              href={`/products/${eachCategory.slug}`}
              key={eachCategory.id}
              className="group flex flex-col items-center px-2 py-2 shadow-sm rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-12 sm:h-14 md:h-16 lg:h-20 w-12 sm:w-14 md:w-16 lg:w-20 mt-1 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${eachCategory.icon}`}
                  fill
                  alt={eachCategory.slug}
                  className="object-contain"
                />
              </div>
              <div className="text-center">
                <div className="font-general-sans text-[11px] sm:text-[12px] md:text-[13px] lg:text-[15px] transition-colors group-hover:text-brand-raiden-500">
                  {eachCategory.name}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
