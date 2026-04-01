import { SlotsType } from "@/lib/types/service";
import { Card } from "../ui/card";
import { DatePicker } from "./DatePicker";

export default async function ServiceBookingComponent({
  slots,
}: {
  slots: SlotsType[];
}) {
  return (
    <div className="flex flex-col">
      <Card className="px-4">
        <DatePicker slots={slots}/>
      </Card>
    </div>
  );
}
