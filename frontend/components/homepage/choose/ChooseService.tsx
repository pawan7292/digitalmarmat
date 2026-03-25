import { getServiceCategories } from "@/lib/fetches/category";
import { GetCategoryType } from "@/lib/types/category";
import Image from "next/image";

export default async function ChooseServiceComponent() {
  const returnedCategories = await getServiceCategories();
  const categories = returnedCategories?.data || [];
  return (
    <div className="flex flex-col gap-20">
      <div className="h4 text-center text-brand-raiden-500">Choose Your Service</div>
      <div className="flex gap-16 flex-wrap justify-center">
        {categories.map((eachCategory: GetCategoryType) => {
          return (
            <div
              key={eachCategory.id}
              className="flex flex-col items-center hover:underline hover:cursor-pointer px-4 py-2 shadow-sm rounded-2xl"
            >
              <div className="text-center">
                <div className="body">{eachCategory.name}</div>
                <div className="small">
                  {eachCategory.services_count} services
                </div>
              </div>

              <div className="relative h-40 w-40">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${eachCategory.icon}`}
                  fill
                  alt={eachCategory.slug}
                  className="object-contain"
                ></Image>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
