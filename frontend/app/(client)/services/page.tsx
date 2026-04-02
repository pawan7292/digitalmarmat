import ChooseServiceCategory from "@/components/homepage/choose/ChooseServiceCategory";
import MostPopularService from "@/components/homepage/MostPopularService";
import { getServices } from "@/lib/fetches/service";
import { ServiceType } from "@/lib/types/service";

export default async function AllServices() {
  const returnedServices = await getServices({
    sort: "most_viewed",
  });
  // const services: ServiceType[] = returnedServices?.data || [];
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 py-8 sm:gap-16 sm:py-12 md:py-16">
      <ChooseServiceCategory />
      <MostPopularService />
    </div>
  );
}
