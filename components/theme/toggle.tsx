import * as React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon, Monitor } from "lucide-react";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "flex items-center p-1 rounded-none border bg-background/50 backdrop-blur-sm h-9 w-fit",
          className,
        )}
      >
        <div className="h-7 w-7 rounded-none bg-muted/50" />
        <div className="h-7 w-7 rounded-none bg-muted/50 ml-1" />
        <div className="h-7 w-7 rounded-none bg-muted/50 ml-1" />
      </div>
    );
  }

  const modes = [
    { value: "light", icon: SunIcon },
    { value: "system", icon: Monitor },
    { value: "dark", icon: MoonIcon },
  ];

  return (
    <div
      className={cn(
        "flex items-center p-1 rounded-none border bg-background/50 backdrop-blur-sm h-9 w-fit shadow-sm",
        className,
      )}
    >
      {modes.map((mode) => {
        const isActive = theme === mode.value;
        const Icon = mode.icon;

        return (
          <button
            key={mode.value}
            onClick={() => setTheme(mode.value)}
            className={cn(
              "relative flex items-center justify-center h-7 w-7 rounded-none text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              isActive && "text-foreground",
            )}
            type="button"
            aria-label={`Switch to ${mode.value} mode`}
          >
            {isActive && (
              <motion.div
                layoutId="theme-active"
                className="absolute inset-0 rounded-none bg-muted shadow-sm border"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Icon className="relative z-10 size-3.5" />
          </button>
        );
      })}
    </div>
  );
}
