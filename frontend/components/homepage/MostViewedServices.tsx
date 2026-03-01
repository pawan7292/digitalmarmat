"use client";

import { useGetAllServices } from "@/hooks/useServices";
import { ServiceType } from "@/lib/types/service";
import { ServiceCard } from "./ServiceCard";
import Link from "next/link";

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-100 bg-white animate-pulse">
      <div className="h-44 bg-slate-100" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-4 bg-slate-100 rounded w-3/4" />
        <div className="h-3 bg-slate-100 rounded w-1/2" />
        <div className="h-4 bg-slate-100 rounded w-1/3 mt-2" />
      </div>
    </div>
  );
}

export default function MostViewedServices() {
  const { data, isLoading } = useGetAllServices({ sort: "most_viewed" });
  const services = data?.data?.slice(0, 4) || [];

  return (
    <section className="px-6 md:px-12 pb-14">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-[#1d58a9] mb-1">Trending Now</p>
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
        {isLoading
          ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
          : services.map((s: ServiceType) => (
              <ServiceCard
                key={s.id}
                href={`/services/${s.slug}`}
                name={s.name}
                price={s.price}
                image={s.images?.[0]}
                rating={s.rating}
                ratingCount={s.rating_count}
                stat={`${s.views} views`}
                badgeLabel="Trending"
              />
            ))}
      </div>
    </section>
  );
}