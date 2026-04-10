"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Specification {
  name: string;
  value: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  description?: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  source_code: string;
  category: Category;
  sub_category: Category;
  brand: string;
  model: string;
  capacity: string;
  specification: Specification[];
  images: string[];
  description: string;
  price: string;
  stock: number;
  popular?: number;
  warranty: string;
  discount: string;
  seo_description?: string;
  seo_title?: string;
}

interface ProductDetailProps {
  product: Product;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(price: string): string {
  return "Rs. " + Number(price).toLocaleString("en-NP");
}

function discountedPrice(price: string, discount: string): string {
  const orig = parseFloat(price);
  const disc = parseFloat(discount);
  const final = orig - (orig * disc) / 100;
  return formatPrice(final.toFixed(2));
}

/** Minimal markdown-ish renderer for the description field */
function renderDescription(md: string) {
  const lines = md.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = (key: string) => {
    if (listItems.length) {
      elements.push(
        <ul
          key={key}
          className="list-disc pl-5 space-y-1 text-[#4b5563] mb-3 text-[15px]"
        >
          {listItems.map((li, i) => (
            <li key={i}>{li}</li>
          ))}
        </ul>,
      );
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    const key = String(i);
    if (line.startsWith("# ")) {
      flushList(key + "ul");
      elements.push(
        <h1
          key={key}
          className="text-2xl font-bold text-[#153f7a] mb-2 font-serif"
        >
          {line.slice(2)}
        </h1>,
      );
    } else if (line.startsWith("## ")) {
      flushList(key + "ul");
      elements.push(
        <h2 key={key} className="text-lg font-bold text-[#1d58a9] mt-5 mb-2">
          {line.slice(3)}
        </h2>,
      );
    } else if (line.startsWith("* ")) {
      listItems.push(line.slice(2).replace(/\*\*(.*?)\*\*/g, "$1"));
    } else if (line.trim() === "") {
      flushList(key + "ul");
    } else {
      flushList(key + "ul");
      const formatted = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      elements.push(
        <p
          key={key}
          className="text-[#4b5563] mb-2 text-[15px] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatted }}
        />,
      );
    }
  });
  flushList("final");
  return elements;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ImageGallery({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="lg:sticky lg:top-24">
      {/* Main Image */}
      <div className="relative bg-white rounded-2xl border border-[#e5e7eb] shadow-[0_4px_24px_rgba(29,88,169,0.10)] overflow-hidden aspect-square flex items-center justify-center group mb-3">
        <span className="absolute top-3 left-3 z-10 bg-[#16a34a] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          In Stock
        </span>
        <span className="absolute bottom-3 right-3 z-10 bg-black/40 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
          {active + 1} / {images.length}
        </span>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${images[active]}`}
          alt={productName}
          fill
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 flex-wrap">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-[70px] h-[70px] rounded-xl border-2 overflow-hidden bg-white flex items-center justify-center flex-shrink-0 transition-all duration-200
              ${
                active === i
                  ? "border-[#1d58a9] shadow-[0_0_0_3px_#d0e2f8]"
                  : "border-[#e5e7eb] hover:border-[#1d58a9]/50"
              }`}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${src}`}
              alt={`Thumbnail ${i + 1}`}
              width={70}
              height={70}
              className="object-contain p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function PriceBlock({ price, discount }: { price: string; discount: string }) {
  const orig = formatPrice(price);
  const final = discountedPrice(price, discount);
  const pct = parseFloat(discount);

  return (
    <div className="flex items-center gap-3 flex-wrap bg-[#e8f0fb] border-l-4 border-[#1d58a9] rounded-xl px-5 py-4">
      <span className="text-[#1d58a9] text-2xl font-bold">{final}</span>
      <span className="text-[#9ca3af] text-base line-through">{orig}</span>
      {pct > 0 && (
        <span className="ml-auto bg-[#dc2626] text-white text-xs font-bold px-3 py-1 rounded-full">
          -{pct}% OFF
        </span>
      )}
    </div>
  );
}

function QuickSpecs({
  brand,
  model,
  capacity,
  warranty,
  specs,
}: {
  brand: string;
  model: string;
  capacity: string;
  warranty: string;
  specs: Specification[];
}) {
  const baseSpecs = [
    { name: "Brand", value: brand },
    { name: "Model", value: model },
    { name: "Capacity", value: capacity },
    { name: "Warranty", value: warranty },
  ];

  const extraSpecs = specs.filter(
    (s) => !["brand"].includes(s.name.toLowerCase()),
  );

  const allSpecs = [...baseSpecs, ...extraSpecs].slice(0, 6);

  return (
    <div className="grid grid-cols-2 gap-2">
      {allSpecs.map((s, index) => (
        <div
          key={`${s.name}-${index}`}
          className="flex flex-col bg-white border border-[#e5e7eb] rounded-lg px-3 py-2.5"
        >
          <span className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-0.5">
            {s.name}
          </span>
          <span className="text-sm font-semibold text-[#1a1d23]">
            {s.value}
          </span>
        </div>
      ))}
    </div>
  );
}

type TabKey = "overview" | "specifications" | "moreinfo";

function Tabs({ product }: { product: Product }) {
  const [active, setActive] = useState<TabKey>("overview");

  const tabs: { key: TabKey; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "specifications", label: "Specifications" },
    { key: "moreinfo", label: "More Info" },
  ];

  const moreInfoCards = [
    {
      icon: "🚚",
      title: "Delivery",
      desc: "Kathmandu Valley: 1–2 days. Outside: 3–5 business days.",
    },
    {
      icon: "🛡️",
      title: "Warranty",
      desc: `${product.warranty} manufacturer warranty. Original receipt required.`,
    },
    {
      icon: "↩️",
      title: "Returns",
      desc: "7-day replacement on manufacturing defects.",
    },
    {
      icon: "💳",
      title: "Payment",
      desc: "eSewa, Khalti, bank transfer, or cash on delivery.",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-[0_2px_12px_rgba(29,88,169,0.07)] overflow-hidden">
      {/* Tab Nav */}
      <div className="flex overflow-x-auto border-b-2 border-[#e5e7eb] [-webkit-overflow-scrolling:touch]">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`shrink-0 px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all duration-200 border-b-[2.5px] -mb-[2px] sm:px-6 sm:py-4
              ${
                active === t.key
                  ? "text-[#1d58a9] border-[#1d58a9] bg-[#e8f0fb]"
                  : "text-[#6b7280] border-transparent hover:text-[#1d58a9] hover:bg-[#f8faff]"
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="p-6 md:p-8">
        {active === "overview" && (
          <div>{renderDescription(product.description)}</div>
        )}

        {active === "specifications" && (
          <div className="-mx-2 overflow-x-auto sm:mx-0">
          <table className="w-full min-w-[min(100%,520px)] border-collapse text-sm">
            <tbody>
              {[
                { label: "Brand", value: product.brand },
                { label: "Model", value: product.model },
                {
                  label: "Category",
                  value: `${product.category.name} / ${product.sub_category.name}`,
                },
                { label: "Capacity", value: product.capacity },
                { label: "Warranty", value: product.warranty },
                { label: "Stock", value: `${product.stock} units` },
                { label: "Source Code", value: product.source_code },
                ...product.specification,
              ].map((row, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-[#f8faff]" : "bg-white"}
                >
                  <td className="px-4 py-3 font-semibold text-[#153f7a] w-[40%] border border-[#e5e7eb] bg-[#e8f0fb]">
                    {"label" in row ? row.label : row.name}
                  </td>
                  <td className="px-4 py-3 text-[#1a1d23] border border-[#e5e7eb]">
                    {"label" in row ? row.value : row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}

        {active === "moreinfo" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {moreInfoCards.map((c) => (
              <div
                key={c.title}
                className="bg-[#f8faff] border border-[#e5e7eb] rounded-xl p-5 text-center"
              >
                <div className="text-3xl mb-2">{c.icon}</div>
                <h4 className="text-xs font-bold text-[#1d58a9] uppercase tracking-widest mb-1">
                  {c.title}
                </h4>
                <p className="text-xs text-[#6b7280] leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProductDetail({ product }: ProductDetailProps) {
  const whatsappMsg = encodeURIComponent(
    `I am interested in ${product.name} (${product.capacity})`,
  );

  return (
    <div className="min-h-screen bg-[#f8faff] font-sans">
      {/* Breadcrumb */}
      <div className="px-[5%] py-3 flex items-center gap-2 text-xs text-[#6b7280] flex-wrap border-b border-[#e5e7eb] bg-white">
        <Link href="/" className="text-[#1d58a9] font-medium hover:underline">
          Home
        </Link>
        <span className="text-[#d1d5db]">›</span>
        <Link
          href={`/products/${product.category.slug}`}
          className="text-[#1d58a9] font-medium hover:underline"
        >
          {product.category.name}
        </Link>
        <span className="text-[#d1d5db]">›</span>
        <Link
          href={`/products/${product.category.slug}/${product.sub_category.slug}`}
          className="text-[#1d58a9] font-medium hover:underline"
        >
          {product.sub_category.name}
        </Link>
        <span className="text-[#d1d5db]">›</span>
        <span className="text-[#1a1d23]">{product.name}</span>
      </div>

      {/* Page body */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-[5%] py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Top section: gallery + info */}
        <div className="grid grid-cols-1 gap-8 items-start md:grid-cols-2 md:gap-10">
          {/* Gallery */}
          <ImageGallery images={product.images} productName={product.name} />

          {/* Info */}
          <div className="flex flex-col gap-5">
            {/* Meta tags */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#e8f0fb] text-[#1d58a9] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.category.name}
              </span>
              <span className="bg-[#fef3c7] text-[#92400e] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.sub_category.name}
              </span>
              <span className="text-[#9ca3af] text-[11px] font-mono tracking-wide ml-auto">
                # {product.source_code}
              </span>
            </div>

            {/* Name */}
            <h1 className="text-3xl md:text-[2rem] font-bold text-[#1a1d23] leading-tight tracking-tight">
              {product.name}
            </h1>

            {/* Stock */}
            <div className="flex items-center gap-2 text-[#16a34a] text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
              In Stock — {product.stock} units available
            </div>

            {/* Price */}
            <PriceBlock price={product.price} discount={product.discount} />

            {/* Quick specs */}
            <QuickSpecs
              brand={product.brand}
              model={product.model}
              capacity={product.capacity}
              warranty={product.warranty}
              specs={product.specification}
            />

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">

                <Link
                  href={`https://wa.me/9779802362210?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#1dab54] text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-[0_4px_14px_rgba(37,211,102,0.25)] transition-all duration-200 hover:-translate-y-0.5"
                >
                  <WhatsAppIcon />
                  Chat on WhatsApp
                </Link>
              </div>
              {/* <button className="flex items-center justify-center gap-2 border-[1.5px] border-[#1d58a9] text-[#1d58a9] hover:bg-[#e8f0fb] text-sm font-semibold px-5 py-3 rounded-xl transition-colors duration-200">
                <DownloadIcon />
                Download Catalogue
              </button> */}
            </div>

            {/* Share */}
            {/* <div className="flex items-center gap-3 text-xs text-[#6b7280]">
              <span>Share via:</span>
              {["f", "in", "tw", "📋"].map((s) => (
                <button
                  key={s}
                  className="w-8 h-8 rounded-full bg-[#e8f0fb] border border-[#d0e2f8] text-[#1d58a9] flex items-center justify-center text-xs font-bold hover:bg-[#d0e2f8] transition-colors duration-150"
                >
                  {s}
                </button>
              ))}
            </div> */}
          </div>
        </div>

        {/* Tabs */}
        <Tabs product={product} />
      </div>
    </div>
  );
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function ShoppingCartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );
}
