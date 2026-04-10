import { PriceType, ServiceDetailsType } from "@/lib/types/service";
import ServiceBox from "./ServiceBox";
import { Button } from "../ui/button";

export default function BookPayment({
  serviceData,
  setPriceDetails,
  onNext,
}: {
  serviceData: ServiceDetailsType;
  setPriceDetails: React.Dispatch<React.SetStateAction<PriceType | null>>;
  onNext: () => void;
}) {
  function handlePriceContinue() {
    setPriceDetails({
      service_amount: Number(serviceData.price),
      amount_tax: Number((serviceData.price * 13) / 100),
      total_amount:
        Number(serviceData.price) + Number((serviceData.price * 13) / 100),
    });
    onNext();
  }
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="flex w-full justify-center gap-12 items-center">
        <ServiceBox service={serviceData} />
        <div className="shadow-sm p-4 rounded-md flex flex-col justify-start border-1 gap-8">
          <div className="flex gap-2 flex-col">
            <div className="flex justify-between gap-18">
              <div>Service amount</div>
              <div>{serviceData.price}</div>
            </div>
            <div className="flex justify-between gap-18">
              <div>Tax Amount (13%)</div>
              <div>{(serviceData.price * 13) / 100}</div>
            </div>
            <hr></hr>
            <div className="flex justify-between gap-18">
              <div>Total Amount (13%)</div>
              <div>
                {Number(serviceData.price) +
                  Number((serviceData.price * 13) / 100)}
              </div>
            </div>
          </div>
          <div className="text-gray-500 text-sm">
            Note: Price is for price type: {serviceData.price_type}
          </div>
        </div>
      </div>
      <div>
        <Button variant={"book"} onClick={handlePriceContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}
