"use client";

import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Palette, Wrench } from "lucide-react";

const highlights = [
  {
    icon: BookOpen,
    label: "Chart Works",
    description: "Detailed, syllabus-aligned teaching charts",
  },
  {
    icon: GraduationCap,
    label: "B.Ed Project Support",
    description: "Practical aids designed for teacher trainees",
  },
  {
    icon: Wrench,
    label: "Working Models",
    description: "Hands-on models for science & social subjects",
  },
  {
    icon: Palette,
    label: "Custom Materials",
    description: "Tailored for schools, institutions, and course needs",
  },
];

export function TLMIntroSection() {
  return (
    <section className="py-24 bg-foreground/[0.02] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-border bg-background text-xs font-mono tracking-widest uppercase mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              Teaching Learning Materials (TLM)
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 leading-[1.05]">
              Built for Schools and{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50">
                Trainee Teachers
              </span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              Scriber creates teaching-learning materials for schools,
              educators, and B.Ed students. From chart works to working models,
              every piece is syllabus-aligned, neatly finished, and delivered on
              time.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-start p-5 border border-border bg-background hover:border-foreground/30 transition-colors"
              >
                <div className="p-2 bg-foreground/5 mb-4">
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
                <p className="font-semibold text-sm mb-1">{item.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
