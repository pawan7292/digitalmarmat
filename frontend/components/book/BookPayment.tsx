import { ServiceType } from "@/lib/types/service";
import ServiceBox from "../services/ServiceBox";

export default function BookPayment({
  serviceData,
  onNext,
}: {
  serviceData: ServiceType;
  onNext: () => void;
}) {
  console.log(serviceData);
  return (
    <div>
      <ServiceBox service={serviceData} />
    </div>
  );
}
