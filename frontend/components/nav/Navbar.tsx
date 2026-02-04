import NavigationMenuButtons from "./NavigationMenuButtons";
import Link from "next/link";
import UserButtons from "./UserButtons";

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
      <UserButtons />
    </div>
  );
};
export default Navbar;
