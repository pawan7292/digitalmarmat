import Image from "next/image";
import Link from "next/link";
import { Ultra } from "next/font/google";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const ultrafont = Ultra({
  subsets: ["latin"],
  weight: ["400"],
});

export default async function Footer() {
  return (
    <div className="bg-brand-raiden-900 text-white px-4 sm:px-6 md:px-12 lg:px-24 text-[11px] sm:text-[12px]">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4 justify-center">
          <Link
            href={"/"}
            className="flex min-w-0 shrink-0 items-center gap-2 "
          >
            <div className="relative h-9 w-9 sm:h-10 sm:w-10">
              <Image
                src={"/images/FrayedNoBG.svg"}
                fill
                className="object-contain"
                alt="Digital Marmat Icon"
              />
            </div>
            <div
              className={`${ultrafont.className} leading-tight hidden min-[400px]:block`}
            >
              <span className="text-white">DIGITAL</span>
              <br />
              <span className="text-white">MARMAT</span>
            </div>
          </Link>
          <div className="text-white">
            Book Home Service Providers at your fingertips
          </div>
          <div className="flex gap-4">
            <Link
              href={"https://www.facebook.com/digitalmarmat/"}
              target="_blank"
            >
              <FaFacebook size={24} />
            </Link>
            <Link
              href={"https://www.instagram.com/digitalmarmat_official"}
              target="_blank"
            >
              <FaInstagram size={24} />
            </Link>
            <Link
              href={"https://www.tiktok.com/@digitalmarmat"}
              target="_blank"
            >
              <FaTiktok size={24} />
            </Link>
            <Link
              href={"https://www.youtube.com/@DigitalMarmat-DM/shorts"}
              target="_blank"
            >
              <FaYoutube size={24} />
            </Link>
            <Link
              href={"https://www.linkedin.com/in/digital-marmat-967623379"}
              target="_blank"
            >
              <FaLinkedin size={24} />
            </Link>
          </div>
        </div>
        <div className="flex gap-8 font-general-sans py-8">
          <div className="flex flex-col gap-4">
            <div className=" font-bold">Useful Links</div>
            <div className="flex flex-col">
              <Link
                href={"/contact"}
                className="hover:underline hover:cursor-pointer"
              >
                Contact us
              </Link>
              <Link
                href={"/blogs"}
                className="hover:underline hover:cursor-pointer"
              >
                Blogs
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className=" font-bold">Services</div>
            <div className="flex flex-col">
              <Link
                href={"/all-products"}
                className="hover:underline hover:cursor-pointer"
              >
                All Products
              </Link>
              <Link
                href={"all-services"}
                className="hover:underline hover:cursor-pointer"
              >
                All Services
              </Link>
              <Link
                href={"/services"}
                className="hover:underline hover:cursor-pointer"
              >
                View Service Categories
              </Link>
              <Link
                href={"/products"}
                className="hover:underline hover:cursor-pointer"
              >
                View Product Categories
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Top divider */}
      <div className="w-full h-[2px] bg-white"></div>

      {/* Company Info Section */}
      <div className="py-6 font-general-sans">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          {/* Registration & Legal */}
          <div className="flex flex-col gap-2">
            <div className="text-white/50 uppercase tracking-widest text-[10px] font-semibold mb-1">
              Legal
            </div>
            <div className="flex items-start gap-2">
              <span className="text-white/40 shrink-0">Reg.</span>
              <span className="text-white/80">32340910801081</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-white/40 shrink-0">VAT</span>
              <span className="text-white/80">619809012</span>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2">
            <div className="text-white/50 uppercase tracking-widest text-[10px] font-semibold mb-1">
              Address
            </div>
            <div className="text-white/80 leading-relaxed">
              Digital Marmat Pvt. Ltd.
              <br />
              Machhapokhari-16, Kathmandu
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-white/40 shrink-0">Main Office</span>
              <span className="inline-block w-1 h-1 rounded-full bg-white/30"></span>
              <span className="text-white/80">Kathmandu</span>
            </div>
          </div>

          {/* Support & Contact */}
          <div className="flex flex-col gap-2">
            <div className="text-white/50 uppercase tracking-widest text-[10px] font-semibold mb-1">
              Contact & Support
            </div>
            <a
              href="mailto:info@digitalmarmat.com"
              className="text-white/80 hover:text-white hover:underline transition-colors"
            >
              info@digitalmarmat.com
            </a>
            <div className="flex flex-col gap-1 mt-1 border-l-2 border-white/20 pl-3">
              <div className="text-white/40 text-[10px] uppercase tracking-wide">
                Support
              </div>
              <div className="text-white/80">Pawan Thapa</div>
              <a
                href="tel:+9779802362210"
                className="text-white/80 hover:text-white hover:underline transition-colors"
              >
                +977 9802362210
              </a>
              <a
                href="mailto:info@digitalmarmat.com"
                className="text-white/80 hover:text-white hover:underline transition-colors"
              >
                info@digitalmarmat.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="w-full h-[1px] bg-white/30"></div>

      {/* Copyright & Terms */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-8 font-general-sans">
        <div className="text-center sm:text-left">
          © 2026 All right reserved. Digital Marmat
        </div>
        <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-8">
          <Link
            href={"/terms-and-conditions"}
            className="hover:underline hover:cursor-pointer"
          >
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
