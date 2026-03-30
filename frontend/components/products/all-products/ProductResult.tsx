import { ProductType } from "@/lib/types/product";
import Image from "next/image";

export default async function ProductResult({
  products,
}: {
  products: ProductType[];
}) {
  return (
    <div className="flex w-5/6 flex-wrap border-black border-l">
      {products.map((eachProduct, index) => {
        return (
          <div
            className="flex flex-col gap-8 items-center w-1/3 border-r border-b border-black py-8 hover:cursor-pointer"
            key={`${eachProduct.id}-${index}`}
          >
            <div className="relative w-4/6 aspect-square border-1">
              <Image
                fill
                className="object-cover"
                alt={eachProduct.name}
                src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${eachProduct.images[0]}`}
              />
            </div>
            <div>
              <div className="text-center text-[11px] font-medium text-brand-raiden-500">
                {eachProduct?.category?.name ?? "Not found"}
              </div>
              <div className="body text-center hover:underline">
                {eachProduct.name}
              </div>
            </div>

            <div className="flex flex-col items-center text-[20px] gap-2">
              <div className="flex gap-2">
                Rs.{" "}
                {Number(eachProduct.price) -
                  ((Number(eachProduct.discount) / 100) *
                    Number(eachProduct.price))}
                <span className="line-through text-gray-500">Rs. {eachProduct.price}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
