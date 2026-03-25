import Image from "next/image";

export default async function AppUsageComponent() {
  return (
    <div className="flex flex-col gap-20 text-brand-raiden-500">
      <div className="flex w-full items-center">
        <div className="bodyheading w-1/2">1. Choose Product or Service</div>
        <div className="relative w-1/2 h-120 rounded-4xl border-2 border-brand-raiden-800">
          <Image
            src={"/images/chooseservice.png"}
            alt="choosing service"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex w-full items-center">
        <div className="bodyheading w-1/2">2. Book Instantly</div>
        <div className="relative w-1/2 h-120 rounded-4xl border-2 border-brand-raiden-800">
          <Image
            src={"/images/bookings.png"}
            alt="How to Book Image"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex w-full items-center">
        <div className="bodyheading w-1/2">3. Expert Arrives</div>
        <div className="relative w-1/2 h-120 rounded-4xl border-2 border-brand-raiden-800">
          <Image
            src={"/images/expertarrives.jpg"}
            alt="Expert at home"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex w-full items-center">
        <div className="bodyheading w-1/2">4. Done</div>
        <div className="relative w-1/2 h-120 rounded-4xl border-2 border-brand-raiden-800">
          <Image
            src={"/images/done.jpg"}
            alt="Expert Says Work Done"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
