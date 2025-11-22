"use client";

import React from "react";
import { Spotlight } from "@/components/backgrounds/spotlight-bg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export function TLMHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4">
      <Spotlight />
      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-blue-500/30 bg-blue-500/10 text-blue-500 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Scriber TLM</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
            Empowering Education <br /> with Creative Aids
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Your premier marketplace for B.Ed teaching aids, chart works, and
            working models. We bring educational concepts to life.
          </p>
          <Button size="lg" asChild>
            <Link href="#order-form">Get a Quote</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
