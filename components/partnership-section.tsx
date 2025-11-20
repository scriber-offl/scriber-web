"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function PartnershipSection() {
  return (
    <section className="w-full bg-secondary py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-8 md:gap-16">
          {/* Scriber Logo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Image
              src="/scriber-logo.svg"
              alt="Scriber"
              width={200}
              height={200}
              className="w-32 h-32 md:w-48 md:h-48 object-contain"
            />
          </motion.div>

          {/* X Symbol */}
          <motion.div
            className="text-4xl md:text-5xl font-light text-muted-foreground"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            ×
          </motion.div>

          {/* Jumpcuts Studios Logo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <Image
              src="/jc-logo-white.png"
              alt="Jumpcuts Studios"
              width={200}
              height={200}
              className="w-32 h-32 md:w-48 md:h-48 object-contain rounded-lg hidden dark:block"
            />
            <Image
              src="/jc-logo-black.png"
              alt="Jumpcuts Studios"
              width={200}
              height={200}
              className="w-32 h-32 md:w-48 md:h-48 object-contain rounded-lg block dark:hidden"
            />
          </motion.div>
        </div>

        {/* Partnership Text */}
        <motion.p
          className="text-center font-bold mt-8 text-lg md:text-xl lg:text-2xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
        >
          In partnership with Jumpcuts Studios
        </motion.p>
      </div>
    </section>
  );
}
