import { ProductType } from "@/lib/types/product";
import Image from "next/image";
import Link from "next/link";

export default async function MostPopularProduct({
  products,
}: {
  products: ProductType[];
}) {
  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      <div className="flex flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-12 lg:px-24">
        <div className="bodyheading text-brand-raiden-500">Most Popular Products</div>
        <Link
          href="/all-products"
          className="text-sm font-medium text-brand-raiden-600 hover:underline"
        >
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 sm:gap-4 md:grid-cols-4 md:px-12 lg:px-24">
        {products.slice(0, 4).map((eachProduct, index) => {
          return (
            <Link
              href={`/product-details/${eachProduct.slug}`}
              key={`${eachProduct.id}-${index}`}
              className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:border-brand-raiden-200 hover:shadow-md"
            >
              <div className="relative aspect-square w-full bg-gray-50">
                <Image
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  alt={eachProduct.name}
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${eachProduct.images[0]}`}
                  sizes="(max-width:768px) 50vw, 25vw"
                />
              </div>
              <div className="line-clamp-2 px-3 py-3 text-center text-xs font-semibold leading-snug text-gray-900 sm:text-sm">
                {eachProduct.name}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
