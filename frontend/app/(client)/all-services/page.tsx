import AllServices from "@/components/services/all-services/AllServices";
import { ServiceQueryParams } from "@/lib/types/service";

export default async function AllServicesPage({
  searchParams,
}: {
  searchParams: Promise<ServiceQueryParams>;
}) {
  return <AllServices searchParams={searchParams} />;
}
