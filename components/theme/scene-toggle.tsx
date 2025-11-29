"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Cloud } from "lucide-react";

export function SceneToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const stars = React.useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      id: i,
      top: `${(i * 13 + 7) % 60}%`,
      left: `${(i * 29 + 3) % 100}%`,
      size: (i % 3) + 1,
      opacity: 0.5 + (i % 5) * 0.1,
      delay: i * 0.05,
    }));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted)
    return <div className="w-full h-32 bg-muted animate-pulse rounded-md" />;

  const isDark = theme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <div
      className="w-full p-2 cursor-pointer group"
      role="button"
      onClick={toggleTheme}
    >
      <div className="relative w-full h-22 rounded-xl overflow-hidden shadow-inner ring-1 ring-border transition-all group-hover:ring-ring">
        {/* Sky Background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundColor: isDark ? "#0f172a" : "#60a5fa",
          }}
          transition={{ duration: 1 }}
        />

        {/* Sun */}
        <motion.div
          className="absolute"
          initial={false}
          animate={{
            bottom: isDark ? "-50px" : "20px",
            left: isDark ? "20%" : "50%",
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.5 : 1,
          }}
          transition={{ duration: 1, type: "spring", bounce: 0.2 }}
          style={{ translateX: "-50%" }}
        >
          <div className="relative w-16 h-16 bg-yellow-300 rounded-full shadow-[0_0_40px_rgba(253,224,71,0.6)]">
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-sm opacity-50 animate-pulse" />
          </div>
        </motion.div>

        {/* Moon */}
        <motion.div
          className="absolute"
          initial={false}
          animate={{
            top: isDark ? "20px" : "-50px",
            right: isDark ? "20px" : "-20px",
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.5,
          }}
          transition={{ duration: 1, type: "spring", bounce: 0.2 }}
        >
          <div className="relative w-12 h-12 bg-slate-100 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] overflow-hidden">
            <div className="absolute top-2 left-3 w-3 h-3 bg-slate-200 rounded-full opacity-40" />
            <div className="absolute bottom-3 right-2 w-4 h-4 bg-slate-200 rounded-full opacity-40" />
            <div className="absolute top-5 right-4 w-2 h-2 bg-slate-200 rounded-full opacity-40" />
          </div>
        </motion.div>

        {/* Stars */}
        <div className="absolute inset-0 pointer-events-none">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute bg-white rounded-full"
              initial={false}
              animate={{
                opacity: isDark ? star.opacity : 0,
                scale: isDark ? 1 : 0,
                y: isDark ? 0 : -20,
              }}
              style={{
                top: star.top,
                left: star.left,
                width: star.size + "px",
                height: star.size + "px",
              }}
              transition={{ duration: 0.5, delay: star.delay }}
            />
          ))}
        </div>

        {/* Clouds */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-4 left-4 text-white/80"
            animate={{
              x: isDark ? -100 : 0,
              opacity: isDark ? 0 : 0.8,
            }}
            transition={{ duration: 1 }}
          >
            <Cloud className="w-10 h-10 fill-white/80 border-none" />
          </motion.div>
          <motion.div
            className="absolute top-10 right-8 text-white/60"
            animate={{
              x: isDark ? 100 : 0,
              opacity: isDark ? 0 : 0.6,
            }}
            transition={{ duration: 1.2 }}
          >
            <Cloud className="w-8 h-8 fill-white/60 border-none" />
          </motion.div>
        </div>

        {/* Hills/Landscape */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden pointer-events-none">
          {/* Back Hill */}
          <motion.div
            className="absolute bottom-0 left-[-20%] right-[-20%] h-20 rounded-[100%] translate-y-8"
            animate={{
              backgroundColor: isDark ? "#1e293b" : "#4ade80", // slate-800 vs green-400
            }}
            transition={{ duration: 1 }}
          />
          {/* Front Hill */}
          <motion.div
            className="absolute bottom-0 right-[-30%] left-[-10%] h-24 rounded-[100%] translate-y-12"
            animate={{
              backgroundColor: isDark ? "#0f172a" : "#22c55e", // slate-900 vs green-500
            }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Text Overlay */}
        <div className="absolute bottom-2 w-full text-center z-10 pointer-events-none">
          <motion.span
            className="text-xs font-bold uppercase tracking-[0.2em] drop-shadow-md"
            animate={{
              color: isDark ? "#e2e8f0" : "#14532d",
            }}
          >
            {isDark ? "Dark Mode" : "Light Mode"}
          </motion.span>
        </div>
      </div>
    </div>
  );
}
