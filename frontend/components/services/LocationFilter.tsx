import { GetLocationType } from "@/lib/types/location";
import { Checkbox } from "../ui/checkbox";
import { ServiceQueryParams } from "@/lib/types/service";
import { getLocations } from "@/lib/fetches/location";
import Link from "next/link";

export default async function LocationFilter({
  params,
}: {
  params: ServiceQueryParams;
}) {
  const returnedLocation = await getLocations();
  const locations = returnedLocation.locations || [];
  console.log(locations);
  return (
    <div className="flex flex-col gap-2">
      <div>Filter by Location</div>
      <div className="flex flex-col gap-1">
        {locations.map((eachLocation: GetLocationType) => {
          const newParams = { ...params, location: eachLocation.city };
          const queryString = new URLSearchParams(newParams as any).toString();
          return (
            <Link
              href={`/services?${queryString}`}
              key={eachLocation.city}
              className="flex items-center gap-2"
            >
              <Checkbox checked={params.location === eachLocation.city} />
              <span className="text-sm">
                {eachLocation.city}, {eachLocation.country}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
