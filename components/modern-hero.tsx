"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function ModernHero() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      {/* <Spotlight/> */}
      {/* Modern Grid Background with Animated Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-foreground/5 opacity-20 blur-[100px]"></div>
      </div>

      <div className="z-10 container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 max-w-4xl"
        >
          <div className="inline-block border border-foreground/20 px-3 py-1 text-xs font-mono mb-4 tracking-widest uppercase">
            Est. 2024
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]">
            THE SCRIBER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 px-12">
              COMPANY
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-[600px] mx-auto font-light tracking-wide">
            Empowering growth through education, marketing, and design.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 pt-8"
        >
          <Link
            href="/about"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden bg-foreground text-background px-8 text-sm font-medium transition-all hover:bg-foreground/90"
          >
            <span className="relative z-10 flex items-center">
              Discover More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
