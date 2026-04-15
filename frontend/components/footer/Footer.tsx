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
    <div className="bg-brand-raiden-900 text-white px-4 sm:px-6 md:px-12 lg:px-24 text-xs sm:text-sm">
      {/* Top section with logo and links */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 py-8 md:py-12">
        {/* Logo and tagline */}
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
          <div className="text-xs sm:text-sm text-white/90">
            Book Home Service Providers at your fingertips
          </div>
          <div className="flex gap-3 sm:gap-4 mt-2">
            <Link
              href={"https://www.facebook.com/digitalmarmat/"}
              target="_blank"
              className="hover:scale-110 transition-transform"
            >
              <FaFacebook size={20} />
            </Link>
            <Link
              href={"https://www.instagram.com/digitalmarmat_official"}
              target="_blank"
              className="hover:scale-110 transition-transform"
            >
              <FaInstagram size={20} />
            </Link>
            <Link
              href={"https://www.tiktok.com/@digitalmarmat"}
              target="_blank"
              className="hover:scale-110 transition-transform"
            >
              <FaTiktok size={20} />
            </Link>
            <Link
              href={"https://www.youtube.com/@DigitalMarmat-DM/shorts"}
              target="_blank"
              className="hover:scale-110 transition-transform"
            >
              <FaYoutube size={20} />
            </Link>
            <Link
              href={"https://www.linkedin.com/in/digital-marmat-967623379"}
              target="_blank"
              className="hover:scale-110 transition-transform"
            >
              <FaLinkedin size={20} />
            </Link>
          </div>
        </div>
        {/* Links sections */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 font-general-sans flex-1">
          <div className="flex flex-col gap-3">
            <div className="font-bold text-sm">Useful Links</div>
            <div className="flex flex-col gap-2">
              <Link
                href={"/contact"}
                className="hover:underline hover:cursor-pointer text-white/80 hover:text-white"
              >
                Contact us
              </Link>
              <Link
                href={"/blogs"}
                className="hover:underline hover:cursor-pointer text-white/80 hover:text-white"
              >
                Blogs
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-bold text-sm">Services</div>
            <div className="flex flex-col gap-2">
              <Link
                href={"/all-products"}
                className="hover:underline hover:cursor-pointer text-white/80 hover:text-white"
              >
                All Products
              </Link>
              <Link
                href={"all-services"}
                className="hover:underline hover:cursor-pointer text-white/80 hover:text-white"
              >
                All Services
              </Link>
              <Link
                href={"/services"}
                className="hover:underline hover:cursor-pointer text-white/80 hover:text-white"
              >
                View Service Categories
              </Link>
              <Link
                href={"/products"}
                className="hover:underline hover:cursor-pointer text-white/80 hover:text-white"
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
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Registration & Legal */}
          <div className="flex flex-col gap-3">
            <div className="text-white/50 uppercase tracking-widest text-[9px] sm:text-[10px] font-semibold mb-1">
              Legal
            </div>
            <div className="flex flex-col gap-2 text-xs sm:text-sm">
              <div className="flex items-start gap-2">
                <span className="text-white/40 shrink-0">Reg.</span>
                <span className="text-white/80">32340910801081</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-white/40 shrink-0">VAT</span>
                <span className="text-white/80">619809012</span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-3">
            <div className="text-white/50 uppercase tracking-widest text-[9px] sm:text-[10px] font-semibold mb-1">
              Address
            </div>
            <div className="text-white/80 leading-relaxed text-xs sm:text-sm">
              Digital Marmat Pvt. Ltd.
              <br />
              Machhapokhari-16, Kathmandu
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-white/40 shrink-0 text-xs">Main Office</span>
              <span className="inline-block w-1 h-1 rounded-full bg-white/30"></span>
              <span className="text-white/80 text-xs">Kathmandu</span>
            </div>
          </div>

          {/* Support & Contact */}
          <div className="flex flex-col gap-3">
            <div className="text-white/50 uppercase tracking-widest text-[9px] sm:text-[10px] font-semibold mb-1">
              Contact & Support
            </div>
            <a
              href="mailto:info@digitalmarmat.com"
              className="text-white/80 hover:text-white hover:underline transition-colors text-xs sm:text-sm"
            >
              info@digitalmarmat.com
            </a>
            <div className="flex flex-col gap-2 mt-2 border-l-2 border-white/20 pl-3 text-xs sm:text-sm">
              <div className="text-white/40 text-[9px] sm:text-[10px] uppercase tracking-wide">
                Support
              </div>
              <div className="text-white/80">Pawan Thapa</div>
              <a
                href="tel:+9779802362210"
                className="text-white/80 hover:text-white hover:underline transition-colors break-all"
              >
                +977 9802362210
              </a>
              <a
                href="mailto:info@digitalmarmat.com"
                className="text-white/80 hover:text-white hover:underline transition-colors break-all"
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-6 sm:py-8 font-general-sans text-xs sm:text-sm">
        <div className="text-center sm:text-left text-white/80">
          © 2026 All right reserved. Digital Marmat
        </div>
        <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-8 text-xs">
          <Link
            href={"/terms-and-conditions"}
            className="hover:underline hover:cursor-pointer text-white/80 hover:text-white transition-colors"
          >
            Terms and Condition
          </Link>
          <div className="hover:underline hover:cursor-pointer text-white/80 hover:text-white transition-colors cursor-pointer">
            Privacy Policy
          </div>
        </div>
      </div>
    </div>
  );
}
