import { Badge } from "../ui/badge";

export default function Checkout({
  additional_infos,
}: {
  additional_infos: { price: number; product_id: number; name: string };
}) {
  return (
    <div className="flex flex-col gap-2 bg-white p-6 rounded-xl shadow">
      <div className="h6 text-brand-raiden-500">Checkout</div>
      <Badge variant={"default"}>Cash on Delivery</Badge>
      <div className="text-[18px]">{additional_infos.name}</div>
      <div className="w-full h-[1px] bg-black"></div>
      <div className="flex flex-col px-4">
        <div className="flex justify-between ">
          <div>Service amount:</div>
          <div>Rs. {Number(additional_infos.price).toFixed(2)}</div>
        </div>
        <div className="flex justify-between ">
          <div>Tax amount:</div>
          <div>
            Rs. {Number((13 / 100) * additional_infos.price).toFixed(2)}
          </div>
        </div>
        <div className="flex justify-between items-center font-semibold text-[18px]">
          <div>Total amount:</div>
          <div className="">
            Rs.{" "}
            {(Number((13 / 100) * additional_infos.price) +
              Number(additional_infos.price)).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
