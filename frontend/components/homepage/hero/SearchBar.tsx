import Image from "next/image";

export default async function SearchBar() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-full h-full">
        <Image
          src={"/images/plumber-new.svg"}
          fill
          className="object-cover object-bottom"
          alt="Digital Marmat Icon"
        />
      </div>
    </div>
  );
}
