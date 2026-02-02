import { useGetallLocation } from "@/hooks/useLocations";
import { GetLocationType } from "@/lib/types/location";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";

export default function LocationFilter({
  location,
  setLocation,
}: {
  location: string | undefined;
  setLocation: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const { data: getLocations, isLoading } = useGetallLocation();
  const locationData = getLocations?.locations || [];
  console.log(locationData);
  if (isLoading) return <div>loading ...</div>;
  return (
    <div className="flex flex-col gap-2">
      <div>Filter by Location</div>
      <div className="flex flex-col gap-1">
        {locationData.map((eachLocation: GetLocationType) => (
          <div key={eachLocation.city} className="flex items-center gap-2">
            <Checkbox
              checked={location === eachLocation.city}
              onCheckedChange={(checked) => {
                setLocation(checked ? eachLocation.city : undefined);
              }}
            />
            <span className="text-sm">
              {eachLocation.city}, {eachLocation.country}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
