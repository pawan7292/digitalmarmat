import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/lib/types/product";

export default function ProductCard({
  product,
}: {
  product: ProductType;
}) {
  const discountedPrice =
    Number(product.price) -
    Number((Number(product.price) * Number(product.discount)) / 100);

  return (
    <Link
      href={`/product-details/${product.slug}`}
      className="
        group
        min-w-[200px] sm:min-w-[220px] md:min-w-0
        snap-start
        rounded-2xl
        border border-gray-200
        bg-white
        overflow-hidden
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:shadow-xl
        hover:border-brand-raiden-300
        flex flex-col
      "
    >
      {/* Image */}
      <div className="relative h-48 sm:h-40 md:h-48 w-full bg-gray-50 overflow-hidden">
        <Image
          alt={product.slug}
          src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${product.images[0]}`}
          fill
          className="object-contain transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col gap-2">
        <div className="font-bold line-clamp-2 text-xs sm:text-base transition-colors duration-300 group-hover:text-brand-raiden-500">
          {product.name}
        </div>

        <div className="flex justify-between items-end mt-1">
          <div className="flex flex-col gap-1">
            <div className="text-gray-500 text-xs">
              {product.model}
            </div>

            <div className="font-bold text-brand-raiden-500 text-lg">
              Rs. {discountedPrice}
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="text-red-500 font-bold text-sm">
              {Number(product.discount)}%
            </div>

            <del className="text-gray-400 text-xs">
              Rs. {Number(product.price)}
            </del>
          </div>
        </div>

        <div className="line-clamp-1 text-gray-500 text-[10px] sm:text-xs">
          {product.seo_description}
        </div>
      </div>
    </Link>
  );
}