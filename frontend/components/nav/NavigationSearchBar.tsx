import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SearchBar from "./NewSearch";

export default function NavigationSearchBar() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <FaSearch />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="">
        <SearchBar />
      </PopoverContent>
    </Popover>
  );
}
