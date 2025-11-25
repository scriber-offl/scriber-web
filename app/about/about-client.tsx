"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import {
  ArrowLeft,
  BookOpen,
  ArrowRight,
  Star,
  Ruler,
  PenTool,
  FileText,
  PieChart,
  Smartphone,
  MousePointer,
  Check,
} from "lucide-react";

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="absolute top-0 left-0 p-6 z-50">
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs font-bold uppercase tracking-wider border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background dark:bg-transparent dark:hover:bg-foreground rounded-none"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Hero / Origin Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-6 border-b border-border">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-12">
              THE{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50">
                ORIGIN
              </span>
            </h1>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground">
                <p>
                  We started from zero, learning directly from learners,
                  trainees, and teachers — what they need, testing with them,
                  and adapting fast.
                </p>
              </div>
              <div className="text-lg leading-relaxed border-l-2 border-foreground/20 pl-6">
                <p>
                  That close connection with them is what makes our
                  teaching-learning materials (TLM), teaching aids, and models
                  truly effective.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TLM Section */}
      <section className="py-24 px-4 md:px-6 border-b border-border bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-2 bg-foreground text-background">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-mono uppercase tracking-widest">
                    Scriber TLM
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
                  Designed to make a <br />
                  <span className="text-muted-foreground">difference.</span>
                </h2>

                <div className="space-y-8">
                  <p className="text-xl text-foreground/80 max-w-2xl leading-relaxed">
                    At Scriber, we believe that professional and simplified
                    teaching-learning materials are essential.
                  </p>

                  <div className="p-8 border border-border bg-background/50 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-foreground transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"></div>
                    <h3 className="text-2xl font-bold mb-4">
                      Amenities & Facilities
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      That’s why we offer a wide range of amenities designed to
                      meet the needs of traditional teaching materials. Whether
                      you’re a student, a working professional, or someone
                      seeking a particular teaching material, our facilities are
                      designed to save you time and keep the process worry-free.
                    </p>
                    <Button className="rounded-none" asChild>
                      <Link href="/tlm">
                        Explore TLM <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-square md:aspect-[4/5] w-full bg-foreground/5 border border-border overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-72 h-72">
                    {/* Layer 1: Worksheet / Exam Paper */}
                    <motion.div
                      initial={{ rotate: -12, x: -20 }}
                      animate={{ rotate: -8, x: -15, y: [0, -5, 0] }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute top-4 left-4 w-48 h-64 bg-background border border-border shadow-lg p-4 flex flex-col gap-3 z-10"
                    >
                      <div className="flex justify-between items-center border-b border-border pb-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <div className="w-12 h-2 bg-foreground/10 rounded"></div>
                      </div>
                      <div className="space-y-2">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div
                            key={i}
                            className="w-full h-1.5 bg-foreground/5 rounded"
                          ></div>
                        ))}
                      </div>
                      <div className="mt-auto flex gap-2">
                        <div className="w-8 h-8 border border-foreground/20 rounded-full flex items-center justify-center">
                          <span className="text-[10px] font-bold">A+</span>
                        </div>
                        <div className="w-8 h-8 border border-foreground/20 rounded-full flex items-center justify-center">
                          <Star className="w-3 h-3 text-foreground/40" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Layer 2: Chart / Visual Aid */}
                    <motion.div
                      initial={{ rotate: 6, x: 20 }}
                      animate={{ rotate: 10, x: 25, y: [0, 8, 0] }}
                      transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                      className="absolute top-12 right-4 w-44 h-56 bg-foreground text-background shadow-xl p-4 flex flex-col z-20"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <PieChart className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-wider">
                          Visuals
                        </span>
                      </div>
                      <div className="flex-1 flex items-center justify-center">
                        <div className="relative w-24 h-24 rounded-full border-4 border-background/30 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-background/20"></div>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="h-1 bg-background/30 rounded"></div>
                        <div className="h-1 bg-background/10 rounded"></div>
                      </div>
                    </motion.div>

                    {/* Layer 3: Tools (Ruler & Pen) */}
                    <motion.div
                      animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -right-4 top-1/3 z-30 bg-background border border-border p-2 shadow-md"
                    >
                      <Ruler className="w-6 h-6 text-foreground" />
                    </motion.div>

                    <motion.div
                      animate={{ x: [0, 10, 0], y: [0, 5, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                      className="absolute -left-2 bottom-1/4 z-30 bg-foreground text-background p-2 shadow-md rounded-full"
                    >
                      <PenTool className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Branding Section */}
      <section className="py-24 px-4 md:px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              SCRIBER BRANDING CO.
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
              Where stories speak and brands grow online.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                Building Brands That Speak for Themselves
              </h3>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  At Scriber Branding Company, we help businesses transform
                  ideas into unforgettable brand experiences. We focus on
                  strategy, design, communication, and performance auditing that
                  cut through the noise.
                </p>
                <p className="text-foreground font-medium">
                  Every brand has a story; we just make yours impossible to
                  ignore.
                </p>

                <div className="grid grid-cols-1 gap-3 pt-4">
                  {[
                    "Brand identity development",
                    "Logo design and visual branding",
                    "Marketing campaigns",
                    "Digital presence & social media strategy",
                    "Product branding & packaging",
                    "Creative content development",
                    "Brand, Marketing & Digital Audits",
                    "Studio Booking & Ad Shoot Production",
                    "Professional Photoshoots",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 min-w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-foreground" />
                      </div>
                      <span className="text-base text-muted-foreground">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <Button size="lg" className="rounded-none" asChild>
                <Link href="/branding">Start Your Project</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-[4/5] w-full bg-foreground/5 border border-border overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-72 h-72">
                  {/* Layer 1: Web Layout / Brand Home */}
                  <motion.div
                    initial={{ rotate: 6, x: 20 }}
                    animate={{ rotate: 8, x: 15, y: [0, -8, 0] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-8 right-4 w-56 h-40 bg-background border border-border shadow-xl p-3 flex flex-col gap-2 z-10"
                  >
                    <div className="flex items-center gap-2 border-b border-border pb-2">
                      <div className="w-2 h-2 rounded-full bg-red-400"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-1/3 h-20 bg-foreground/5 rounded"></div>
                      <div className="w-2/3 space-y-2">
                        <div className="w-full h-2 bg-foreground/10 rounded"></div>
                        <div className="w-3/4 h-2 bg-foreground/10 rounded"></div>
                        <div className="w-full h-16 bg-foreground/5 rounded mt-2"></div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Layer 2: Mobile Mockup */}
                  <motion.div
                    initial={{ rotate: -12, x: -20 }}
                    animate={{ rotate: -15, x: -25, y: [0, 10, 0] }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    className="absolute bottom-8 left-4 w-32 h-56 bg-foreground text-background shadow-2xl p-2 rounded-xl border-4 border-foreground z-20 flex flex-col items-center"
                  >
                    <div className="w-8 h-1 bg-background/20 rounded-full mb-4"></div>
                    <div className="w-full h-24 bg-background/10 rounded mb-2"></div>
                    <div className="w-full space-y-1">
                      <div className="w-full h-1 bg-background/20 rounded"></div>
                      <div className="w-2/3 h-1 bg-background/20 rounded"></div>
                    </div>
                    <div className="mt-auto w-8 h-8 rounded-full bg-background/20 flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-background" />
                    </div>
                  </motion.div>

                  {/* Layer 3: Color Palette */}
                  <motion.div
                    animate={{ x: [0, 15, 0], y: [0, -5, 0] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="absolute -right-6 bottom-1/3 z-30 bg-background border border-border p-3 shadow-lg flex flex-col gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-foreground"></div>
                    <div className="w-8 h-8 rounded-full bg-foreground/60"></div>
                    <div className="w-8 h-8 rounded-full bg-foreground/30"></div>
                  </motion.div>

                  {/* Layer 4: Cursor */}
                  <motion.div
                    animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-1/2 left-1/2 z-40"
                  >
                    <MousePointer className="w-6 h-6 text-foreground fill-foreground" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
