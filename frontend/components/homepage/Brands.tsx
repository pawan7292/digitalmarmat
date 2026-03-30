import { brandDetails } from "@/lib/data/brands";
import Image from "next/image";

export default async function BrandComponent() {
  return (
    <div className="flex flex-col items-center">
      <div className="h4 text-brand-raiden-500">Brands</div>

      <div className="flex w-full gap-4 md:gap-8 overflow-x-auto px-2 md:px-0 justify-center">
        {brandDetails.map((eachBrand) => {
          return (
            <div
              className="relative aspect-square min-w-[120px] sm:min-w-[160px] md:min-w-[200px]"
              key={eachBrand.name}
            >
              <Image
                src={eachBrand.image}
                alt={eachBrand.name}
                fill
                className="object-contain"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
