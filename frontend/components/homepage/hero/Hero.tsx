import LeftSide from "./LeftSide";
import SearchBar from "./SearchBar";

export default async function HeroComponent() {
  return (
    <div className=" flex items-stretch w-full bg-gray-100">
      <div className="px-24  py-12">
        <LeftSide />
      </div>

      <div className="w-[40vw] flex items-center justify-center">
        <SearchBar />
      </div>
    </div>
  );
}
