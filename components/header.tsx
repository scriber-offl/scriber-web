"use client";

import React from "react";
import { motion } from "framer-motion";
import { Menu, LogOut } from "lucide-react";
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
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { SignInCard } from "./auth/sign-in-card";

// Navigation links - add your links here, leave empty to hide navigation
const navLinks: { name: string; href: string }[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const AuthLoadingButton = ({ className }: { className?: string }) => (
  <Button
    variant="outline"
    size="sm"
    disabled
    className={`uppercase tracking-wider text-xs font-bold ${className}`}
  >
    <Spinner className="mr-2 h-3 w-3" />
    Retrieving Session
  </Button>
);

export function Header() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
          router.push("/");
        },
      },
    });
  };

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
          {isPending ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <AuthLoadingButton />
            </motion.div>
          ) : session ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session.user.image || ""}
                      alt={session.user.name || ""}
                    />
                    <AvatarFallback>
                      {session.user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session.user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <Button variant={"destructive"} className="w-full">
                    <LogOut className="mr-0 h-4 w-4 text-red-100" />
                    <span>Log out</span>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="uppercase tracking-wider text-xs font-bold border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background dark:bg-transparent dark:hover:bg-foreground rounded-none h-9 px-6"
                  >
                    Sign In
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogTitle className="sr-only">Sign In</DialogTitle>
                  <div className="flex items-center justify-center py-4">
                    <SignInCard
                      title="Welcome Back"
                      description="Sign in to your account to continue"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          )}

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
