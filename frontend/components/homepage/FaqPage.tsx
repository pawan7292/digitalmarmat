import { useGetAllFaq } from "@/hooks/useFaq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function FaqPage() {
  const { data, isLoading, isError } = useGetAllFaq();
  const faqsData = data?.data?.data || [];
  return (
    <div className="p-4 px-8 flex flex-col gap-8">
      <div className="text-2xl font-bold">Frequently Asked Questions</div>
      <Accordion type="single" collapsible defaultValue="item-1" className="">
        {faqsData.map((eachFaq: any) => {
          console.log(eachFaq);
          return (
            <AccordionItem
              value={`item-${eachFaq.question}`}
              key={eachFaq.question}
              className=""
            >
              <AccordionTrigger className="font-bold">{eachFaq.question}</AccordionTrigger>
              <AccordionContent>{eachFaq.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
