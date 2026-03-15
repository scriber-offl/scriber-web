"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export function ModernHero() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-card text-foreground">
      <div className="z-10 container px-4 md:px-6 grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-4 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 max-w-2xl order-2 lg:order-1 mt-4 lg:mt-0"
        >
          <h1 className="font-swirly-canalope text-4xl md:text-5xl lg:text-7xl">
            Building the future of Classroom Learning with our Teaching &
            Learning Materials
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-[500px] font-light tracking-wide">
            Crafting teaching-learning materials for schools, educators, and
            B.Ed learners who need reliable, curriculum-ready classroom aids.
          </p>

          <div className="flex flex-row gap-3 pt-6 justify-center lg:justify-start">
            <Link
              href="/#collaboration"
              scroll={false}
              onClick={(e) => {
                const section = document.getElementById("collaboration");
                if (!section) return;

                e.preventDefault();
                const y =
                  section.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: y, behavior: "smooth" });
                window.history.replaceState(null, "", "/#collaboration");
              }}
            >
              <Button className="gap-2 rounded-none text-xs font-bold uppercase tracking-wider">
                Partner with Us
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant={"outline"}
                className="gap-2 text-xs font-bold uppercase tracking-wider border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background dark:bg-transparent dark:hover:bg-foreground rounded-none"
              >
                <span className="relative z-10 flex items-center">
                  Discover More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full flex items-center justify-center order-1 lg:order-2 mt-12 lg:mt-0"
        >
          <Image
            src="/hero.svg"
            alt="Hero Graphic"
            width={1100}
            height={1100}
            className="w-full max-w-xl lg:max-w-none lg:scale-110"
          />
        </motion.div>
      </div>
    </div>
  );
}
