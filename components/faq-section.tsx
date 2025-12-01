"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Scriber?",
    answer:
      "Scriber is a service ecosystem that creates high-quality Teaching Learning Materials (TLM) and provides full-scale digital marketing, branding, and design solutions for educational institutions and businesses.",
  },
  {
    question: "What services does Scriber offer?",
    answer:
      "We offer TLM development, branding, content creation, digital marketing, website support, design services, and sales auditing.",
  },
  {
    question: "What types of teaching materials do you provide?",
    answer:
      "We develop charts, models, classroom visuals, instructional aids, and custom educational resources for all levels.",
  },
  {
    question: "Can I request custom TLM designs?",
    answer:
      "Yes. All materials can be customized based on subject, grade level, theme, or curriculum needs.",
  },
  {
    question: "What branding services do you provide?",
    answer:
      "Logo design, visual identity creation, brand strategy, social media identity, and marketing assets.",
  },
  {
    question: "Do you handle social media promotions?",
    answer:
      "Yes. We manage online presence, create content, promote products, and collaborate with popular YouTube channels and influencers.",
  },
  {
    question: "How are charges calculated?",
    answer:
      "Pricing depends on the service:\n• TLM based on size, material, and customization\n• Branding based on scope and deliverables\n• Digital marketing based on duration and platform",
  },
  {
    question: "Do you offer nationwide delivery?",
    answer:
      "Yes, we ship teaching materials and provide digital services across India.",
  },
];

export function FAQSection() {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleValueChange = (value: string) => {
    if (value && visibleCount < faqs.length) {
      // When a user opens an item, show one more (if available)
      setVisibleCount((prev) => Math.min(prev + 2, faqs.length));
    }
  };

  return (
    <section className="py-24 bg-background relative">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/60 pb-6"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3">
              FAQs
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Everything you need to know about us.
            </p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Support
            </p>
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <Accordion
            type="single"
            collapsible
            onValueChange={handleValueChange}
            className="w-full"
          >
            {faqs.slice(0, visibleCount).map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base md:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            {visibleCount < faqs.length ? (
              <p className="text-sm text-muted-foreground animate-pulse">
                Click on a question to reveal more...
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Have more questions?{" "}
                <a
                  href="/contact"
                  className="text-primary hover:underline font-medium"
                >
                  Contact us
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
