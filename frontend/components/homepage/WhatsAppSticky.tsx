import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default async function WhatsAppSticky() {
  return (
    <Link
      href={"https://wa.me/+9779802362210"}
      target="_blank"
      className="flex gap-2 text-green-500 bg-green-100 px-2 py-2 rounded-xl fixed z-12 bottom-6 right-6"
    >
      <div>
        <FaWhatsapp size={48} />
      </div>
      <div>
        <div>Support on Whatsapp</div>
        <div>+977 9802362210</div>
      </div>
    </Link>
  );
}
