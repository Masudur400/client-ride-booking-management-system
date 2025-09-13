import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import img from '../../../assets/images/faq-bg.png'

export default function FaqCard() {
  return (
    <div className="my-5 relative  h-[500px] py-16 px-6 flex items-center justify-center">
      {/* Background Image */}
      <img 
        src={img} 
        alt="FAQ Background" 
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Content */}
      <div className="relative bg-foreground/20 rounded-2xl p-8 max-w-3xl shadow-lg z-10">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 text-white">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full text-white">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I book a ride?</AccordionTrigger>
            <AccordionContent>
              Simply log in, choose your destination, and confirm your booking within seconds.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can drivers cancel rides?</AccordionTrigger>
            <AccordionContent>
              Drivers may cancel under special circumstances, but they are encouraged to complete all accepted rides.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is my payment secure?</AccordionTrigger>
            <AccordionContent>
              Yes, we use encrypted payment gateways to ensure secure transactions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
