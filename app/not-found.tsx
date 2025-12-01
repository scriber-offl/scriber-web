"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-4 md:p-8 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl w-full flex flex-col items-center text-center gap-8">
        {/* Creative SVG Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-[400px] aspect-square relative"
        >
          <svg
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Floating Elements Animation Group */}
            <motion.g
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              {/* The 404 Text as abstract shapes */}
              <path
                d="M80 150 L80 200 L130 200 M130 150 L130 250"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                className="text-primary/20"
              />
              <circle
                cx="200"
                cy="200"
                r="45"
                stroke="currentColor"
                strokeWidth="12"
                className="text-primary/20"
              />
              <path
                d="M270 150 L270 200 L320 200 M320 150 L320 250"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                className="text-primary/20"
              />
            </motion.g>

            {/* Main Character / Scene */}
            <motion.g
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {/* Planet */}
              <circle cx="200" cy="280" r="80" className="fill-secondary" />
              <path
                d="M120 280 C120 280 150 240 200 240 C250 240 280 280 280 280"
                stroke="currentColor"
                strokeWidth="4"
                className="text-primary/10"
                fill="none"
              />

              {/* Character looking lost */}
              <g transform="translate(180, 190)">
                <motion.g
                  animate={{ y: [0, -5, 0], rotate: [0, 2, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                >
                  {/* Body */}
                  <rect
                    x="10"
                    y="20"
                    width="20"
                    height="30"
                    rx="5"
                    className="fill-primary"
                  />
                  {/* Head */}
                  <circle cx="20" cy="15" r="12" className="fill-primary" />
                  {/* Visor */}
                  <rect
                    x="14"
                    y="12"
                    width="12"
                    height="6"
                    rx="2"
                    className="fill-background"
                  />
                  {/* Backpack */}
                  <rect
                    x="5"
                    y="25"
                    width="5"
                    height="20"
                    rx="2"
                    className="fill-primary/80"
                  />

                  {/* Question Mark */}
                  <motion.text
                    x="40"
                    y="10"
                    className="fill-foreground text-2xl font-bold"
                    animate={{ opacity: [0, 1, 0], y: [0, -10, -15] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      repeatDelay: 1,
                    }}
                  >
                    ?
                  </motion.text>
                </motion.g>
              </g>
            </motion.g>

            {/* Decorative Elements */}
            <motion.circle
              cx="50"
              cy="100"
              r="4"
              className="fill-muted-foreground"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
            <motion.circle
              cx="350"
              cy="80"
              r="6"
              className="fill-muted-foreground"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 4, delay: 1 }}
            />
            <motion.path
              d="M300 50 L310 60 M310 50 L300 60"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted-foreground"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            />
          </svg>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Page Not Found
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto">
            Oops! It seems you&apos;ve ventured into uncharted territory. The
            page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </motion.div>
        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
