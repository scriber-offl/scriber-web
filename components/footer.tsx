"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Instagram, Mail } from "lucide-react";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export function Footer() {
  // Use a fixed year for server rendering to avoid hydration mismatch
  // The client will update it if needed, but for copyright, the build year or current year is usually fine.
  // To be strictly correct with hydration, we can use a suppressHydrationWarning on the element
  // or just use a static year if we don't care about auto-updating on Jan 1st without a rebuild.
  // Let's use a simple approach that is safe.
  const currentYear = 2025;

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
            <div className="flex gap-6">
              <Link
                href="mailto:contact@scriber.in"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </Link>
              <Link
                href="https://www.instagram.com/scriberoffial/"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </Link>
              <Link
                href="https://wa.me/918903340674"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-6 h-6" />
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

        <div className="border-t border-border py-8 flex flex-col md:flex-row justify-between items-end gap-4 relative z-20">
          <p className="text-sm text-muted-foreground">
            © {currentYear} The Scriber Company.
          </p>
          <p className="text-sm text-muted-foreground">
            Built & Maintained by{" "}
            <Link
              href="https://www.johanan.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline underline-offset-2"
            >
              Johanan S. A.
            </Link>
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
