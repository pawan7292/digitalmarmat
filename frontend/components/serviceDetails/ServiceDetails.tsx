import { ServiceDetailsType } from "@/lib/types/service";

import ServiceImageGallery from "./ImageCollection";
import ServiceQuickDetails from "./ServiceQuickDetails";

/** Hero: title, gallery, quick facts (tabs + booking are composed on the page for responsive order). */
export default async function ServiceDetailsComponent({
  service,
}: {
  service: ServiceDetailsType;
}) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10">
      <h1 className="font-general-sans font-bold leading-snug tracking-tight text-brand-raiden-500 break-words text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.75rem] xl:leading-tight">
        {service.name}
      </h1>
      <div className="flex flex-col items-stretch gap-4 sm:gap-6 lg:flex-row lg:gap-8 xl:gap-10">
        <ServiceImageGallery images={service.images} name={service.name} />
        <ServiceQuickDetails service={service} />
      </div>
    </div>
  );
}
