import { ServiceType } from "@/lib/types/service";
import { ServiceCard } from "./ServiceCard";
import Link from "next/link";
import { getServices } from "@/lib/fetches/service";

export default async function MostViewedServices() {
  const services = await getServices({ sort: "most_viewed" });
  const topViewedServices = services?.data?.slice(0, 4) || [];

  return (
    <section className="px-6 md:px-12 pb-14">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-[#1d58a9] mb-1">
            Trending Now
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
            Most Viewed Services
          </h2>
          <div className="mt-2 h-1 w-10 rounded-full bg-gradient-to-r from-[#ed1e24] to-[#1d58a9]" />
        </div>
        <Link
          href="/services?sort=most_viewed"
          className="text-sm font-semibold text-[#1d58a9] border border-[#b9d1ef] hover:bg-[#1d58a9] hover:text-white px-4 py-2 rounded-lg transition-all duration-150"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {topViewedServices.map((s: ServiceType) => (
          <ServiceCard
            key={s.id}
            href={`/services/${s.slug}`}
            name={s.name}
            price={s.price}
            image={s.images?.[0]}
            rating={s.avg_rating}
            ratingCount={s.rating_count}
            stat={`${s.views} views`}
            badgeLabel="Trending"
          />
        ))}
      </div>
    </section>
  );
}
