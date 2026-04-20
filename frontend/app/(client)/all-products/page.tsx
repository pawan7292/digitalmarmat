import AllProducts from "@/components/products/all-products/AllProducts";
import { ProductQueryParams } from "@/lib/types/product";

export const revalidate = 3600;

export default async function AllProductsPage({
  searchParams,
}: {
  searchParams: Promise<ProductQueryParams>;
}) {
  return <AllProducts searchParams={searchParams} />;
}
