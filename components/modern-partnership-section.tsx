"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function ModernPartnershipSection() {
  return (
    <section className="w-full bg-background py-32 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Scriber Logo */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-foreground/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Image
              src="/scriber-logo.svg"
              alt="Scriber"
              width={200}
              height={60}
              className="w-48 h-auto object-contain dark:invert-0 invert relative z-10"
            />
          </div>

          {/* X Symbol */}
          <div className="relative">
            <span className="text-4xl font-light text-muted-foreground/50">
              ×
            </span>
          </div>

          {/* Jumpcuts Studios Logo */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-foreground/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Image
              src="/jc-logo-white.png"
              alt="Jumpcuts Studios"
              width={200}
              height={200}
              className="w-32 h-32 object-contain hidden dark:block relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <Image
              src="/jc-logo-black.png"
              alt="Jumpcuts Studios"
              width={200}
              height={200}
              className="w-32 h-32 object-contain block dark:hidden relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </motion.div>

        {/* Partnership Text */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Strategic Partnership
          </p>
          <h3 className="text-2xl md:text-3xl font-bold mt-2 tracking-tight">
            Scriber <span className="text-muted-foreground">×</span> Jumpcuts
            Studios
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
