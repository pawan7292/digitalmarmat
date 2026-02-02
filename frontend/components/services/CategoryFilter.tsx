import { GetCategoryType } from "@/lib/types/category";
import { Checkbox } from "../ui/checkbox";
import { useGetAllCategories } from "@/hooks/useCategories";

export default function CategoryFilter({
  category,
  setCategory,
}: {
  category: number | undefined;
  setCategory: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
  const { data: getCategories, isLoading } = useGetAllCategories();
  const categoriesData = getCategories?.data || [];

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col gap-2">
      <div>Filter by Category</div>
      <div className="flex flex-col gap-1">
        {categoriesData.map((eachCategory: GetCategoryType) => (
          <div key={eachCategory.id} className="flex items-center gap-2">
            <Checkbox
              checked={category === eachCategory.id}
              onCheckedChange={(checked) => {
                setCategory(checked ? eachCategory.id : undefined);
              }}
            />
            <span className="text-sm">
              {eachCategory.name} ({eachCategory.services_count})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
