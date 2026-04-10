import { GetLocationType } from "@/lib/types/location";
import { Checkbox } from "../ui/checkbox";
import { ServiceQueryParams } from "@/lib/types/service";
import { getLocations } from "@/lib/fetches/filters";
import Link from "next/link";

export default async function LocationFilter({
  params,
  category,
}: {
  params: ServiceQueryParams;
  category: string;
}) {
  const returnedLocation = await getLocations();
  const locations = returnedLocation.locations || [];
  const resetLocation = { ...params };
  delete resetLocation.location;
  const resetLocationQuery = new URLSearchParams(
    resetLocation as any,
  ).toString();
  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold">Location</div>
      <div className="flex flex-col gap-1">
        {locations.map((eachLocation: GetLocationType) => {
          const newParams = { ...params, location: eachLocation.city };
          const queryString = new URLSearchParams(newParams as any).toString();
          return (
            <Link
              href={`/${category}?${queryString}`}
              key={eachLocation.city}
              className="flex items-center gap-2"
            >
              <Checkbox checked={params?.location === eachLocation.city} />
              <span className="text-sm">
                {eachLocation.city}, {eachLocation.country}
              </span>
            </Link>
          );
        })}
      </div>
      <Link
        href={`/${category}?${resetLocationQuery}`}
        className="text-brand-raiden-500 text-[15px] hover:underline hover:cursor-pointer"
      >
        Reset Location
      </Link>
    </div>
  );
}
