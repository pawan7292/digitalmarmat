import ServiceBookingComponent from "@/components/serviceDetails/ServiceBooking";
import ServiceDetailsComponent from "@/components/serviceDetails/ServiceDetails";
import GetRatingStar from "@/components/ui/getRating";
import { getServiceDetail } from "@/lib/fetches/service";
import { ServiceDetailsType } from "@/lib/types/service";
import Image from "next/image";

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const returnedServiceDetails: ServiceDetailsType =
    await getServiceDetail(slug);
  const service = returnedServiceDetails;

  return (
    <div className="flex w-full font-general-sans py-12 px-24">
      <ServiceDetailsComponent service={service} />
      <ServiceBookingComponent slots={service.slots}/>
    </div>
  );
}
