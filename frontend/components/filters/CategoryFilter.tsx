import { GetCategoryType } from "@/lib/types/category";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { ServiceQueryParams } from "@/lib/types/service";
import { getServiceCategories } from "@/lib/fetches/category";

export default async function CategoryFilter({
  params,
  slug,
}: {
  params: ServiceQueryParams;
  slug: string;
}) {
  const returnedCategories = await getServiceCategories();
  const categories = returnedCategories.data || [];
  const resetCategory = { ...params };
  delete resetCategory.category;
  const resetCategoryQuery = new URLSearchParams(
    resetCategory as any,
  ).toString();
  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold">Choose Category</div>
      <div className="flex flex-col gap-1">
        {categories.map((eachCategory: GetCategoryType) => {
          const newParams = { ...params, category: eachCategory.slug };
          const queryString = new URLSearchParams(newParams as any).toString();
          return (
            <Link
              href={`/${slug}?${queryString}`}
              key={eachCategory.id}
              className="flex items-center gap-2"
            >
              <Checkbox checked={params.category === eachCategory.slug} />
              <span className="text-sm">
                {eachCategory.name} ({eachCategory.services_count})
              </span>
            </Link>
          );
        })}
      </div>
      <Link
        href={`${slug}?${resetCategoryQuery}`}
        className="text-brand-raiden-500 hover:underline hover:cursor-pointer"
      >
        Reset Category
      </Link>
    </div>
  );
}
