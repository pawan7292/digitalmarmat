import { getServiceCategories } from "@/lib/fetches/category";
import { GetCategoryType } from "@/lib/types/category";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default async function ChooseServiceComponent() {
  const returnedCategories = await getServiceCategories();
  const categories = returnedCategories?.data || [];
  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-24 flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12">
      <div className="h5 flex items-center gap-8 text-brand-raiden-500">
        <div>Choose Your Service</div>
        <Link href={"/services"} className="hover:text-brand-raiden-700">
          <FaArrowRight />
        </Link>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
        {categories.slice(0, 6).map((eachCategory: GetCategoryType) => {
          return (
            <Link
              href={`services/${eachCategory.slug}`}
              key={eachCategory.id}
              className="flex flex-col items-center hover:underline hover:cursor-pointer px-2 py-2 shadow-sm rounded-xl"
            >
              <div className="text-center">
                <div className="font-general-sans text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px]">
                  {eachCategory.name}
                </div>
                <div className="text-[8px] sm:text-[9px] text-gray-600">
                  {eachCategory.services_count}
                </div>
              </div>

              <div className="relative h-14 sm:h-16 md:h-16 lg:h-20 w-12 sm:w-14 md:w-16 lg:w-20 mt-1">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${eachCategory.icon}`}
                  fill
                  alt={eachCategory.slug}
                  className="object-contain"
                ></Image>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
