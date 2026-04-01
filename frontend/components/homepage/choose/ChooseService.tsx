import { getServiceCategories } from "@/lib/fetches/category";
import { GetCategoryType } from "@/lib/types/category";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default async function ChooseServiceComponent() {
  const returnedCategories = await getServiceCategories();
  const categories = returnedCategories?.data || [];
  return (
    <div className="px-24 flex flex-col gap-12">
      <div className="h5 flex items-center gap-8 text-brand-raiden-500">
        <div>Choose Your Service</div>
        <div>
          <FaArrowRight />
        </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        {categories.map((eachCategory: GetCategoryType) => {
          return (
            <Link
              href={`services/${eachCategory.slug}`}
              key={eachCategory.id}
              className="flex flex-col items-center hover:underline hover:cursor-pointer px-4 py-2 shadow-sm rounded-2xl"
            >
              <div className="text-center">
                <div className="font-general-sans text-[14px]">
                  {eachCategory.name}
                </div>
                <div className="text-[9px]">
                  {eachCategory.services_count} services
                </div>
              </div>

              <div className="relative h-20 w-20">
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
