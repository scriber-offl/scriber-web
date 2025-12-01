"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Quote, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote:
      "The charts are neatly presented with accurate content and appropriate illustrations. They serve as an excellent visual aid for reinforcing key concepts among students. These charts display clear labeling, attractive colour combinations, and a logical arrangement of information, making them highly effective as teaching aids.",
    author: "B.Ed Student",
    location: "Chennai",
  },
  {
    quote:
      "Outstanding Chart with vibrant colourful textures done by Scriber for my teaching practice.",
    author: "B.Ed Student",
    location: "Chennai",
  },
  {
    quote:
      "I came to know about this project works through my friend... And I approached them 20th September and shared my requirements and timeliness ... They done each and every step with sound knowledge in the charts, working and dummy model for class 11 (physics) and class 7 (Science).. The work was clear, neat and I received it on time.. On a whole they done a great clear work and my teachers got impressed.. Thank you team Scriber for giving me such a work...",
    author: "B.Ed Student",
    location: "Coimbatore",
  },
  {
    quote:
      "I am extremely satisfied with the work done by Scriber for my B.Ed teaching aid projects. You have provided me the high quality chart work, a well crafted working model, and an innovative LED light matching board for my literature course. Your attention to detail, creativity, and precision in work exceeded my expectations. What impressed me the most was your speed and efficiency you completed everything in just three days while maintaining top-notch quality. The material was visually appealing, durable, and made learning more interactive and engaging. Your team was professional, punctual, and very cooperative in understanding my requirements. I would highly recommend Scriber to one looking for expertly designed educational aids with quick turnaround time.",
    author: "B.Ed Student",
    location: "Tiruchirapalli",
  },
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 200;
  const shouldTruncate = testimonial.quote.length > maxLength;

  const displayQuote =
    isExpanded || !shouldTruncate
      ? testimonial.quote
      : `${testimonial.quote.slice(0, maxLength)}...`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="break-inside-avoid"
    >
      <div className="group relative bg-card/30 border border-border p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-none flex flex-col min-h-[320px]">
        {/* Sharp corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <Quote className="w-10 h-10 text-primary/20 mb-6 group-hover:text-primary/40 transition-colors" />

        <div className="mb-6 flex-grow">
          <p className="text-base text-muted-foreground leading-relaxed font-light inline">
            &quot;{displayQuote}&quot;
          </p>
          {shouldTruncate && (
            <Button
              variant="link"
              className="px-0 ml-2 h-auto font-normal text-primary"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Read less" : "Read more"}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-border pt-6">
          <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary rounded-none">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-foreground">
              {testimonial.author}
            </h4>
            <p className="text-muted-foreground uppercase tracking-wider text-xs">
              {testimonial.location}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />

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
              Hear from our Clients
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Trusted by students and educators. Real feedback from our
              community.
            </p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Client Stories
            </p>
          </div>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-2 gap-6 space-y-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
