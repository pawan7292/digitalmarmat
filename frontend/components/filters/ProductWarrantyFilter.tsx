import { getProductBrands, getProductWarranty } from "@/lib/fetches/filters";
import { ProductQueryParams } from "@/lib/types/product";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";

export default async function ProductWarrantyFilter({
  params,
  category,
}: {
  params: ProductQueryParams;
  category: string;
}) {
  const returnedWarranty = await getProductWarranty();
  const warranty = returnedWarranty?.data || [];
  const resetWarranty = { ...params };
  delete resetWarranty.warranty;
  const resetWarrantyQuery = new URLSearchParams(resetWarranty as any).toString();

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold">Warranty</div>
      <div className="flex flex-col gap-1">
        {warranty.map((eachWarranty: string) => {
          const newParams = { ...params, warranty: eachWarranty };
          const queryString = new URLSearchParams(newParams as any).toString();
          return (
            <Link
              href={`/${category}?${queryString}`}
              key={eachWarranty}
              className="flex gap-2 items-center"
            >
              <Checkbox checked={params?.warranty === eachWarranty} />
              <span className="text-sm">{eachWarranty}</span>
            </Link>
          );
        })}
      </div>
      <Link
        href={`/${category}?${resetWarrantyQuery}`}
        className="text-brand-raiden-500 text-[15px] hover:underline hover:cursor-pointer"
      >
        Reset Warranty
      </Link>
    </div>
  );
}
