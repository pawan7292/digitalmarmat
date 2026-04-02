import StatsComponent from "../Stats";
import { CiSearch } from "react-icons/ci";
import { getServiceCategories } from "@/lib/fetches/category";
import { GetCategoryType } from "@/lib/types/category";
import Link from "next/link";
import TypingServices from "../TypingAnimation";
import SearchInput from "./TypeWriterSearchPlaceholder";
import SearchBox from "./SearchBox";

export default async function LeftSide() {
  const returnedCategories = await getServiceCategories();

  const categories = returnedCategories?.data || [];

  return (
    <div className="text-brand-raiden-500 h4 flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        {/* <span className="h6">नेपालकै भरपर्दो</span> <br></br>Home Appliance
          Service Platform */}
        <div className="flex flex-col gap-4">
          <TypingServices />
          <div className="font-general-sans italic text-[16px] font-normal">
            Book trusted technicians instantly and get fast, reliable service{" "}
            <br></br>at your doorstep.
          </div>
        </div>

        <SearchBox />
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-[18px] font-semibold">Popular Services</div>
        <div className="flex gap-2 font-general-sans text-[12px] flex-wrap">
          {categories.slice(0, 4).map((eachCategory: GetCategoryType) => {
            return (
              <Link
                className="hover:underline hover:cursor-pointer shadow-sm px-1 bg-gray-200 rounded-xl font-medium"
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
