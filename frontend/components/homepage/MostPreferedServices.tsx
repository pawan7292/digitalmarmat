import { getServices } from "@/lib/fetches/service";
import Link from "next/link";
import { ServiceType } from "@/lib/types/service";
import { ServiceCard } from "./ServiceCard";

export const ServicesSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
    {[1, 2, 3, 4].map((n) => (
      <div
        key={n}
        className="animate-pulse bg-gray-100 rounded-lg h-64 flex flex-col"
      >
        <div className="bg-gray-300 h-40 w-full rounded-t-lg" />{" "}
        {/* image placeholder */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" /> {/* title */}
          <div className="h-3 bg-gray-300 rounded w-1/2 mb-2" /> {/* price */}
          <div className="h-3 bg-gray-300 rounded w-1/3" /> {/* stat/badge */}
        </div>
      </div>
    ))}
  </div>
);

export default async function MostPreferedServices() {
  const services = await getServices({ sort: "most_booked" });
  const topServices = services?.data?.slice(0, 4) || [];
  return (
    <section className="px-6 md:px-12 py-14">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-[#1d58a9] mb-1">
            Top Picks
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
            Most Preferred Services
          </h2>
          <div className="mt-2 h-1 w-10 rounded-full bg-gradient-to-r from-[#ed1e24] to-[#1d58a9]" />
        </div>
        <Link
          href="/services?sort=most_booked"
          className="text-sm font-semibold text-[#1d58a9] border border-[#b9d1ef] hover:bg-[#1d58a9] hover:text-white px-4 py-2 rounded-lg transition-all duration-150"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {topServices.map((s: ServiceType) => (
          <ServiceCard
            key={s.id}
            href={`/services/${s.slug}`}
            name={s.name}
            price={s.price}
            image={s.images?.[0]}
            rating={s.rating}
            ratingCount={s.rating_count}
            stat={`${s.bookings} bookings`}
            badgeLabel="Popular"
          />
        ))}
      </div>
    </section>
  );
}
