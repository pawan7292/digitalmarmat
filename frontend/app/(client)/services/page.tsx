import ChooseServiceCategory from "@/components/homepage/choose/ChooseServiceCategory";
import MostPopularService from "@/components/services/MostPopularService";
import { getServices } from "@/lib/fetches/service";
import { ServiceType } from "@/lib/types/service";

export default async function AllServices() {
  const returnedServices = await getServices({
    sort: "most_viewed",
  });
  const services: ServiceType[] = returnedServices?.data || [];
  return (
    <div className="flex flex-col gap-20 py-12 justify-center">
      <ChooseServiceCategory />
      <MostPopularService services={services} />
    </div>
  );
}
