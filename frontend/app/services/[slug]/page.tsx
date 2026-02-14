import { Badge } from "@/components/ui/badge";
import { ServiceType } from "@/lib/types/service";
import { ViewIcon } from "lucide-react";
import ImageCollection from "@/components/services/details/ImageCollection";
import { Button } from "@/components/ui/button";

const getServiceDetail = async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/services/${slug}`,
    {
      headers: {
        accept: "application/json",
      },
      next: { revalidate: 3600 },
    },
  );
  const serviceData = await response.json();
  return serviceData.data;
};

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
      <div className="flex flex-col shadow-sm rounded-md items-center px-4 justify-start sticky top-24">
        <div>{serviceData.price}</div>
        <div>{serviceData.price_type}</div>
        <Button>Book Now</Button>
      </div>
    </div>
  );
}
