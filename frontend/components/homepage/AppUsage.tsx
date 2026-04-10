import Image from "next/image";
import { FaBook } from "react-icons/fa";

export default async function AppUsageComponent() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-12 bg-brand-raiden-500 py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-12 font-general-sans text-white rounded-xl">
      <div className="flex flex-col items-center text-center">
        <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">How Digital Marmat Work</div>
        <div className="text-xs sm:text-sm md:text-base mt-2">
          Each listing is designed to be clear and concise, providing customers with fast service
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        <div className="flex flex-col items-center gap-2 sm:gap-3 text-center">
          <div>
            <FaBook size={28} />
          </div>
          <div className="text-sm sm:text-base md:text-lg font-semibold">1. Post a Service</div>
          <div className="text-xs sm:text-sm md:text-base">
            After you post a job, our matching system identifies and alerts relevant providers.
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 sm:gap-3 text-center">
          <div>
            <FaBook size={28} />
          </div>
          <div className="text-sm sm:text-base md:text-lg font-semibold">2. Get Matched</div>
          <div className="text-xs sm:text-sm md:text-base">
            Relevant providers express interest in your job with their quotes and profiles.
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 sm:gap-3 text-center">
          <div>
            <FaBook size={28} />
          </div>
          <div className="text-sm sm:text-base md:text-lg font-semibold">3. Hire & Complete</div>
          <div className="text-xs sm:text-sm md:text-base">
            Select your provider and complete the job with confidence and support.
          </div>
        </div>
      </div>
    </div>
  );
}
