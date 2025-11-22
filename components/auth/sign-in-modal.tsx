"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SignInCard } from "./sign-in-card";

export function SignInModal() {
  return (
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
  );
}
