"use client";

import React from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme/toggle";
import { SceneToggle } from "@/components/theme/scene-toggle";
import Link from "next/link";
import Image from "next/image";

// Navigation links - add your links here, leave empty to hide navigation
const navLinks: { name: string; href: string }[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function HeaderClient({ children }: { children: React.ReactNode }) {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="text-foreground"
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            href="/"
            aria-label="Scriber home"
            className="flex items-center"
          >
            <Image
              src="/scriber-logo.svg"
              alt="Scriber logo"
              width={140}
              height={20}
              priority
              className="dark:invert-0 invert"
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        {navLinks.length > 0 && (
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                {link.name}
              </motion.a>
            ))}
          </nav>
        )}

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {children}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-none">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 rounded-none border-border"
              >
                {navLinks.length > 0 &&
                  navLinks.map((link) => (
                    <DropdownMenuItem
                      key={link.name}
                      asChild
                      className="rounded-none focus:bg-foreground/5"
                    >
                      <a
                        href={link.href}
                        className="w-full uppercase tracking-wider text-xs font-bold"
                      >
                        {link.name}
                      </a>
                    </DropdownMenuItem>
                  ))}
                {navLinks.length > 0 && <DropdownMenuSeparator />}
                <DropdownMenuItem className="p-0 focus:bg-transparent">
                  <SceneToggle />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <ThemeToggle className="hidden md:flex" />
        </div>
      </div>
    </motion.header>
  );
}
