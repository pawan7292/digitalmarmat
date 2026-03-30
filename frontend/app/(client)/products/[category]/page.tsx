import { getSubCategories } from "@/lib/fetches/category";
import { getProducts } from "@/lib/fetches/product";
import { GetCategoryType } from "@/lib/types/category";
import { ProductType } from "@/lib/types/product";

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const returnedSubCategory = await getSubCategories(category);
  const sub_categories: GetCategoryType[] =
    returnedSubCategory?.sub_categories || [];

  const returnedProducts = await getProducts();
  const products: ProductType[] = returnedProducts?.data || [];

  return (
    <div>
      <div>
        {sub_categories.map((eachSubcategory) => {
          return <div key={eachSubcategory.id}>{eachSubcategory.name}</div>;
        })}
      </div>
      <div>
        {products.map((eachProduct, index) => {
          return (
            <div key={`${eachProduct.id}-${index}`}>{eachProduct.name}</div>
          );
        })}
      </div>
    </div>
  );
}
