import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function ServiceSearchByName({
  name,
  setName,
}: {
  name: string | undefined;
  setName: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    setName(search);
  };
  return (
    <div className="text-xl font-bold w-1/2 flex gap-4 flex-col">
      <div className="flex gap-2 items-center">
        <Input
          id="input-demo-api-key"
          size={32}
          placeholder="What are you lookings for?"
          className="bg-white border-white py-6"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant={"secondary"} onClick={handleSearch}>
          Search
        </Button>
      </div>
      {name ? `Search results for "${name}"` : null}
    </div>
  );
}
