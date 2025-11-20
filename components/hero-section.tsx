"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* Background Image - Full Viewport */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/deer.jpg"
          alt="Cityscape Background"
          fill
          priority
          className="object-cover"
          quality={100}
        />
        {/* Overlay for better text readability - normal in light mode, darker in dark mode */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent dark:from-black/90 dark:via-black/70 dark:to-black/50" />
      </div>

      {/* Center Text with slight top offset */}
      <motion.div
        className="relative z-10 -mt-28 px-4 text-center max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      >
        <h1 className="text-4xl mx-12 sm:text-5xl md:text-6xl lg:text-6xl font-bold text-white drop-shadow-xl drop-shadow-black mb-3 md:mb-4 tracking-normal font-[family-name:var(--font-unlock)]">
          The Scriber Company
        </h1>
        <p className="text-sm tracking-tight sm:text-base md:text-lg lg:text-xl text-white/90 dark:text-white/80 drop-shadow-lg mb-6 md:mb-8">
          Your trusted partner in digital solutions and educational excellence
        </p>
      </motion.div>
    </div>
  );
}
