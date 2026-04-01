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
    <div className="flex flex-col w-4/5 gap-12">
      <div className="bodyheading text-brand-raiden-500">{service.name}</div>
      <div className="flex items-stretch gap-8">
        <ServiceImageGallery images={service.images} name={service.name} />
        <ServiceQuickDetails service={service} />
      </div>
      <div>
        <ServiceTabs
          description={service.description}
          reviews={service.ratings}
          avgRating={service.avg_rating}
        />
      </div>
    </div>
  );
}
