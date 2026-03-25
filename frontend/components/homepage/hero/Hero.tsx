import SearchBar from "@/components/homepage/hero/SearchBar";

export default async function HeroComponent() {
  return (
    <div className="flex justify-between w-full">
      <div className="text-brand-raiden-800 h1">
        BUY.<br></br>INSTALL.<br></br>REPAIR.<br></br>DONE.
      </div>
      <SearchBar />
    </div>
  );
}
