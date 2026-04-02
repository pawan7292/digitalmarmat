import { ProductType } from "@/lib/types/product";
import Image from "next/image";
import Link from "next/link";

export default async function ProductResult({
  products,
}: {
  products: ProductType[];
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/80 px-6 py-12 text-center text-sm text-gray-600">
        No products match your filters. Try adjusting filters or search.
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
          <Link
            href={`/product-details/${eachProduct.slug}`}
            key={`${eachProduct.id}-${index}`}
            className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-brand-raiden-200 hover:shadow-md"
          >
            <div className="relative aspect-square w-full bg-gray-50">
              <Image
                fill
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
                alt={eachProduct.name}
                src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${eachProduct.images[0]}`}
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
              <div className="text-center text-[11px] font-medium uppercase tracking-wide text-brand-raiden-600">
                {eachProduct?.category?.name ?? "—"}
              </div>
              <div className="line-clamp-2 min-h-[2.75rem] text-center text-sm font-semibold leading-snug text-gray-900 group-hover:text-brand-raiden-700">
                {eachProduct.name}
              </div>
              <div className="mt-auto flex flex-wrap items-baseline justify-center gap-2 text-sm">
                <span className="font-semibold text-brand-raiden-600">
                  Rs. {Math.round(finalPrice).toLocaleString()}
                </span>
                {Number(eachProduct.discount) > 0 && (
                  <span className="text-xs text-gray-400 line-through">
                    Rs. {Number(eachProduct.price).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
