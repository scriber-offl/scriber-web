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
    accent: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
    pattern: (
      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
        <svg className="w-full h-full" width="100%" height="100%">
          <defs>
            <pattern
              id="grid-tlm"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-tlm)" />
          <motion.rect
            width="39"
            height="39"
            x="0.5"
            y="0.5"
            fill="currentColor"
            fillOpacity="0.2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              times: [0, 0.5, 1],
            }}
          />
          <motion.rect
            width="39"
            height="39"
            x="80.5"
            y="40.5"
            fill="currentColor"
            fillOpacity="0.2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 5,
              delay: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <motion.rect
            width="39"
            height="39"
            x="160.5"
            y="120.5"
            fill="currentColor"
            fillOpacity="0.2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 6,
              delay: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>
    ),
  },
  {
    title: "Scriber Branding",
    description: "Brands built to speak stories, explore our services.",
    icon: Palette,
    href: "/branding",
    accent: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
    pattern: (
      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 400 400"
          preserveAspectRatio="none"
        >
          <motion.circle
            cx="380"
            cy="20"
            r="120"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            strokeDasharray="8 8"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ originX: "380px", originY: "20px" }}
          />
          <motion.path
            d="M-100,300 Q100,200 200,300 T500,300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M-100,340 Q100,240 200,340 T500,340"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
          />
        </svg>
      </div>
    ),
  },
];

export function ModernBusinessSection() {
  return (
    <section className="py-24 bg-background text-foreground relative overflow-hidden">
      {/* Section Background Decoration */}
      <div className="absolute left-0 top-0 h-full w-[1px] bg-border/40 hidden md:block"></div>
      <div className="absolute right-0 top-0 h-full w-[1px] bg-border/40 hidden md:block"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/60 pb-6"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3">
              Our Ecosystem
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Designed for classrooms and built for creators. An ecosystem built
              to work together.
            </p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Select Division
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {businesses.map((business, index) => (
            <motion.div
              key={business.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <Link
                href={business.href}
                className="group relative block h-full bg-background border border-border hover:border-foreground/20 transition-all duration-500 overflow-hidden"
              >
                {/* Background Pattern */}
                {business.pattern}

                <div className="relative z-10 flex flex-col h-full p-8 md:p-10">
                  <div className="flex justify-between items-start mb-6">
                    <div
                      className={`p-3 rounded-md bg-foreground/5 ${business.accent} transition-colors duration-300`}
                    >
                      <business.icon className="h-6 w-6" />
                    </div>
                    <div className="relative overflow-hidden">
                      <ArrowUpRight className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 transform" />
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-foreground transition-colors">
                      {business.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed mb-6 group-hover:text-foreground/80 transition-colors">
                      {business.description}
                    </p>

                    <div className="flex items-center text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      <span className="relative overflow-hidden">
                        <span className="inline-block transform group-hover:-translate-y-full transition-transform duration-300">
                          Explore
                        </span>
                        <span className="absolute top-0 left-0 inline-block transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          Explore
                        </span>
                      </span>
                      <ArrowUpRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-foreground/5 pointer-events-none transition-colors duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
