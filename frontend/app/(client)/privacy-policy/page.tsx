import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Privacy Policy — Digital Marmat",
  description:
    "Learn how Digital Marmat collects, uses, and protects your personal information when booking repairs or purchasing electronics in Nepal.",
};

// ─── Data ────────────────────────────────────────────────────────────────────

const META = {
  effective: "May 11, 2026",
  updated: "May 11, 2026",
  jurisdiction: "Governed by Nepal Data Protection Laws",
};

const TOC_ITEMS = [
  { num: "1", label: "Information We Collect", id: "s1" },
  { num: "2", label: "How We Use Information", id: "s2" },
  { num: "3", label: "Sharing Your Information", id: "s3" },
  { num: "4", label: "Cookies & Tracking", id: "s4" },
  { num: "5", label: "Data Security", id: "s5" },
  { num: "6", label: "Your Rights", id: "s6" },
  { num: "7", label: "Contact Us", id: "s7" },
];

const DATA_TYPES = [
  "Contact details (Name, Email, Phone)",
  "Billing & Payment info",
  "Service logs & Fault history",
  "Device IP & Browser type",
  "Usage & Interaction data",
];

const SECURITY_MEASURES = [
  { label: "Data Protection", value: "End-to-end encryption for sensitive info" },
  { label: "Access Control", value: "Restricted staff access to personal data" },
  { label: "Infrastructure", value: "Regular security assessments & updates" },
  { label: "Transactions", value: "Secure payment gateway integration" },
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

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* ── Header ── */}
        <div className="bg-[#1d58a9] rounded-2xl px-8 py-8 mb-8">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
              </svg>
            </div>
            <span className="text-white font-medium text-[15px] tracking-wide">Digital Marmat</span>
          </div>

          <h1 className="text-white text-2xl font-medium mb-4 leading-snug">
            Privacy Policy
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
            Navigation
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

        {/* ── Introduction ── */}
        <section>
          <Body className="mb-6 italic">
            At Digital Marmat, your privacy is of utmost importance to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our platform. By accessing or using our services, you agree to the terms of this Privacy Policy.
          </Body>
        </section>

        {/* ── Section 1 ── */}
        <section>
          <SectionTitle id="s1" num="1">Information We Collect</SectionTitle>
          <Body>
            We collect information to provide and improve our repair services and product sales. This includes:
          </Body>
          <div className="flex flex-wrap gap-2 my-4">
            {DATA_TYPES.map((t) => <Tag key={t} label={t} />)}
          </div>
          <Body className="mt-3">
            <strong>Directly Provided:</strong> Information you share during registration or checkout. <br/>
            <strong>Automatically Collected:</strong> IP addresses, browser types, and usage data via cookies. <br/>
            <strong>Third Parties:</strong> Data from social media connections or payment partners.
          </Body>
        </section>

        <Divider />

        {/* ── Section 2 ── */}
        <section>
          <SectionTitle id="s2" num="2">How We Use Your Information</SectionTitle>
          <Body>
            We utilize your data to ensure the best service experience:
          </Body>
          <ul className="list-disc list-inside text-sm text-gray-500 space-y-2 mt-3 ml-2">
            <li>Maintaining the platform and processing transactions.</li>
            <li>Personalizing user experiences and platform functionality.</li>
            <li>Communicating updates, repair status, and promotions.</li>
            <li>Preventing fraudulent activities and unauthorized access.</li>
          </ul>
        </section>

        <Divider />

        {/* ── Section 3 ── */}
        <section>
          <SectionTitle id="s3" num="3">Sharing Your Information</SectionTitle>
          <Body>
            We do not sell your data. We share limited info with:
          </Body>
          <HighlightBox>
            <strong>Service Providers:</strong> Payment processors (eSewa, Khalti) and hosting providers. <br/>
            <strong>Legal Authorities:</strong> When required to comply with Nepal law or protect our rights.
          </HighlightBox>
        </section>

        <Divider />

        {/* ── Section 4 ── */}
        <section>
          <SectionTitle id="s4" num="4">Cookies and Tracking Technologies</SectionTitle>
          <Body>
            We use cookies to remember your preferences and analyze platform performance. You can manage cookie settings through your browser, though some platform features may be limited without them.
          </Body>
        </section>

        <Divider />

        {/* ── Section 5 ── */}
        <section>
          <SectionTitle id="s5" num="5">Data Security</SectionTitle>
          <Body>
            We implement robust security measures to protect your information from unauthorized access, alteration, or disclosure.
          </Body>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
            {SECURITY_MEASURES.map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-xl px-4 py-3">
                <p className="text-[11px] text-gray-400 mb-1">{item.label}</p>
                <p className="text-[13px] font-medium text-gray-800">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Section 6 ── */}
        <section>
          <SectionTitle id="s6" num="6">Your Rights</SectionTitle>
          <Body>
            As a user of Digital Marmat, you hold the following rights regarding your data:
          </Body>
          <div className="grid grid-cols-1 gap-2 mt-3">
            {[
              "Access, update, or delete your personal information.",
              "Opt out of receiving marketing communications.",
              "Restrict or object to specific data processing.",
              "Request a copy of the information we hold about you."
            ].map((right, i) => (
              <div key={i} className="flex items-center gap-3 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1d58a9]" />
                <span className="text-sm text-gray-700">{right}</span>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Section 7 Contact ── */}
        <section id="s7">
          <div className="flex items-start gap-3 mb-4">
            <SectionBadge num="7" />
            <h2 className="text-[15px] font-medium text-gray-900 pt-0.5">Contact Us</h2>
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

        {/* ── Footer Link ── */}
        <div className="mt-10 bg-blue-50 border border-[#c5d9f5] rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-[#1d3f78] leading-relaxed max-w-lg">
            Questions about your data? Our support team is here to help clarify our privacy practices.
          </p>
          <a
            href="/contact"
            className="shrink-0 bg-[#1d58a9] hover:bg-[#174d96] transition-all text-white text-sm font-medium px-5 py-2.5 rounded-xl"
          >
            Get in touch
          </a>
        </div>

      </div>
    </main>
  );
}