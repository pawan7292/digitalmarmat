import ServiceBox from "@/components/services/ServiceBox";
import ServiceFilter from "@/components/services/ServiceFilter";
import ServicePagination from "@/components/services/ServicePagination";
import ServiceSearchByName from "@/components/services/ServiceSearchByName";
import ServiceSort from "@/components/services/ServiceSort";
import { getServices } from "@/lib/fetches/service";
import { ServiceQueryParams, ServiceType } from "@/lib/types/service";

import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<ServiceQueryParams>;
}): Promise<Metadata> {
  const category = (await searchParams).category;
  const location = (await searchParams).location;
  const name = (await searchParams).name;

  let title = "All Services | Digital Marmat";
  let description =
    "Browse appliance repair and home services across Nepal. AC repair, installation, washing machine repair and more.";

  if (name) {
    title = `${name} Services | Digital Marmat`;
    description = `Search results for ${name} services on Digital Marmat.`;
  }

  if (category) {
    title = `${category}`;
    if (category == 1) {
      title = `AC Services | Digital Marmat`;
      description = `Find AC related repair and installation services on Digital Marmat.`;
    }
    if (category == 9) {
      title = `Electrical Services | Digital Marmat`;
      description = `Find Electrical related repair and installation services on Digital Marmat.`;
    }
    if (category == 23) {
      title = `Washing Machine Services | Digital Marmat`;
      description = `Find Washing Machine related repair and installation services on Digital Marmat.`;
    }
    if (category == 28) {
      title = `Fridge Services | Digital Marmat`;
      description = `Find Fridge related repair and installation services on Digital Marmat.`;
    }
  }

  if (category && location) {
    title = `${category} Services in ${location} | Digital Marmat`;
    description = `Find ${category} repair and installation services available in ${location}.`;
  }

  if (!category && location) {
    title = `Services in ${location} | Digital Marmat`;
    description = `Browse appliance repair and home services available in ${location}.`;
  }

  return {
    title,
    description,
  };
}

export default async function Services({
  searchParams,
}: {
  searchParams: Promise<ServiceQueryParams>;
}) {
  const params: ServiceQueryParams = await searchParams;
  const returnedServices = await getServices(params);
  const services = returnedServices?.data || [];
  const links = returnedServices?.meta?.links || null;

  return (
    <div className="flex flex-col gap-2 min-h-screen gap-8 py-6">
      <div className="text-5xl font-bold text-center ">Services</div>
      <div className="self-end mr-24">
        <ServiceSort params={params} />
      </div>
      <div className="flex justify-center gap-4 px-4">
        <div className="w-1/4 flex flex-col gap-4">
          <ServiceFilter params={params} />
        </div>

        <div className="w-3/4 flex flex-col gap-4">
          <ServiceSearchByName name={params.name || ""} />
          <div className="rounded-md flex flex-wrap gap-4">
            {services.map((service: ServiceType) => {
              return <ServiceBox key={service.id} service={service} />;
            })}
          </div>
        </div>
      </div>
      <ServicePagination links={links} />
    </div>
  );
}
