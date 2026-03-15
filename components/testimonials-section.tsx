"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const testimonials = [
  {
    quote:
      "The charts were neat, accurate, and visually strong. Clear labels, good color balance, and structured content made them effective teaching aids in class.",
    author: "Teacher Trainee",
    location: "Chennai",
  },
  {
    quote:
      "Outstanding chart quality for my teaching practice. The finish, colors, and presentation stood out immediately.",
    author: "Teacher Trainee",
    location: "Chennai",
  },
  {
    quote:
      "I shared my timeline and requirements, and the team delivered charts plus working and dummy models with strong subject clarity. Everything was neat, on time, and appreciated by my faculty.",
    author: "Teacher Trainee",
    location: "Coimbatore",
  },
  {
    quote:
      "Scriber delivered high-quality charts, a well-built model, and an LED matching board for my literature lesson. The work was creative, durable, and completed in just three days without compromising quality.",
    author: "Teacher Trainee",
    location: "Tiruchirapalli",
  },
];

function TestimonialCard({
  testimonial,
  index,
  className,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={className}
    >
      <article className="group relative h-full overflow-hidden border border-border/70 bg-card/60 p-6 md:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-foreground/35 hover:shadow-xl">
        <p className="text-base leading-relaxed text-foreground/90">
          &quot;{testimonial.quote}&quot;
        </p>

        <div className="mt-6 border-t border-border pt-4">
          <p className="text-sm font-semibold text-foreground">
            {testimonial.author}
          </p>
          <div className="mt-1 inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {testimonial.location}
          </div>
        </div>
      </article>
    </motion.div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_15%_10%,hsl(var(--accent))_0%,transparent_45%),radial-gradient(circle_at_90%_85%,hsl(var(--muted))_0%,transparent_42%)] py-24">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(120,120,120,0.06)_55%,transparent_100%)]" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col gap-4 border-b border-border/60 pb-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 border border-border bg-background/80 px-3 py-1 text-xs font-mono uppercase tracking-widest">
              Testimonials
            </div>
            <h2 className="mb-3 text-3xl font-bold tracking-tighter md:text-4xl">
              Real Feedback from the Classroom
            </h2>
            <p className="text-base text-muted-foreground md:text-lg">
              Trusted by teacher trainees and schools for neat execution,
              practical usability, and dependable delivery.
            </p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Voices from Tamil Nadu
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <TestimonialCard
            testimonial={testimonials[0]}
            index={0}
            className="lg:col-span-7"
          />
          <TestimonialCard
            testimonial={testimonials[1]}
            index={1}
            className="lg:col-span-5"
          />
          <TestimonialCard
            testimonial={testimonials[2]}
            index={2}
            className="lg:col-span-5"
          />
          <TestimonialCard
            testimonial={testimonials[3]}
            index={3}
            className="lg:col-span-7"
          />
        </div>
      </div>
    </section>
  );
}
