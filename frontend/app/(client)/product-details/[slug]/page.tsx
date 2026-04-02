import ProductDetail from "@/components/products/ProductDetailsPage";
import { getProductDetails } from "@/lib/fetches/product";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const returnedProduct = await getProductDetails(slug);
  const product = (returnedProduct.data || {})
  return (
    <div>
      <div><ProductDetail product={product}/></div>
    </div>
  );
}
