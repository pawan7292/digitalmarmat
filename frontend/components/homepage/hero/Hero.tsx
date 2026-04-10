import Image from "next/image";
import LeftSide from "./LeftSide";

export default async function HeroComponent() {
  return (
    <div className="flex flex-col lg:flex-row items-stretch w-full bg-gray-100">
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24 py-6 sm:py-8 md:py-10 lg:py-12 lg:flex-1 lg:min-w-0 lg:max-w-[60%]">
        <LeftSide />
      </div>

      {/* Desktop / large screens: hero illustration only */}
      <div className="relative hidden lg:block lg:w-[40%] lg:min-h-[min(50vh,440px)] shrink-0 bg-gray-100">
        <Image
          src="/images/plumber-new.svg"
          fill
          className="object-cover object-bottom"
          alt=""
          priority
          sizes="40vw"
        />
      </div>
    </div>
  );
}
