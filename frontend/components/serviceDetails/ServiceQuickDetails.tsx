import { ServiceDetailsType } from "@/lib/types/service";
import GetRatingStar from "../ui/getRating";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default async function ServiceQuickDetails({
  service,
}: {
  service: ServiceDetailsType;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs text-gray-500 sm:text-[15px]"
      >
        <Link
          href={`/services/${service.category?.slug}`}
          className="min-w-0 max-w-full break-words text-blue-500 underline-offset-2 transition hover:text-blue-600 hover:underline active:text-blue-700"
        >
          {service.category?.name}
        </Link>
        <ChevronRight
          className="size-3.5 shrink-0 text-gray-400"
          aria-hidden
        />
        <Link
          href={`/services/${service.category?.slug}/${service.subcategory?.slug}`}
          className="min-w-0 max-w-full break-words text-blue-500 underline-offset-2 transition hover:text-blue-600 hover:underline active:text-blue-700"
        >
          {service.subcategory?.name}
        </Link>
      </nav>
      <div className="text-[12px] sm:text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span>{Number(service.avg_rating)}</span>
          {<GetRatingStar size={12} rating={Number(service.avg_rating)} />}(
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
            className="rounded-full border border-brand-raiden-100 bg-brand-raiden-50 px-3 py-1 text-xs text-brand-raiden-600 sm:text-sm"
          >
            {eachInclude.trim()}
          </span>
        ))}
      </div>
    </div>
  );
}
