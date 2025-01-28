import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section className="py-20 bg-bourbon-50">
      <div className="container max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>What makes Kentucky Bourbon Beef special?</AccordionTrigger>
            <AccordionContent>
              Our cattle are finished on nutrient-rich Bourbon Grains, which naturally enhances tenderness and creates an exceptional flavor profile. This sustainable process not only produces premium quality beef but also supports eco-friendly farming practices by repurposing valuable resources from Kentucky's bourbon industry.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do you ensure the quality of your beef?</AccordionTrigger>
            <AccordionContent>
              We partner with select Kentucky farmers who raise premium Black Angus cattle. Our master butchers hand-select only the finest cuts, which are then finished using our Bourbon Grains process. Each piece is carefully inspected to ensure it meets our high standards for marbling, texture, and flavor.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What is the Butcher Distiller's Cut™ certification?</AccordionTrigger>
            <AccordionContent>
              Our Butcher Distiller's Cut™ (BDC) certification indicates that the beef has been finished using our nutrient-rich Bourbon Grains process, developed in partnership with Kentucky's finest distilleries. This certification ensures you're getting authentic Kentucky Bourbon Beef with its signature flavor profile and exceptional tenderness.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>How is my order shipped?</AccordionTrigger>
            <AccordionContent>
              We ship all orders in premium temperature-controlled packaging to ensure your beef arrives in perfect condition. Each cut is vacuum-sealed at peak freshness and carefully packed with dry ice to maintain optimal temperature throughout transit. We currently ship to all continental United States addresses.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>What makes your process sustainable?</AccordionTrigger>
            <AccordionContent>
              Our innovative approach uses nutrient-rich Bourbon Grains from Kentucky's finest distilleries as cattle feed. This sustainable practice creates a unique partnership between Kentucky's bourbon and beef industries, supporting local farmers and distillers while producing exceptionally tender and flavorful beef with subtle bourbon-inspired notes.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;