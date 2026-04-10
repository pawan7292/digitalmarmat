import { getProductBrands } from "@/lib/fetches/filters";
import { ProductQueryParams } from "@/lib/types/product";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";

export default async function ProductBrandFilter({
  params,
  category,
}: {
  params: ProductQueryParams;
  category: string;
}) {
  const returnedBrands = await getProductBrands();
  const brands = returnedBrands?.data || [];
  const resetBrand = { ...params };
  delete resetBrand.brand;
  const resetBrandQuery = new URLSearchParams(resetBrand as any).toString();

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold">Brands</div>
      <div className="flex flex-col gap-1">
        {brands.map((eachBrand: string) => {
          const newParams = { ...params, brand: eachBrand };
          const queryString = new URLSearchParams(newParams as any).toString();
          return (
            <Link
              href={`/${category}?${queryString}`}
              key={eachBrand}
              className="flex gap-2 items-center"
            >
              <Checkbox checked={params?.brand === eachBrand} />
              <span className="text-sm">{eachBrand}</span>
            </Link>
          );
        })}
      </div>
      <Link
        href={`/${category}?${resetBrandQuery}`}
        className="text-brand-raiden-500 text-[15px] hover:underline hover:cursor-pointer"
      >
        Reset Brand
      </Link>
    </div>
  );
}
