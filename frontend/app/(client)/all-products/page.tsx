import AllProducts from "@/components/products/all-products/AllProducts";
import { ProductQueryParams } from "@/lib/types/product";

export default async function AllProductsPage({
  searchParams,
}: {
  searchParams: Promise<ProductQueryParams>;
}) {
  return <AllProducts searchParams={searchParams} />;
}
