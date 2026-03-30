import { getProductCategories } from "@/lib/fetches/category";
import { GetCategoryType } from "@/lib/types/category";
import Image from "next/image";
import Link from "next/link";

export default async function ChooseProductCategory() {
  const returnedCategories = await getProductCategories();
  const categories = returnedCategories?.data || [];
  return (
    <div className="flex flex-col gap-12">
      <div className="h4 text-center text-brand-raiden-500">
        Choose Your Product
      </div>
      <div className="flex gap-16 overflow-x-auto px-24 py-2 font-general-sans">
        {categories.map((eachCategory: GetCategoryType) => {
          return (
            <Link
              href={`products/${eachCategory.slug}`}
              key={eachCategory.id}
              className="flex flex-col items-center px-2 shrink-0 hover:underline hover:cursor-pointer py-2 shadow-sm rounded-2xl"
            >
              <div className="text-center">
                <div className="text-[15px] font-">{eachCategory.name}</div>

              </div>

              <div className="relative h-25 w-25">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${eachCategory.icon}`}
                  fill
                  alt={eachCategory.slug}
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
