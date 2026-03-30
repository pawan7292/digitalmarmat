import ChooseProductCategory from "@/components/homepage/choose/ChooseProductCategory";
import MostPopularProduct from "@/components/services/MostPopularProduct";
import { getProducts } from "@/lib/fetches/product";
import { ProductType } from "@/lib/types/product";

export default async function AllProducts() {
  const returnedProducts = await getProducts({});
  const products: ProductType[] = returnedProducts?.data || [];
  return (
    <div className="flex flex-col gap-20 py-12 justify-center">
      <ChooseProductCategory />
      <MostPopularProduct products={products} />
    </div>
  );
}
