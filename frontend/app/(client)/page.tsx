import BrandComponent from "@/components/homepage/Brands";
import ChooseProductComponent from "@/components/homepage/choose/ChooseProduct";
import ChooseServiceComponent from "@/components/homepage/choose/ChooseService";
import HeroComponent from "@/components/homepage/hero/Hero";
import MostBookedServices from "@/components/homepage/MostBookedServices";
import WhatsAppSticky from "@/components/homepage/WhatsAppSticky";
import MostPopularProduct from "@/components/homepage/MostPopularProduct";
import MostPopularService from "@/components/homepage/MostPopularService";
import Image from "next/image";
import AppUsageComponent from "@/components/homepage/AppUsage";
import FaqPage from "@/components/homepage/FaqPage";
import BlogComponentHomePage from "@/components/homepage/BlogComponent";

export default async function Home() {
  return (
    <div className="flex flex-col gap-12">
      <WhatsAppSticky />
      <HeroComponent />
      <ChooseServiceComponent />
      <ChooseProductComponent />
      <MostBookedServices />
      <MostPopularProduct />
      <MostPopularService />

      <div className="px-24 flex flex-col gap-24">
        <BrandComponent />
        <div className="w-full">
          <Image
            src="/images/happy-family.jpeg"
            alt="Service Banner"
            width={1920}
            height={600}
            className="w-full h-auto object-contain"
          />
        </div>
        <AppUsageComponent />
      </div>
      <BlogComponentHomePage />
      <FaqPage />
    </div>
  );
}
