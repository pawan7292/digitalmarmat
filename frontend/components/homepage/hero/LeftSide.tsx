import StatsComponent from "../Stats";
import { getServiceCategories } from "@/lib/fetches/category";
import { GetCategoryType } from "@/lib/types/category";
import Link from "next/link";
import TypingServices from "../TypingAnimation";
import SearchBox from "./SearchBox";
import SearchBar from "./SearchBar";

export default async function LeftSide() {
  const returnedCategories = await getServiceCategories();

  const categories = returnedCategories?.data || [];

  return (
    <div className="text-brand-raiden-500 h4 flex flex-col gap-8 sm:gap-10 lg:gap-12">
      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="flex flex-col gap-3 sm:gap-4">
          <TypingServices />
          <div className="font-general-sans italic text-sm sm:text-[16px] font-normal max-w-prose text-gray-700">
            Book trusted technicians instantly and get fast, reliable service at
            your doorstep.
          </div>
        </div>

        {/* Mobile / tablet: search in-flow (no separate strip) */}
        <div className="lg:hidden">
          <SearchBar />
        </div>

        <div className="hidden lg:block">
          <SearchBox />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-base font-semibold sm:text-[18px]">Popular Services</div>
        <div className="flex flex-wrap gap-2 font-general-sans text-[11px] sm:text-[12px]">
          {categories.slice(0, 4).map((eachCategory: GetCategoryType) => {
            return (
              <Link
                className="rounded-full border border-gray-200 bg-white px-3 py-1.5 font-medium text-brand-raiden-600 shadow-sm transition hover:border-brand-raiden-300 hover:bg-brand-raiden-50"
                href={`/services/${eachCategory.slug}`}
                key={eachCategory.id}
              >
                {eachCategory.name}
              </Link>
            );
          })}
        </div>
      </div>

      <StatsComponent />
    </div>
  );
}
