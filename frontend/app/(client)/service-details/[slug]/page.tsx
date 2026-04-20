import ServiceBookingComponent from "@/components/serviceDetails/ServiceBooking";
import ServiceDetailsComponent from "@/components/serviceDetails/ServiceDetails";
import { getServiceDetail } from "@/lib/fetches/service";
import { ServiceDetailsType } from "@/lib/types/service";
import { Metadata, ResolvingMetadata } from "next";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const returnedServiceDetails: ServiceDetailsType =
    await getServiceDetail(slug);
  const service = returnedServiceDetails;
  console.log(service.seo_tags);
  return {
    title: service.seo_title,
    description: service.seo_description,
    keywords: service.seo_tags,
  };
}

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
    <div className="flex w-full min-w-0 flex-col gap-8 font-general-sans py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-12 lg:px-24 lg:flex-row lg:items-start lg:gap-10">
      <div className="min-w-0 flex-1">
        <ServiceDetailsComponent service={service} />
      </div>
      <div className="w-full shrink-0 lg:sticky lg:top-24 lg:w-[min(100%,22rem)]">
        <ServiceBookingComponent
          slots={service.slots}
          slug={slug}
          service={service}
        />
      </div>
    </div>
  );
}
