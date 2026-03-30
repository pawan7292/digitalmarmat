import { getProductCategories } from "@/lib/fetches/category";
import { GetCategoryType } from "@/lib/types/category";
import Image from "next/image";
import Link from "next/link";

export default async function ChooseProductComponent() {
  const returnedCategories = await getProductCategories();
  const categories = returnedCategories?.data || [];
  return (
    <div className="flex flex-col gap-20">
      <div className="h4 text-center text-brand-raiden-500">
        Choose Your Product
      </div>
      <div className="flex gap-16 flex-wrap justify-center">
        {categories.map((eachCategory: GetCategoryType) => {
          return (
            <Link
              href={`/products/${eachCategory.slug}`}
              key={eachCategory.id}
              className="flex flex-col items-center hover:underline hover:cursor-pointer px-4 py-2 shadow-sm rounded-2xl"
            >
              <div className="text-center">
                <div className="body">{eachCategory.name}</div>
                {/* <div className="small">
                  {eachCategory.services_count} services
                </div> */}
              </div>

              <div className="relative h-40 w-40">
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
