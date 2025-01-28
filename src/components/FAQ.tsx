import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section className="py-20 bg-bourbon-50">
      <div className="container max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What makes bourbon-aged beef special?</AccordionTrigger>
            <AccordionContent>
              Our bourbon aging process infuses the beef with subtle flavors of vanilla, oak, and caramel while naturally tenderizing the meat. This unique process, combined with our premium cuts, creates an unparalleled dining experience.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How long is the aging process?</AccordionTrigger>
            <AccordionContent>
              Our beef is aged for a minimum of 30 days, with some premium cuts aged up to 60 days for maximum flavor development. Each cut is monitored daily to ensure optimal aging conditions.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How is the beef shipped?</AccordionTrigger>
            <AccordionContent>
              We ship all orders in specially designed, temperature-controlled packaging that maintains optimal freshness. Each order includes dry ice or gel packs to ensure your beef arrives in perfect condition.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;