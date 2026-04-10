import { ServiceDetailsType } from "@/lib/types/service";
import { MapPinned } from "lucide-react";
import { Badge } from "../ui/badge";

export default function ServiceBox({
  service,
}: {
  service: ServiceDetailsType;
}) {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden flex flex-col bg-white hover:shadow-lg">
      <div
        className="h-40 overflow-hidden bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: `url('${service.images[0]}')` }}
      >
        <Badge className="m-2">{service.category.name}</Badge>
      </div>

      <div className="px-4 flex py-4 flex-col gap-2 flex-1">
        <h3 className="font-semibold text-lg w-64 overflow-hidden">
          {service.name}
        </h3>

        <div className="flex gap-1 items-center text-sm">
          <MapPinned size={"12"} />
          <div className="text-gray-600 text-xs">{service.location}</div>{" "}
        </div>
      </div>
    </div>
  );
}
