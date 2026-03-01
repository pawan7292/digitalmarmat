"use client";

import { useGetAllFaq } from "@/hooks/useFaq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useState } from "react";

export default function FaqPage() {
  const [faqPage, setFaqPage] = useState(1);

  const { data, isLoading } = useGetAllFaq({ page: faqPage });

  const faqsData = data?.data?.data || [];
  const currentPage = data?.data?.current_page || 1;
  const lastPage = data?.data?.last_page || 1;

  return (
    <section className="bg-slate-50 border-t border-slate-100 px-6 md:px-12 py-14">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest uppercase text-[#1d58a9] mb-1">Got Questions?</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="mt-2 h-1 w-10 rounded-full bg-gradient-to-r from-[#ed1e24] to-[#1d58a9]" />
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-14 rounded-xl bg-white border border-slate-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <Accordion type="single" collapsible className="flex flex-col gap-2">
            {faqsData.map((faq: any) => (
              <AccordionItem
                key={faq.question}
                value={`item-${faq.question}`}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white px-4"
              >
                <AccordionTrigger className="text-sm font-bold text-slate-800 text-left py-4 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-slate-500 leading-relaxed pb-4 border-t border-slate-100 pt-3">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {lastPage > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            <button
              disabled={currentPage === 1}
              onClick={() => setFaqPage((p) => p - 1)}
              className="px-4 py-1.5 text-sm font-semibold border border-slate-200 rounded-lg bg-white text-slate-600 hover:border-[#2a6ec4] hover:text-[#1d58a9] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              ← Prev
            </button>

            {Array.from({ length: lastPage }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setFaqPage(n)}
                className={`px-3.5 py-1.5 text-sm font-bold rounded-lg border transition-all ${
                  currentPage === n
                    ? "bg-[#1d58a9] border-[#1d58a9] text-white"
                    : "bg-white border-slate-200 text-slate-600 hover:border-[#2a6ec4] hover:text-[#1d58a9]"
                }`}
              >
                {n}
              </button>
            ))}

            <button
              disabled={currentPage === lastPage}
              onClick={() => setFaqPage((p) => p + 1)}
              className="px-4 py-1.5 text-sm font-semibold border border-slate-200 rounded-lg bg-white text-slate-600 hover:border-[#2a6ec4] hover:text-[#1d58a9] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}