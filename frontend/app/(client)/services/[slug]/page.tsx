import { ServiceDetailsType } from "@/lib/types/service";
import ImageCollection from "@/components/services/details/ImageCollection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServiceDetail } from "@/lib/fetches/service";
import { FiEye, FiCalendar, FiMapPin, FiTag, FiCheckCircle } from "react-icons/fi";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const serviceData: ServiceDetailsType = await getServiceDetail(slug);
  const includesArray = serviceData.include.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col lg:flex-row gap-8 items-start">

        {/* LEFT — Main content */}
        <div className="flex-1 flex flex-col gap-8">

          {/* Title & meta */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 flex flex-col gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#1d58a9] mb-1">Service Detail</p>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {serviceData.name}
              </h1>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-slate-500">
              {serviceData.location && (
                <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
                  <FiMapPin size={13} className="text-[#1d58a9]" />
                  {serviceData.location}
                </span>
              )}
              <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
                <FiEye size={13} className="text-[#1d58a9]" />
                {serviceData.views} views
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
                <FiCalendar size={13} className="text-[#1d58a9]" />
                {serviceData.bookings} bookings
              </span>
            </div>

            {/* Carousel */}
            <ImageCollection images={serviceData.images} />
          </div>

          {/* Includes */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FiCheckCircle className="text-[#1d58a9]" size={18} />
              What's Included
            </h2>
            <div className="flex flex-wrap gap-2">
              {includesArray.map((include) => (
                <span
                  key={include}
                  className="flex items-center gap-1.5 text-sm font-medium bg-[#eff4fb] text-[#0e3a6b] border border-[#b9d1ef] px-3 py-1 rounded-full"
                >
                  <FiTag size={11} />
                  {include}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          {serviceData.description && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
              <h2 className="text-lg font-bold text-slate-800 mb-5">Service Overview</h2>
              <div
                className="
                  prose prose-slate max-w-none
                  prose-headings:font-bold prose-headings:text-slate-800
                  prose-p:text-slate-600 prose-p:leading-relaxed
                  prose-li:text-slate-600
                  prose-a:text-[#1d58a9] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-slate-800
                  prose-img:rounded-xl prose-img:shadow-sm
                  prose-hr:border-slate-100
                  prose-blockquote:border-[#2a6ec4] prose-blockquote:text-slate-500
                "
                dangerouslySetInnerHTML={{ __html: serviceData.description }}
              />
            </div>
          )}
        </div>

        {/* RIGHT — Sticky booking card */}
        <div className="w-full lg:w-72 xl:w-80 sticky top-24 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-5">
            {/* Price */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Price</p>
              <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
                Rs. {serviceData.price.toLocaleString()}
              </div>
              <span className="inline-block mt-1.5 text-xs font-semibold text-[#165092] bg-[#eff4fb] border border-[#b9d1ef] px-2.5 py-0.5 rounded-full">
                {serviceData.price_type}
              </span>
            </div>

            <div className="h-px bg-slate-100" />

            {/* Quick info */}
            <ul className="flex flex-col gap-2.5 text-sm text-slate-600">
              {serviceData.location && (
                <li className="flex items-center gap-2">
                  <FiMapPin size={14} className="text-[#1d58a9] shrink-0" />
                  {serviceData.location}
                </li>
              )}
              <li className="flex items-center gap-2">
                <FiEye size={14} className="text-[#1d58a9] shrink-0" />
                {serviceData.views} views
              </li>
              <li className="flex items-center gap-2">
                <FiCalendar size={14} className="text-[#1d58a9] shrink-0" />
                {serviceData.bookings} bookings
              </li>
            </ul>

            <div className="h-px bg-slate-100" />

            {/* CTA */}
            <Link href={`/book/${serviceData.slug}`} className="w-full">
              <Button
                className="w-full bg-[#1d58a9] hover:bg-[#165092] active:bg-[#0e3a6b] text-white font-bold text-base py-6 rounded-xl shadow-md shadow-sky-100 transition-colors"
              >
                Book Now
              </Button>
            </Link>
            <p className="text-xs text-center text-slate-400">No payment required to book</p>
          </div>

          {/* Trust badge */}
          <div className="bg-gradient-to-br from-[#1d58a9] to-sky-600 rounded-2xl p-5 text-white text-sm flex flex-col gap-1.5">
            <p className="font-bold text-base">✓ Verified Service</p>
            <p className="text-[#dce8f7] text-xs leading-snug">
              All professionals are background-checked and trained by Digital Marmat.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}