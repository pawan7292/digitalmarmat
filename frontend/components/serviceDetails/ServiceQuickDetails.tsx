import { ServiceDetailsType } from "@/lib/types/service";
import GetRatingStar from "../ui/getRating";
import Link from "next/link";

export default async function ServiceQuickDetails({
  service,
}: {
  service: ServiceDetailsType;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <div className="text-[15px] text-gray-500">
        <Link
          href={`/services/${service.category?.slug}`}
          className="text-blue-500 hover:underline hover:text-blue-600"
        >
          {service.category?.name}
        </Link>{" "}
        {" > "}{" "}
        <Link
          href={`/services/${service.category?.slug}/${service.subcategory?.slug}`}
          className="text-blue-500 hover:underline hover:text-blue-600"
        >
          {service.subcategory?.name}
        </Link>
      </div>
      <div className="text-[12px]">
        <div className="flex items-center gap-2">
          {Number(service.avg_rating)}
          {<GetRatingStar size={12} rating={Number(service.avg_rating)} />} (
          {service.ratings?.length} review)
        </div>
        <div className="font-bold">{service.bookings} Service booked</div>
      </div>
      <div className="bodyheadingsmall text-brand-raiden-500">
        <div>Rs. {service.price}</div>
      </div>
      <div className="flex flex-wrap gap-2">
        {service.include.split(",").map((eachInclude) => (
          <span
            key={eachInclude}
            className="px-3 py-1 text-sm bg-brand-raiden-50 text-brand-raiden-600 rounded-full border border-brand-raiden-100"
          >
            {eachInclude.trim()}
          </span>
        ))}
      </div>
    </div>
  );
}
