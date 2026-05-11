import Image from "next/image";
import { getProducts } from "@/lib/fetches/product";
import { ProductType } from "@/lib/types/product";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import ProductCard from "./ProductBox";

export default async function MostPopularProduct() {
  const returnedProducts = await getProducts({});

  const products: ProductType[] = returnedProducts?.data || [];
  return (
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4 sm:px-6 md:px-12 lg:px-24 w-full">
      <Link
        href={"/all-products"}
        className="h5 flex items-center gap-2 text-brand-raiden-500 group w-fit"
      >
        <div className="relative inline-block">
          <span>Most Popular Products</span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-raiden-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </div>
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
      <div className="relative">
        <div className="absolute left-1 top-1/2 -translate-y-1/2 z-10 md:hidden bg-white/90 backdrop-blur shadow-lg rounded-full p-2">
          <ChevronLeft size={18} />
        </div>

        {/* right arrow */}
        <div className="absolute right-1 top-1/2 -translate-y-1/2 z-10 md:hidden bg-white/90 backdrop-blur shadow-lg rounded-full p-2">
          <ChevronRight size={18} />
        </div>

        <div className="flex md:grid flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible gap-2 sm:gap-3 md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 scroll-smooth snap-x snap-mandatory pb-2">
          {products.slice(0, 5).map((eachProduct, index) => (
            <ProductCard
              key={`${eachProduct.id}-${index}`}
              product={eachProduct}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
