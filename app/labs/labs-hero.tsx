"use client";

import React from "react";
import { Spotlight } from "@/components/backgrounds/spotlight-bg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export function LabsHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4">
      <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(150, 100%, 85%, .08) 0, hsla(150, 100%, 55%, .02) 50%, hsla(150, 100%, 45%, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(150, 100%, 85%, .06) 0, hsla(150, 100%, 55%, .02) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(150, 100%, 85%, .04) 0, hsla(150, 100%, 45%, .02) 80%, transparent 100%)"
      />
      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-green-500/30 bg-green-500/10 text-green-500 text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            <span>ScriberLabs</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
            Digital Excellence <br /> for Your Business
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            We help businesses grow online through data-driven strategies,
            creative content, and cutting-edge technology.
          </p>
          <Button size="lg" asChild>
            <Link href="#contact-form">Start Your Growth</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
