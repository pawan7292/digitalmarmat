import { GetCategoryType } from "@/lib/types/category";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { ServiceQueryParams } from "@/lib/types/service";
import { getCategories } from "@/lib/fetches/category";

export default async function CategoryFilter({
  params,
}: {
  params: ServiceQueryParams;
}) {
  const returnedCategories = await getCategories();
  const categories = returnedCategories.data || [];
  return (
    <div className="flex flex-col gap-2">
      <div>Filter by Category</div>
      <div className="flex flex-col gap-1">
        {categories.map((eachCategory: GetCategoryType) => {
          const newParams = { ...params, category: eachCategory.id };
          const queryString = new URLSearchParams(newParams as any).toString();
          return (
            <Link
              href={`/services?${queryString}`}
              key={eachCategory.id}
              className="flex items-center gap-2"
            >
              <Checkbox checked={Number(params.category) === eachCategory.id} />
              <span className="text-sm">
                {eachCategory.name} ({eachCategory.services_count})
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
