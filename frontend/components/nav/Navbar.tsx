import { Button } from "@/components/ui/button";
import NavigationMenuButtons from "./NavigationMenuButtons";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between shadow-sm py-4 px-2 rounded-lg">
      <Link href={"/"}>
        <div
          className="h-full w-20 bg-center bg-cover bg-no-repeat rounded-full"
          style={{
            backgroundImage:
              "url('https://digitalmarmat.com/storage/logos/gEVabFzg45sg6WjAQYBRlTRAeQDERAS1CVTvZuhj.jpg')",
          }}
        ></div>
      </Link>
      <div>
        <NavigationMenuButtons />
      </div>
      <div className="flex gap-4">
        <Button size={"lg"}>Login</Button>
        <Button size={"lg"} variant={"outline"}>
          Sign Up
        </Button>
      </div>
    </div>
  );
};
export default Navbar;
