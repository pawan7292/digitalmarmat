import GetRatingStar from "@/components/ui/getRating";
import { ServiceType } from "@/lib/types/service";
import Image from "next/image";

export default async function ServicesResult({
  services,
}: {
  services: ServiceType[];
}) {
  return (
    <div className="flex w-5/6 flex-wrap border-black border-l">
      {services.map((eachService, index) => {
        return (
          <div
            className="flex flex-col gap-8 items-center w-1/3 border-r border-b border-black py-8 hover:cursor-pointer"
            key={`${eachService.id}-${index}`}
          >
            <div className="relative w-4/6 aspect-square border-1">
              <Image
                fill
                className="object-cover"
                alt={eachService.name}
                src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${eachService.images[0]}`}
              />
            </div>
            <div>
              <div className="text-center text-[11px] font-medium text-brand-raiden-500">
                {eachService?.category?.name ?? "Not found"}
              </div>
              <div className="body text-center hover:underline">
                {eachService.name}
              </div>
            </div>

            <div className="flex flex-col items-center text-[15px] gap-2">
              <div>Rs. {eachService.price}</div>
              <GetRatingStar rating={eachService.avg_rating} size={8} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
