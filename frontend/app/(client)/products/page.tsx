import ChooseProductCategory from "@/components/homepage/choose/ChooseProductCategory";
import MostPopularProduct from "@/components/services/MostPopularProduct";
import { getProducts } from "@/lib/fetches/product";
import { ProductType } from "@/lib/types/product";

export default async function AllProducts() {
  const returnedProducts = await getProducts({});
  const products: ProductType[] = returnedProducts?.data || [];
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 py-8 sm:gap-16 sm:py-12 md:py-16">
      <ChooseProductCategory />
      <MostPopularProduct products={products} />
    </div>
  );
}
