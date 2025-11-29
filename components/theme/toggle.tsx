"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

const useThemeCycle = () => {
  const { theme, setTheme } = useTheme();

  const cycleTheme = React.useCallback(() => {
    const themes = ["light", "dark"];
    const currentIndex = themes.indexOf(theme || "light");
    const nextIndex = (currentIndex + 1) % themes.length;
    return themes[nextIndex];
  }, [theme]);

  return { theme, setTheme, cycleTheme };
};

const useViewTransition = (
  buttonRef: React.RefObject<HTMLButtonElement | null>
) => {
  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes circle-grow {
        from {
          clip-path: circle(0% at var(--x-position, 50%) var(--y-position, 50%));
        }
        to {
          clip-path: circle(150% at var(--x-position, 50%) var(--y-position, 50%));
        }
      }

      ::view-transition-new(root) {
        animation: 1.3s circle-grow ease-out;
      }

      ::view-transition-old(root) {
        animation: none;
        mix-blend-mode: normal;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const startTransition = React.useCallback(
    (callback: () => void) => {
      if ("startViewTransition" in document) {
        const button = buttonRef.current;
        if (button) {
          const rect = button.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;

          document.documentElement.style.setProperty("--x-position", `${x}px`);
          document.documentElement.style.setProperty("--y-position", `${y}px`);
        }

        document.startViewTransition(callback);
      } else {
        callback();
      }
    },
    [buttonRef]
  );

  return startTransition;
};

export function ThemeToggle({ className }: { className?: string }) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme, cycleTheme } = useThemeCycle();
  const startTransition = useViewTransition(buttonRef);

  const handleThemeChange = React.useCallback(() => {
    const newTheme = cycleTheme();
    startTransition(() => setTheme(newTheme));
  }, [cycleTheme, setTheme, startTransition]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const getThemeIcon = () => {
    if (!mounted) return null;

    return (
      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" && (
          <motion.span
            key="light"
            initial={{ opacity: 0, scale: 0.7, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.7, rotate: 30 }}
            transition={{
              duration: 2,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="flex items-center justify-center"
          >
            <LightModeIcon
              fontSize="small"
              className="rotate-0 scale-100 transition-all"
            />
          </motion.span>
        )}
        {theme === "dark" && (
          <motion.span
            key="dark"
            initial={{ opacity: 0, scale: 0.7, rotate: 30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.7, rotate: -30 }}
            transition={{
              duration: 2,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="flex items-center justify-center"
          >
            <DarkModeIcon
              fontSize="small"
              className="rotate-0 scale-100 transition-all"
            />
          </motion.span>
        )}
      </AnimatePresence>
    );
  };

  return (
    <Button
      ref={buttonRef}
      variant="outline"
      size="icon"
      onClick={handleThemeChange}
      className={`flex items-center justify-center ${className || ""}`}
    >
      {getThemeIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
