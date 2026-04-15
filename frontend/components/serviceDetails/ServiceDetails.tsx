import { ServiceDetailsType } from "@/lib/types/service";

import ServiceImageGallery from "./ImageCollection";
import ServiceQuickDetails from "./ServiceQuickDetails";
import ServiceTabs from "./ServiceTabs";

export default async function ServiceDetailsComponent({
  service,
}: {
  service: ServiceDetailsType;
}) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12">
      <div className="bodyheading text-brand-raiden-500 break-words">
        {service.name}
      </div>
      <div className="flex flex-col items-stretch gap-6 lg:flex-row lg:gap-8 xl:gap-10">
        <ServiceImageGallery images={service.images} name={service.name} />
        <ServiceQuickDetails service={service} />
      </div>
      <div>
        <ServiceTabs
          description={service.description}
          reviews={service.ratings}
          avgRating={service.avg_rating}
          slug={service.slug}
        />
      </div>
    </div>
  );
}
