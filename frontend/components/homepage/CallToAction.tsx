import Link from "next/link";

export default async function CallToActionComponent() {
  return (
    <div className="flex flex-col bg-brand-raiden-100 min-h-screen md:h-[100vh] justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 px-4 sm:px-6 md:px-8">
      <div className="h1 text-center text-brand-raiden-700 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        Book Your <br></br>Service Today
      </div>
      <div className="flex justify-center">
        <Link
          href={"/all-services"}
          className="bodyheadingsmall text-brand-raiden-700 hover:text-brand-raiden-100 hover:cursor-pointer border-2 border-brand-raiden-700 hover:bg-brand-raiden-700 px-4 py-2 rounded-xl"
        >
          View Services
        </Link>
      </div>
    </div>
  );
}
