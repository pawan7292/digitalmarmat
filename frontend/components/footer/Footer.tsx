import Link from "next/link"

export default async function Footer() {
  return (
    <div className="bg-brand-raiden-900 text-white px-24 text-[12px]">
      <div className="flex gap-8 font-general-sans py-8">
        <div className="flex flex-col gap-4">
          <div className=" font-bold">Useful Links</div>
          <div>
            <div className="hover:underline hover:cursor-pointer">
              Contact us
            </div>
            <Link href={"/blogs"} className="hover:underline hover:cursor-pointer">Blogs</Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className=" font-bold">Socials</div>
          <div>
            <div className="hover:underline hover:cursor-pointer">Facebook</div>
            <div className="hover:underline hover:cursor-pointer">
              Instagram
            </div>
            <div className="hover:underline hover:cursor-pointer">Twitter</div>
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-white"></div>
      <div className="flex justify-between py-8 font-general-sans">
        <div>© 2026 All right reserved. Digital Marmat</div>
        <div className="flex gap-8">
          <Link href={"/terms-and-conditions"} className="hover:underline hover:cursor-pointer">
            Terms and Condition
          </Link>
          <div className="hover:underline hover:cursor-pointer">
            Privacy Policy
          </div>
        </div>
      </div>
    </div>
  );
}
