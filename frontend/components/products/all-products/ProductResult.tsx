import { ProductType } from "@/lib/types/product";
import Image from "next/image";
import Link from "next/link";
import { PackageOpen } from "lucide-react";
import ProductCard from "@/components/homepage/ProductBox";

export default async function ProductResult({
  products,
}: {
  products: ProductType[];
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50/80 px-6 py-12 min-h-96 flex flex-col items-center justify-center gap-4 text-center">
        <div className="bg-gray-100 rounded-full p-6 sm:p-8">
          <PackageOpen className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            No Products Found
          </h3>
          <p className="text-sm text-gray-600">
            We couldn't find any products matching your filters.
          </p>
        </div>
        <Link
          href="/all-products"
          className="mt-4 px-6 py-2.5 bg-brand-raiden-600 text-white rounded-lg font-medium hover:bg-brand-raiden-700 transition duration-200 text-sm"
        >
          Reset Filters
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((eachProduct, index) => {
        const finalPrice =
          Number(eachProduct.price) -
          (Number(eachProduct.discount) / 100) * Number(eachProduct.price);

        return (
            <ProductCard
              key={`${eachProduct.id}-${index}`}
              product={eachProduct}
            />
        );
      })}
    </div>
  );
}
