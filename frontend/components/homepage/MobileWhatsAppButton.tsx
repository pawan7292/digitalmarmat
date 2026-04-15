import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default async function MobileWhatsAppButton() {
  return (
    <Link
      href={"https://wa.me/+9779802362210"}
      target="_blank"
      className="sm:hidden fixed z-12 bottom-6 right-6 bg-green-500 text-white p-3 rounded-full hover:bg-green-600 hover:shadow-lg transition-all duration-300 shadow-md"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </Link>
  );
}
