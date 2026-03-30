import { getSubCategories } from "@/lib/fetches/category";
import { getServices } from "@/lib/fetches/service";
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
  console.log(category)
  return (
    <div className="flex flex-col px-24 gap-20 bg-gray-100 py-12">
      <div className="h4 text-brand-raiden-800">{categoryName}</div>
      <div className="flex gap-8 flex-wrap">
        {subCategories.map((eachCategory: GetCategoryType) => {
          return (
            <Link
              href={`/${category}/${eachCategory.slug}`}
              key={eachCategory.id}
              className="flex flex-col shadow-sm items-center hover:underline hover:cursor-pointer px-4 py-2 rounded-2xl gap-4 justify-center"
            >
              <div className="text-center max-w-48 overflow-hidden">
                <div className="font-general-sans text-[11.73px] font-bold break-words">
                  {eachCategory.name}
                </div>
              </div>

              <div className="relative h-16 w-32">
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
