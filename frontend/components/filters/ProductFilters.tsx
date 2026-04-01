import { ProductQueryParams } from "@/lib/types/product";
import ProductBrandFilter from "./ProductBrandFilter";
import ProductWarrantyFilter from "./ProductWarrantyFilter";
import ProductCategoryFilter from "./ProductCategoryFilter";

export default async function ProductFilterComponent({
  params,
  slug,
}: {
  params: ProductQueryParams;
  slug: string;
}) {
  return (
    <div className="flex flex-col gap-8 w-1/6 border-b border-black sticky top-32 py-8 self-start px-4">
      <ProductCategoryFilter params={params} slug={slug} />
      <ProductBrandFilter params={params} category={slug} />
      <ProductWarrantyFilter params={params} category={slug} />
    </div>
  );
}
