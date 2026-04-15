import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default async function WhatsAppSticky() {
  return (
    <Link
      href={"https://wa.me/+9779802362210"}
      target="_blank"
      className="hidden sm:flex gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-full fixed z-12 bottom-6 right-6 hover:bg-green-100 hover:shadow-lg transition-all duration-300 border border-green-200"
    >
      <div className="flex items-center justify-center">
        <FaWhatsapp size={24} />
      </div>
      <div className="flex flex-col justify-center text-xs sm:text-sm">
        <div className="font-semibold text-green-700">Support</div>
        <div className="text-green-600">+977 9802362210</div>
      </div>
    </Link>
  );
}
