"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  School,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="absolute top-0 left-0 p-5 z-50">
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs font-bold uppercase tracking-wider border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background dark:bg-transparent dark:hover:bg-foreground rounded-none"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
      </div>

      <section className="relative border-b border-border bg-[radial-gradient(circle_at_top_left,hsl(var(--foreground)/0.06),transparent_50%)]">
        <div className="container mx-auto max-w-6xl px-4 md:px-6 pt-28 pb-16 md:pt-32 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid gap-10 lg:grid-cols-12 lg:items-end"
          >
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 border border-border bg-background px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                About Scriber
              </div>
              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                Small details,
                <br />
                <span className="text-muted-foreground">
                  big classroom impact.
                </span>
              </h1>
            </div>

            <div className="lg:col-span-5">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                Scriber creates teaching-learning materials for schools,
                educators, and B.Ed learners. From chart works to working
                models, we deliver practical, syllabus-aligned classroom aids
                that are neat, reliable, and ready to use.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="container mx-auto max-w-6xl px-4 md:px-6 py-14 md:py-16">
          <div className="grid gap-7 md:grid-cols-2">
            {[
              {
                icon: GraduationCap,
                title: "B.Ed Project Support",
                text: "Practical project materials and aids designed for teacher trainees and educators.",
              },
              {
                icon: School,
                title: "School Collaboration",
                text: "Collaborative support for schools to design and deliver teaching models and classroom aids aligned to learning goals.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="border border-border bg-card p-6"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center border border-border bg-foreground/5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold tracking-tight">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.text}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-foreground/[0.02]">
        <div className="container mx-auto max-w-6xl px-4 md:px-6 py-14 md:py-20">
          <div className="grid items-start gap-8 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-7"
            >
              <p className="mb-3 text-xs font-mono uppercase tracking-[0.24em] text-muted-foreground">
                Founder
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                J.M. Rhenius
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Founder of Scriber
              </p>

              <div className="mt-6 space-y-4 text-sm md:text-base leading-7 text-foreground/90">
                <p>
                  J.M. Rhenius is the founder of Scriber, an initiative
                  dedicated to developing practical teaching learning materials
                  for schools and educators. A graduate in English Literature
                  from Bishop Heber College, Tiruchirapalli, he combines strong
                  communication skills with experience in educational content
                  development and design.
                </p>
                <p>
                  In 2023, he started Scriber with the goal of supporting
                  teachers and students through curriculum-aligned teaching
                  aids, chart boards, models, and academic project resources
                  that make classroom learning more engaging and effective.
                  Since then, the initiative has supported multiple student and
                  educator projects, providing reliable and creative classroom
                  materials.
                </p>
              </div>

              <div className="mt-7">
                <Button className="rounded-none" asChild>
                  <Link href="/contact">
                    Connect with Scriber <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="lg:col-span-5"
            >
              <div className="relative overflow-hidden border border-border bg-background p-3 sm:p-4">
                <div className="relative aspect-[4/5] w-full overflow-hidden border border-border">
                  <Image
                    src="/rhenius.jpeg"
                    alt="Portrait of J.M. Rhenius"
                    fill
                    sizes="(min-width: 1024px) 35vw, (min-width: 768px) 42vw, 92vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="mt-4 border border-border bg-foreground/[0.03] p-4">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                    Since 2023
                  </p>
                  <p className="mt-2 text-sm leading-6 text-foreground/90">
                    Supporting schools and educators with chart works, working
                    models, teaching aids, and B.Ed project materials.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-14">
          <div className="flex flex-col gap-4 border border-border bg-card p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Work with us
              </p>
              <p className="mt-2 text-base md:text-lg font-medium tracking-tight">
                Need chart works, working models, or B.Ed project support?
              </p>
            </div>
            <Button className="rounded-none" variant="outline" asChild>
              <Link href="/">
                Explore Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
