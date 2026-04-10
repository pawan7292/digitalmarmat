import ProductDetail from "@/components/products/ProductDetailsPage";
import { getProductDetails } from "@/lib/fetches/product";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const returnedServiceDetails: any = await getProductDetails(slug);
  const service = returnedServiceDetails;
  return {
    title: service?.data.seo_title,
    description: service?.data.seo_description,
    keywords: service?.data.seo_tags || ['digital marmat'],
  };
}
export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const returnedProduct = await getProductDetails(slug);
  const product = returnedProduct.data || {};
  return (
    <div>
      <div>
        <ProductDetail product={product} />
      </div>
    </div>
  );
}
