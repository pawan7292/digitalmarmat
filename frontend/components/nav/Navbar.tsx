import NavigationMenuButtons from "./NavigationMenuButtons";
import Link from "next/link";
import UserButtons from "./UserButtons";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="https://digitalmarmat.com/storage/logos/gEVabFzg45sg6WjAQYBRlTRAeQDERAS1CVTvZuhj.jpg"
            alt="Digital Marmat"
            width={60}
            height={60}
            priority
            className="w-auto rounded-lg object-cover"
          />
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex">
          <NavigationMenuButtons />
        </div>

        {/* Auth buttons */}
        <UserButtons />
      </div>
    </header>
  );
};

export default Navbar;
