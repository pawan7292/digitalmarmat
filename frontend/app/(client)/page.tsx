import FaqPage from "@/components/homepage/FaqPage";
import MostPreferedServices, {
  ServicesSkeleton,
} from "@/components/homepage/MostPreferedServices";
import MostViewedServices from "@/components/homepage/MostViewedServices";
import Image from "next/image";
import SearchService from "@/components/homepage/SearchService";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/multitools.webp"
          alt="Expert Help"
          width={1920}
          height={1080}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover w-full h-full"
          priority // important! automatically sets fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/75" />
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ed1e24] via-white/30 to-[#ed1e24]" />

        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ed1e24] animate-pulse" />
            Nepal's #1 Home Services Platform
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-3">
            Expert Help,{" "}
            <span className="text-[#ed1e24]">Right at Your Door</span>
          </h1>

          <p className="text-white/60 text-base md:text-lg mb-8 leading-relaxed">
            AC installation, plumbing, electrician, TV mounting & more — trusted
            professionals across Nepal
          </p>
          <SearchService />
        </div>
      </section>

      <Suspense fallback={<ServicesSkeleton />}>
        {/* This will show fallback until MostViewedServices finishes fetching */}
        <MostPreferedServices />
      </Suspense>
      <Suspense fallback={<ServicesSkeleton />}>
        {/* This will show fallback until MostViewedServices finishes fetching */}
        <MostViewedServices />
      </Suspense>
      <FaqPage />
    </div>
  );
}
