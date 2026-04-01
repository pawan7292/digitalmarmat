import { brandDetails } from "@/lib/data/brands";
import Image from "next/image";

export default function BrandComponent() {
  const duplicated = [...brandDetails, ...brandDetails];

  return (
    <div className="flex flex-col gap-6 overflow-hidden">
      <div className="h5 text-brand-raiden-500">Available Brands</div>

      <div className="relative overflow-hidden">
        <div className="flex gap-8 animate-scroll w-max">
          {duplicated.map((eachBrand, index) => {
            return (
              <div
                className="relative aspect-square min-w-[140px]"
                key={index}
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
    </div>
  );
}