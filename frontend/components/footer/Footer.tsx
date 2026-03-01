import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube, FaGooglePlay, FaAppStore } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

export default async function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-16">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#ed1e24] via-[#2a6ec4] to-[#ed1e24]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Brand column */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <img
              src="https://digitalmarmat.com/storage/logos/gEVabFzg45sg6WjAQYBRlTRAeQDERAS1CVTvZuhj.jpg"
              alt="Digital Marmat"
              className="h-10 w-auto rounded-lg object-contain"
            />
            <p className="text-sm leading-relaxed text-slate-500">
              Nepal's trusted platform for home services — AC, plumbing, electrician, TV mounting & more.
            </p>
            <div className="flex gap-3 mt-1">
              <a href="https://facebook.com/digitalmarmat" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#1d58a9] flex items-center justify-center transition-colors" aria-label="Facebook">
                <FaFacebook size={15} />
              </a>
              <a href="https://instagram.com/digitalmarmat" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#1d58a9] flex items-center justify-center transition-colors" aria-label="Instagram">
                <FaInstagram size={15} />
              </a>
              <a href="https://youtube.com/@digitalmarmat" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#ed1e24] flex items-center justify-center transition-colors" aria-label="YouTube">
                <FaYoutube size={15} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Services</h4>
            {[
              { label: "AC Service", href: "/services?category=ac" },
              { label: "Plumbing", href: "/services?category=plumbing" },
              { label: "Electrician", href: "/services?category=electrician" },
              { label: "TV Mounting", href: "/services?category=tv" },
              { label: "Washing Machine", href: "/services?category=washing-machine" },
              { label: "Painting", href: "/services?category=painting" },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="text-sm hover:text-[#2a6ec4] transition-colors">
                {label}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Company</h4>
            {[
              { label: "About Us", href: "/about" },
              { label: "Blogs", href: "/blogs" },
              { label: "Contact Us", href: "/contact" },
              { label: "Careers", href: "/careers" },
              { label: "Terms & Conditions", href: "/terms-and-conditions" },
              { label: "Privacy Policy", href: "/privacy-policy" },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="text-sm hover:text-[#2a6ec4] transition-colors">
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Contact</h4>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MdLocationOn size={17} className="mt-0.5 shrink-0 text-[#1d58a9]" />
                <span className="leading-snug">Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MdPhone size={16} className="shrink-0 text-[#1d58a9]" />
                <a href="tel:+977-1-0000000" className="hover:text-[#2a6ec4] transition-colors">
                  +977-1-0000000
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MdEmail size={16} className="shrink-0 text-[#1d58a9]" />
                <a href="mailto:info@digitalmarmat.com" className="hover:text-[#2a6ec4] transition-colors">
                  info@digitalmarmat.com
                </a>
              </div>
            </div>

            <div className="mt-2">
              <p className="text-xs text-slate-600 mb-2 uppercase tracking-wider font-semibold">Get the App</p>
              <div className="flex gap-2">
                <a href="#"
                  className="flex items-center gap-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg transition-colors border border-slate-700">
                  <FaGooglePlay size={12} /> Google Play
                </a>
                <a href="#"
                  className="flex items-center gap-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg transition-colors border border-slate-700">
                  <FaAppStore size={12} /> App Store
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>© 2026 Digital Marmat. All rights reserved.</span>
          <div className="flex gap-5">
            <Link href="/terms-and-conditions" className="hover:text-[#2a6ec4] transition-colors">Terms & Conditions</Link>
            <Link href="/privacy-policy" className="hover:text-[#2a6ec4] transition-colors">Privacy Policy</Link>
            <Link href="/sitemap" className="hover:text-[#2a6ec4] transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}