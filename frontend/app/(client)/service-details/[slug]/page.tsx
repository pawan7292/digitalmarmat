import ServiceBookingComponent from "@/components/serviceDetails/ServiceBooking";
import ServiceBookingMobileBar from "@/components/serviceDetails/ServiceBookingMobileBar";
import ServiceDetailsComponent from "@/components/serviceDetails/ServiceDetails";
import ServiceTabs from "@/components/serviceDetails/ServiceTabs";
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
    <div className="mb-6 min-w-0 px-4 py-6 font-general-sans sm:mb-8 sm:px-6 sm:py-8 md:px-12 md:py-10 lg:mb-12 lg:px-24 lg:py-12">
      {/*
        Mobile: title → gallery → booking → description/reviews (booking before long content).
        Desktop: left column = title + tabs, right = sticky booking.
      */}
      <div className="mx-auto grid w-full max-w-[100rem] grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_min(100%,22rem)] lg:gap-x-10 lg:gap-y-8">
        <div className="order-1 min-w-0 lg:col-start-1 lg:row-start-1">
          <ServiceDetailsComponent service={service} />
        </div>

        <aside
          id="service-booking"
          className="order-2 w-full min-w-0 shrink-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-start lg:sticky lg:top-24"
        >
          <ServiceBookingComponent
            slots={service.slots}
            slug={slug}
            service={service}
          />
        </aside>

        <div className="order-3 min-w-0 pb-24 lg:col-start-1 lg:row-start-2 lg:pb-0">
          <ServiceTabs
            description={service.description}
            reviews={service.ratings}
            avgRating={service.avg_rating}
            slug={service.slug}
          />
        </div>
      </div>
      <ServiceBookingMobileBar />
    </div>
  );
}
