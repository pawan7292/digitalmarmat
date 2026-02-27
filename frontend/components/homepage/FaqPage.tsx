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

  const { data, isLoading, isError } = useGetAllFaq({
    page: faqPage,
  });

  const faqsData = data?.data?.data || [];
  const currentPage = data?.data?.current_page || 1;
  const lastPage = data?.data?.last_page || 1;

  return (
    <div className="p-4 px-8 flex flex-col gap-8">
      <div className="text-2xl font-bold">
        Frequently Asked Questions
      </div>

      <Accordion type="single" collapsible>
        {faqsData.map((eachFaq: any) => (
          <AccordionItem
            value={`item-${eachFaq.question}`}
            key={eachFaq.question}
          >
            <AccordionTrigger className="font-bold">
              {eachFaq.question}
            </AccordionTrigger>
            <AccordionContent>
              {eachFaq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Pagination */}
      <div className="flex gap-2 justify-center items-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setFaqPage((prev) => prev - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: lastPage }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setFaqPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === lastPage}
          onClick={() => setFaqPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}