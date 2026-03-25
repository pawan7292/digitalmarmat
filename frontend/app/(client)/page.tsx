import AppUsageComponent from "@/components/homepage/AppUsage";
import BrandComponent from "@/components/homepage/Brands";
import CallToActionComponent from "@/components/homepage/CallToAction";
import ChooseProductComponent from "@/components/homepage/choose/ChooseProduct";
import ChooseServiceComponent from "@/components/homepage/choose/ChooseService";
import HeroComponent from "@/components/homepage/hero/Hero";
import StatsComponent from "@/components/homepage/Stats";
import WhatCustomerSay from "@/components/homepage/WhatCustomerSay";
import YourNeedsComponent from "@/components/homepage/YourNeeds";

export default async function Home() {
  return (
    <div className="flex flex-col gap-24 pt-20">
      <div className="px-24 flex flex-col gap-24">
        <HeroComponent />
        <StatsComponent />
        <BrandComponent />
        <YourNeedsComponent />
        <AppUsageComponent />
        <ChooseServiceComponent />
        <ChooseProductComponent />
        <WhatCustomerSay />
      </div>
      <CallToActionComponent />
    </div>
  );
}
