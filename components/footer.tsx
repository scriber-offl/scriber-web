"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border text-foreground relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 pt-24 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          <div className="md:col-span-5 space-y-8">
            <Link href="/" className="inline-block">
              <Image
                src="/scriber-logo.svg"
                alt="Scriber"
                width={180}
                height={40}
                className="dark:invert-0 invert"
              />
            </Link>
            <p className="text-muted-foreground text-xl leading-relaxed font-light max-w-md">
              Empowering businesses and educators through innovation, design,
              and strategy. Building the future of digital excellence.
            </p>
            <div className="flex gap-4">
              <Link
                href="/contact"
                className="inline-flex h-10 items-center justify-center border border-foreground bg-transparent px-8 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7 space-y-8">
            <h3 className="text-sm font-bold uppercase tracking-widest border-b border-border pb-4">
              Ecosystem
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/tlm"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center group text-lg"
                >
                  Scriber TLM
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/labs"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center group text-lg"
                >
                  ScriberLabs
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/branding"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center group text-lg"
                >
                  Scriber Branding
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-8">
            <h3 className="text-sm font-bold uppercase tracking-widest border-b border-border pb-4">
              Company
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center group text-lg"
                >
                  About Us
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center group text-lg"
                >
                  Terms & Conditions
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center group text-lg"
                >
                  Privacy Policy
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-end gap-4 relative z-20">
          <p className="text-sm text-muted-foreground">
            © {currentYear} The Scriber Company.
          </p>
        </div>
      </div>

      {/* Massive Footer Text - Polished */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden pointer-events-none select-none leading-none z-0 flex justify-center">
        <h1 className="text-[24vw] font-bold tracking-tighter bg-gradient-to-b from-foreground/[0.01] to-foreground/[0.08] dark:from-foreground/[0.01] dark:via-foreground/[0.04] dark:to-foreground/[0.09] bg-clip-text text-transparent translate-y-[35%]">
          SCRIBER
        </h1>
      </div>
    </footer>
  );
}
