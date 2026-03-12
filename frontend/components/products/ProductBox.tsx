import { ServiceType } from "@/lib/types/service";
import { Button } from "../ui/button";
import { MapPinned } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";

export default function ProductBox({ service }: { service: ServiceType }) {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden flex flex-col bg-white hover:shadow-lg">
      <div
        className="h-40 overflow-hidden bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: `url('${process.env.NEXT_PUBLIC_API_URL}/storage/${service.images[0]}')`,
        }}
      >
        <Badge className="m-2">{service.category}</Badge>
      </div>

      <div className="px-4 flex py-4 flex-col gap-2 flex-1">
        <h3 className="font-semibold text-lg w-64 overflow-hidden">
          {service.name}
        </h3>

        <div className="flex gap-1 items-center text-sm">
          <MapPinned size={"12"} />
          <div className="text-gray-600 text-xs">{service.location}</div>{" "}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">Price: {service.price}</div>
          <Link href={`/products/${service.slug}`}>
            <Button>Book Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
