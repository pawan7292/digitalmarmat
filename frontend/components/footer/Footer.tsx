"use client";

import Image from "next/image";
import Link from "next/link";
import { Ultra } from "next/font/google";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { useState } from "react";

const ultrafont = Ultra({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-brand-raiden-900 text-white px-4 sm:px-6 md:px-12 lg:px-24 text-xs sm:text-sm">
      {/* Top section with logo and links */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 py-8 md:py-12">
        {/* Logo and tagline - This will stay on the Left */}
        <div className="flex flex-col gap-4 justify-center">
          <Link href={"/"} className="flex min-w-0 shrink-0 items-center gap-2">
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
            {/* Social Icons remain here */}
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

        {/* Links sections — This will be pushed to the Right */}
        {/* Note: I removed flex-1 so it doesn't stretch and uses auto width instead */}
        <div className="flex flex-col sm:flex-row gap-12 md:gap-24 font-general-sans">
          <div className="flex flex-col gap-3">
            <div className="font-bold text-sm uppercase tracking-wider">
              Useful Links
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href={"/contact"}
                className="hover:underline text-white/80 hover:text-white"
              >
                Contact us
              </Link>
              <Link
                href={"/blogs"}
                className="hover:underline text-white/80 hover:text-white"
              >
                Blogs
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-bold text-sm uppercase tracking-wider">
              Services
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href={"/all-products"}
                className="hover:underline text-white/80 hover:text-white"
              >
                All Products
              </Link>
              <Link
                href={"all-services"}
                className="hover:underline text-white/80 hover:text-white"
              >
                All Services
              </Link>
              <Link
                href={"/services"}
                className="hover:underline text-white/80 hover:text-white"
              >
                View Service Categories
              </Link>
              <Link
                href={"/products"}
                className="hover:underline text-white/80 hover:text-white"
              >
                View Product Categories
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[2px] bg-white"></div>

      <div className="py-4 font-general-sans">
        <button
          onClick={() => setOpen(!open)}
          className="flex md:hidden w-full items-center justify-between py-2 text-white/60 text-xs uppercase tracking-widest"
        >
          <span>Company Info</span>
          <span
            className="text-white/60 text-base transition-transform duration-300"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ▾
          </span>
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 md:block ${open ? "max-h-[500px]" : "max-h-0 md:max-h-none"}`}
        >
          {/* FIX: Changed lg:grid-cols-4 to lg:grid-cols-3 to remove the horizontal gap on the right */}
          <div className="flex flex-col gap-6 md:grid md:grid-cols-3 lg:gap-8 py-4">
            <div className="flex flex-col gap-3">
              <div className="text-white/50 uppercase tracking-widest text-[10px] font-semibold">
                Legal
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-white/80">Reg. 323409/080/081</p>
                <p className="text-white/80">VAT 619809012</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-white/50 uppercase tracking-widest text-[10px] font-semibold">
                Address
              </div>
              <p className="text-white/80">
                Digital Marmat Pvt. Ltd.
                <br />
                Machhapokhari-16, Kathmandu
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-white/50 uppercase tracking-widest text-[10px] font-semibold">
                Contact & Support
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:info@digitalmarmat.com"
                  className="text-white/80 hover:underline"
                >
                  info@digitalmarmat.com
                </a>
                <div className="border-l-2 border-white/20 pl-3">
                  <a
                    href="tel:+9779802362210"
                    className="text-white/80 hover:underline"
                  >
                    +977 9802362210
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-white/30"></div>

      {/* FIX: Reduced vertical padding from py-6/8 to py-4 to fix the bottom gap */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-4 font-general-sans text-xs">
        <div className="text-white/80">
          © 2026 All right reserved. Digital Marmat
        </div>
        <div className="flex gap-6">
          <Link
            href={"/terms-and-conditions"}
            className="hover:underline text-white/80"
          >
            Terms and Condition
          </Link>
          <Link
            href={"/privacy-policy"}
            className="hover:underline text-white/80"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
