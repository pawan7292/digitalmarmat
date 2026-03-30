import { ProductType } from "@/lib/types/product";
import Image from "next/image";
import Link from "next/link";

export default async function MostPopularProduct({
  products,
}: {
  products: ProductType[];
}) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center justify-between px-24">
        <div className="bodyheading text-brand-raiden-500">
          Most Popular Products
        </div>

        <Link
          href="/all-products"
          className="text-brand-raiden-500 hover:underline font-medium text-sm"
        >
          View More →
        </Link>
      </div>
      <div className="flex flex-col px-24 w-full font-general-sans">
        <div className="flex flex-wrap gap-2 justify-center w-full">
          {products.slice(0, 4).map((eachProduct, index) => {
            return (
              <div
                key={`${eachProduct.id}-${index}`}
                className="rounded-2xl shadow-sm w-1/5 pb-4"
              >
                <div className="relative w-full aspect-square border-1 rounded-t-2xl">
                  <Image
                    fill
                    className="object-cover rounded-t-2xl"
                    alt={eachProduct.name}
                    src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${eachProduct.images[0]}`}
                  />
                </div>
                <div className="px-4 text-[20px]">{eachProduct.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
