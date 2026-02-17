import { Badge } from "@/components/ui/badge";
import { ServiceType } from "@/lib/types/service";
import { ViewIcon } from "lucide-react";
import ImageCollection from "@/components/services/details/ImageCollection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServiceDetail } from "@/lib/fetches/service";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const serviceData: ServiceType = await getServiceDetail(slug);
  const includesArray = serviceData.include.split(",");
  return (
    <div className="flex justify-center px-12 py-8 gap-8 items-start">
      <div className="flex items-center flex-col rounded-md shadow-sm p-8 px-16 gap-4 max-w-2/3">
        <div className="flex flex-col gap-2">
          <div className="text-3xl font-bold">{serviceData.name}</div>
          <div className="flex justify-between w-full px-4 items-center">
            <div>{serviceData.location}</div>
            <Badge className="flex items-center gap-2" variant={"secondary"}>
              <ViewIcon size={"18"} />
              {serviceData.views}
            </Badge>
            <Badge variant={"outline"}>{serviceData.bookings} Bookings</Badge>
          </div>
        </div>

        <ImageCollection images={serviceData.images} />
        <div className="w-full flex flex-col gap-4">
          <div className="text-xl font-bold">Service Overview</div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Includes</div>
            <div className="flex flex-wrap gap-2 shadow-sm w-full justify-center rounded-md">
              {includesArray.map((include) => {
                return <Badge key={include}>{include}</Badge>;
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col  rounded-md items-center px-4 justify-start sticky top-24 gap-4 shadow-sm py-4">
        <div className="shadow-md text-3xl px-4 py-2 rounded-lg">
          {"Rs. "}
          {serviceData.price}
        </div>
        <div className="">Price Type: {serviceData.price_type}</div>
        <Link href={`/book/${serviceData.slug}`}>
          <Button size={"xl"} variant={"book"}>
            Book Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
