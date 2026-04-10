// app/terms/page.tsx  (or pages/terms.tsx for Pages Router)
// Drop this file into your Next.js project.
// Styling is done with Tailwind CSS — ensure Tailwind is configured.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — Digital Marmat",
  description:
    "Read Digital Marmat's Terms and Conditions for purchasing electronics and booking repair services in Nepal.",
};

// ─── Data ────────────────────────────────────────────────────────────────────

const META = {
  effective: "April 02, 2026",
  updated: "April 02, 2026",
  jurisdiction: "Governed by Nepal law",
};

const TOC_ITEMS = [
  { num: "1", label: "Introduction & Acceptance", id: "s1" },
  { num: "2", label: "Eligibility", id: "s2" },
  { num: "3", label: "User Accounts", id: "s3" },
  { num: "4", label: "Products & Services", id: "s4" },
  { num: "5", label: "Ordering & Pricing", id: "s5" },
  { num: "6", label: "Delivery & Shipping", id: "s6" },
  { num: "7", label: "Service Booking", id: "s7" },
  { num: "8", label: "Returns & Refunds", id: "s8" },
  { num: "9", label: "User Conduct", id: "s9" },
  { num: "10", label: "Intellectual Property", id: "s10" },
  { num: "11", label: "Liability", id: "s11" },
  { num: "12", label: "Indemnification", id: "s12" },
  { num: "13–15", label: "Privacy, Termination & Changes", id: "s13" },
  { num: "16–18", label: "Governing Law & Contact", id: "s16" },
];

const PAYMENT_TAGS = ["eSewa", "Khalti", "IME Pay", "Bank transfer", "Card payments"];
const PRODUCT_TAGS = [
  "Electronic appliances",
  "Consumer electronics",
  "IT equipment",
  "Repair & servicing",
  "Installation",
  "Maintenance",
];

const REFUND_GRID = [
  { label: "Product cancellations", value: "Within 24 hours of placement" },
  { label: "Physical product returns", value: "7 days — unused, original packaging" },
  { label: "Electronics replacement", value: "7–15 days for manufacturing defects" },
  { label: "Refund processing", value: "7–14 business days after approval" },
];

const CONTACT = [
  { label: "Email", value: "support@digitalmarmat.com" },
  { label: "Phone", value: "+977 9802362210" },
  { label: "Address", value: "TA.NA.PA -02, Kathmandu, Nepal" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionBadge({ num }: { num: string }) {
  return (
    <span className="inline-flex h-7 min-w-[1.75rem] shrink-0 items-center justify-center rounded-md bg-[#1d58a9] px-1.5 text-xs font-medium text-white mt-0.5">
      {num}
    </span>
  );
}

function SectionTitle({ id, num, children }: { id: string; num: string; children: React.ReactNode }) {
  return (
    <div id={id} className="flex items-start gap-3 mb-3">
      <SectionBadge num={num} />
      <h2 className="text-[15px] font-medium text-gray-900 leading-snug pt-0.5">{children}</h2>
    </div>
  );
}

function HighlightBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-[3px] border-[#1d58a9] bg-blue-50 rounded-r-md px-4 py-3 my-3 text-sm text-[#1d3f78] leading-relaxed">
      {children}
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="text-xs px-2.5 py-1 rounded-full bg-[#e8f0fb] text-[#1d58a9] border border-[#c5d9f5]">
      {label}
    </span>
  );
}

function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-sm text-gray-500 leading-relaxed ${className}`}>{children}</p>
  );
}

function Divider() {
  return <div className="border-t border-gray-100 my-8" />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* ── Header ── */}
        <div className="bg-[#1d58a9] rounded-2xl px-8 py-8 mb-8">
          {/* Logo row */}
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span className="text-white font-medium text-[15px] tracking-wide">Digital Marmat</span>
          </div>

          <h1 className="text-white text-2xl font-medium mb-4 leading-snug">
            Terms &amp; Conditions
          </h1>

          <div className="flex flex-wrap gap-2">
            {[`Effective: ${META.effective}`, `Last updated: ${META.updated}`, META.jurisdiction].map(
              (pill) => (
                <span
                  key={pill}
                  className="text-xs text-white/75 bg-white/10 px-3 py-1 rounded-full"
                >
                  {pill}
                </span>
              )
            )}
          </div>
        </div>

        {/* ── Table of Contents ── */}
        <div className="bg-blue-50 border border-[#c5d9f5] rounded-2xl px-6 py-5 mb-10">
          <p className="text-[11px] font-medium text-[#1d58a9] uppercase tracking-widest mb-3">
            Contents
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-6">
            {TOC_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-baseline gap-2 text-sm text-[#1d58a9] py-1 hover:underline"
              >
                <span className="text-[11px] text-[#4a82c9] min-w-[20px]">{item.num}</span>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Section 1 ── */}
        <section>
          <SectionTitle id="s1" num="1">Introduction and acceptance of terms</SectionTitle>
          <Body>
            Digital Marmat operates an online platform offering the sale of electronic appliances,
            consumer electronics, accessories, and related products, as well as booking of repair,
            maintenance, installation, and other services.
          </Body>
          <HighlightBox>
            By accessing, registering, placing an order, or booking any service on Digital Marmat,
            you agree to be legally bound by these Terms. If you do not agree, you must immediately
            stop using the platform.
          </HighlightBox>
        </section>

        <Divider />

        {/* ── Section 2 ── */}
        <section>
          <SectionTitle id="s2" num="2">Eligibility</SectionTitle>
          <Body>
            You must be at least 18 years old (or the age of majority in your jurisdiction) and
            capable of forming a binding contract. By using the platform you represent and warrant
            that you meet these requirements. We reserve the right to refuse service, terminate
            accounts, or cancel orders at our sole discretion.
          </Body>
        </section>

        <Divider />

        {/* ── Section 3 ── */}
        <section>
          <SectionTitle id="s3" num="3">User accounts</SectionTitle>
          <Body>
            To purchase products or book services, you may need to create an account. You are
            responsible for maintaining the confidentiality of your account credentials and for all
            activities that occur under your account. Notify us immediately of any unauthorized use.
          </Body>
        </section>

        <Divider />

        {/* ── Section 4 ── */}
        <section>
          <SectionTitle id="s4" num="4">Products and services offered</SectionTitle>
          <Body>
            Digital Marmat sells new and (where indicated) refurbished electronic appliances,
            gadgets, home appliances, IT equipment, and other goods. We also provide booking for
            repair, servicing, installation, maintenance, and other related services.
          </Body>
          <div className="flex flex-wrap gap-2 my-3">
            {PRODUCT_TAGS.map((t) => <Tag key={t} label={t} />)}
          </div>
          <Body>
            All services are subject to technician availability, location (primarily within
            Kathmandu Valley and other parts of Nepal), and technical feasibility. Product
            descriptions, images, specifications, and prices may contain unintentional errors.
          </Body>
        </section>

        <Divider />

        {/* ── Section 5 ── */}
        <section>
          <SectionTitle id="s5" num="5">Ordering and pricing</SectionTitle>
          <Body>
            All prices are in Nepalese Rupees (NPR) and inclusive of applicable taxes unless stated
            otherwise. Prices and availability are subject to change without notice.
          </Body>
          <Body className="mt-2">Payment must be made through approved payment gateways displayed on the platform:</Body>
          <div className="flex flex-wrap gap-2 my-3">
            {PAYMENT_TAGS.map((t) => <Tag key={t} label={t} />)}
          </div>
          <Body>All payments are final except where the refund policy applies.</Body>
        </section>

        <Divider />

        {/* ── Section 6 ── */}
        <section>
          <SectionTitle id="s6" num="6">Delivery and shipping</SectionTitle>
          <Body>
            Delivery timelines are estimates only and not guaranteed. Risk of loss or damage passes
            to you upon delivery to the address provided. Title to products remains with Digital
            Marmat until full payment is received.
          </Body>
        </section>

        <Divider />

        {/* ── Section 7 ── */}
        <section>
          <SectionTitle id="s7" num="7">Service booking and execution</SectionTitle>
          <Body>
            Service bookings must be made through the platform and confirmed by us. You must provide
            accurate device details, fault description, and access to the premises. Additional
            charges may apply for parts or work not covered in the original booking.
          </Body>
        </section>

        <Divider />

        {/* ── Section 8 ── */}
        <section>
          <SectionTitle id="s8" num="8">Cancellations, returns, refunds &amp; warranty</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
            {REFUND_GRID.map((item) => (
              <div
                key={item.label}
                className="bg-gray-50 rounded-xl px-4 py-3"
              >
                <p className="text-[11px] text-gray-400 mb-1">{item.label}</p>
                <p className="text-[13px] font-medium text-gray-800">{item.value}</p>
              </div>
            ))}
          </div>
          <Body>
            Services: once commenced or parts are ordered, cancellation/refund is at our discretion
            and may incur a service fee. Software-related issues or user damage are excluded from
            the electronics replacement policy. Refunds are processed to the original payment method
            within 7–14 business days after inspection and approval.
          </Body>
        </section>

        <Divider />

        {/* ── Section 9 ── */}
        <section>
          <SectionTitle id="s9" num="9">User conduct and prohibited activities</SectionTitle>
          <Body>
            You agree not to use the platform for any unlawful purpose, upload false information,
            infringe intellectual property, post harmful content, attempt to gain unauthorized
            access, interfere with the platform, engage in price manipulation, or resell products or
            services without our prior written consent. We may suspend or terminate your account for
            any violation.
          </Body>
        </section>

        <Divider />

        {/* ── Section 10 ── */}
        <section>
          <SectionTitle id="s10" num="10">Intellectual property</SectionTitle>
          <Body>
            All content, logos, trademarks, product images, and software on Digital Marmat are
            owned by or licensed to us. You are granted a limited, revocable license to use the
            platform for personal, non-commercial purposes only. Any other use is strictly
            prohibited.
          </Body>
        </section>

        <Divider />

        {/* ── Section 11 ── */}
        <section>
          <SectionTitle id="s11" num="11">Disclaimers and limitation of liability</SectionTitle>
          <Body>
            The platform and all products/services are provided &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; without any warranties, express or implied, including merchantability
            or fitness for a particular purpose.
          </Body>
          <HighlightBox>
            To the maximum extent permitted by law, Digital Marmat&apos;s total liability shall not
            exceed the amount paid by you for the specific product or service giving rise to the
            claim. We are not liable for indirect, consequential, incidental, or punitive damages.
          </HighlightBox>
        </section>

        <Divider />

        {/* ── Section 12 ── */}
        <section>
          <SectionTitle id="s12" num="12">Indemnification</SectionTitle>
          <Body>
            You agree to indemnify and hold Digital Marmat, its officers, directors, employees, and
            agents harmless from any claims, losses, damages, liabilities, and expenses (including
            legal fees) arising out of your use of the platform, violation of these Terms, or
            infringement of any third-party rights.
          </Body>
        </section>

        <Divider />

        {/* ── Sections 13–15 ── */}
        <section>
          <SectionTitle id="s13" num="13–15">Privacy, termination, and changes to terms</SectionTitle>
          <Body>
            Your personal data is processed in accordance with our Privacy Policy (available on the
            platform). We may terminate or suspend your access at any time, with or without notice,
            for any reason. Sections that by their nature survive termination (liability,
            indemnification, governing law) shall continue.
          </Body>
          <Body className="mt-2">
            We may update these Terms at any time. Continued use of the platform after changes
            constitutes your acceptance of the revised Terms.
          </Body>
        </section>

        <Divider />

        {/* ── Sections 16–17 ── */}
        <section>
          <SectionTitle id="s16" num="16–17">Governing law, disputes &amp; miscellaneous</SectionTitle>
          <Body>
            These Terms are governed by the laws of Nepal. Disputes shall first be resolved
            amicably; if not settled within 30 days, the dispute shall be submitted to the exclusive
            jurisdiction of the courts of Kathmandu, Nepal. Force majeure events (acts of God, war,
            strikes, pandemics, government restrictions) excuse our performance.
          </Body>
        </section>

        <Divider />

        {/* ── Section 18 Contact ── */}
        <section id="s18">
          <div className="flex items-start gap-3 mb-4">
            <SectionBadge num="18" />
            <h2 className="text-[15px] font-medium text-gray-900 pt-0.5">Contact us</h2>
          </div>

          <div className="bg-[#1d58a9] rounded-2xl px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {CONTACT.map((item) => (
              <div key={item.label}>
                <p className="text-[11px] text-white/60 uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p className="text-sm text-white font-medium break-all">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Accept bar ── */}
        <div className="mt-10 bg-blue-50 border border-[#c5d9f5] rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-[#1d3f78] leading-relaxed max-w-lg">
            By continuing to use Digital Marmat, you confirm that you have read, understood, and
            agree to these Terms and Conditions.
          </p>
          <a
            href="/"
            className="shrink-0 bg-[#1d58a9] hover:bg-[#174d96] active:scale-[0.98] transition-all text-white text-sm font-medium px-5 py-2.5 rounded-xl"
          >
            I agree to the Terms
          </a>
        </div>

      </div>
    </main>
  );
}