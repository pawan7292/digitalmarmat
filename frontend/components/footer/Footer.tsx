import Link from "next/link";
import { Separator } from "../ui/separator";

export default async function Footer() {
  return (
    <div className="px-8 p-4 flex flex-col gap-4">
      <Separator />
      <div className="flex justify-between">
        <div>© 2026 All right reserved. Digital Marmat</div>
        <div>
          <Link
            href={"/terms-and-conditions"}
            className="underline hover:text-blue-500"
          >
            Terms and conditions
          </Link>
        </div>
      </div>
    </div>
  );
}
