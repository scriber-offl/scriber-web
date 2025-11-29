"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Palette, ArrowUpRight } from "lucide-react";

const businesses = [
  {
    title: "Scriber TLM",
    description: "Educational marketplace for teaching and learning materials.",
    icon: BookOpen,
    href: "/tlm",
    pattern: (
      <svg
        className="absolute right-0 top-0 h-full w-full opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <pattern
          id="grid-tlm"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 8 0 L 0 0 0 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <rect x="3" y="3" width="2" height="2" fill="currentColor" />
        </pattern>
        <rect width="100" height="100" fill="url(#grid-tlm)" />
      </svg>
    ),
  },
  {
    title: "Scriber Branding",
    description: "Brands built to speak stories, explore our services.",
    icon: Palette,
    href: "/branding",
    pattern: (
      <svg
        className="absolute right-0 top-0 h-full w-full opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <pattern
          id="circles-branding"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 10 Q10 0 20 10 T40 10"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
          />
          <path
            d="M0 20 Q10 10 20 20 T40 20"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
          />
        </pattern>
        <rect width="100" height="100" fill="url(#circles-branding)" />
      </svg>
    ),
  },
];

export function ModernBusinessSection() {
  return (
    <section className="py-32 bg-background text-foreground relative overflow-hidden">
      {/* Section Background Decoration */}
      <div className="absolute left-0 top-0 h-full w-[1px] bg-border/50"></div>
      <div className="absolute right-0 top-0 h-full w-[1px] bg-border/50"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Our Ecosystem
            </h2>
            <p className="text-muted-foreground text-lg">
              Designed for classrooms and built for creators, An ecosystem built to work together, through education, business & designs.
            </p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Explore Divisions
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-l border-t border-border">
          {businesses.map((business, index) => (
            <motion.div
              key={business.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-r border-b border-border h-full"
            >
              <Link
                href={business.href}
                className="group relative block p-10 bg-background hover:bg-foreground/5 transition-all duration-500 overflow-hidden h-full"
              >
                {business.pattern}

                <div className="relative z-10 flex flex-col h-full justify-between min-h-[280px]">
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <div className="p-3 bg-foreground/5 rounded-none inline-block group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                        <business.icon className="h-6 w-6" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                    </div>

                    <h3 className="text-2xl font-bold mb-4 tracking-tight">
                      {business.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {business.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-8 border-t border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Visit Website
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
