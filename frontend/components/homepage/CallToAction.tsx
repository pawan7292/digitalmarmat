import Link from "next/link";

export default async function CallToActionComponent() {
  return (
    <div className="flex flex-col bg-brand-raiden-100 h-[100vh] justify-center gap-20">
      <div className="h1 text-center text-brand-raiden-700">
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
