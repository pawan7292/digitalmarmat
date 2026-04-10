import Image from "next/image";
import { getProducts } from "@/lib/fetches/product";
import { ProductType } from "@/lib/types/product";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default async function MostPopularProduct() {
  const returnedProducts = await getProducts({});

  const products: ProductType[] = returnedProducts?.data || [];
  return (
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4 sm:px-6 md:px-12 lg:px-24 w-full">
      <div className="h5 flex items-center gap-8 text-brand-raiden-500">
        <div>Most Popular Products</div>
        <Link href={"/all-products"} className="hover:text-brand-raiden-700">
          <FaArrowRight />
        </Link>
      </div>
      <div className="relative">
        <div className="absolute left-1 top-1/2 -translate-y-1/2 z-10 md:hidden bg-white/90 backdrop-blur shadow-lg rounded-full p-2">
          <ChevronLeft size={18} />
        </div>

        {/* right arrow */}
        <div className="absolute right-1 top-1/2 -translate-y-1/2 z-10 md:hidden bg-white/90 backdrop-blur shadow-lg rounded-full p-2">
          <ChevronRight size={18} />
        </div>

        <div className="flex md:grid flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible gap-2 sm:gap-3 md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 scroll-smooth snap-x snap-mandatory pb-2">
          {products.slice(0, 5).map((eachProduct, index) => {
            return (
              <Link
                href={`/product-details/${eachProduct.slug}`}
                key={`${eachProduct.id}-${index}`}
                className="group min-w-[200px] sm:min-w-[220px] md:min-w-0 snap-start rounded-lg shadow-sm overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md"
              >
                {/* Image */}
                <div className="relative h-32 sm:h-40 md:h-48 w-full bg-gray-100 overflow-hidden">
                  <Image
                    alt={eachProduct.slug}
                    src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${eachProduct.images[0]}`}
                    fill
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-2 sm:p-3">
                  <div className="font-bold line-clamp-1 text-xs sm:text-sm transition-colors duration-300 group-hover:text-brand-raiden-500">
                    {eachProduct.name}
                  </div>

                  <div className="flex gap-1 text-[10px] sm:text-xs mt-1">
                    <div className="flex flex-col">
                      <div className="text-gray-500">{eachProduct.model}</div>
                      <div className="font-semibold text-brand-raiden-500">
                        Rs.{" "}
                        {Number(eachProduct.price) -
                          Number(
                            (Number(eachProduct.price) *
                              Number(eachProduct.discount)) /
                              100,
                          )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-red-500 font-bold">
                        {Number(eachProduct.discount)}%
                      </div>
                      <del className="text-gray-500 text-[8px]">
                        Rs. {Number(eachProduct.price)}
                      </del>
                    </div>
                  </div>

                  <div className="line-clamp-1 text-gray-500 text-[8px] sm:text-[9px] mt-1">
                    {eachProduct.seo_description}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
