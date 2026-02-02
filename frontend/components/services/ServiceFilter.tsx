import CategoryFilter from "./CategoryFilter";
import LocationFilter from "./LocationFilter";
import PriceRangeFilter from "./PriceRangeFilter";
export default function ServiceFilter({
  category,
  setCategory,
  location,
  setLocation,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: {
  category: number | undefined;
  setCategory: React.Dispatch<React.SetStateAction<number | undefined>>;
  location: string | undefined;
  setLocation: React.Dispatch<React.SetStateAction<string | undefined>>;
  minPrice: number | undefined;
  setMinPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
  maxPrice: number | undefined;
  setMaxPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
  return (
    <div className="sticky top-24">
      <div className="font-semibold text-lg">Filters</div>
      <CategoryFilter category={category} setCategory={setCategory} />
      <LocationFilter location={location} setLocation={setLocation} />
      {/* <PriceRangeFilter
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      /> */}
    </div>
  );
}
