"use client";

import { motion } from "framer-motion";

export function HeroGraphics() {
  return (
    <svg
      viewBox="0 0 500 500"
      className="w-full h-full max-w-[500px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Blackboard */}
      <rect x="40" y="40" width="420" height="220" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="8" />
      <rect x="55" y="55" width="390" height="190" rx="4" fill="#0f172a" />
      
      {/* Blackboard Stand/Legs */}
      <path d="M 80 260 L 50 450" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
      <path d="M 420 260 L 450 450" stroke="#334155" strokeWidth="8" strokeLinecap="round" />

      {/* Board Content: Day & Night Concept */}
      <motion.text 
        x="135" y="100" fill="#f8fafc" fontSize="24" fontFamily="monospace" fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 1, 1, 0] }}
        transition={{ duration: 8, repeat: Infinity, times: [0, 0.1, 0.2, 0.5, 0.8, 0.9, 1] }}
      >
        Topic: Day & Night
      </motion.text>
      
      <motion.path
         initial={{ pathLength: 0, opacity: 0 }}
         animate={{ pathLength: [0, 1, 1, 1, 0], opacity: [0, 1, 1, 1, 0] }}
         transition={{ duration: 8, repeat: Infinity, times: [0, 0.3, 0.5, 0.8, 1] }}
         d="M 120 180 A 40 40 0 1 1 200 180 A 40 40 0 1 1 120 180 Z"
         stroke="#f8fafc" strokeWidth="2" strokeDasharray="4 4" fill="none"
      />
      {/* Half shaded globe on board */}
      <motion.path
         initial={{ opacity: 0 }}
         animate={{ opacity: [0, 0, 1, 1, 0] }}
         transition={{ duration: 8, repeat: Infinity, times: [0, 0.3, 0.5, 0.8, 1] }}
         d="M 160 140 A 40 40 0 0 0 160 220 Z"
         fill="#f8fafc" fillOpacity="0.3"
      />
      
      {/* Sun rays drawn on board */}
      <motion.path
         initial={{ pathLength: 0, opacity: 0 }}
         animate={{ pathLength: [0, 1, 1, 1, 0], opacity: [0, 1, 1, 1, 0] }}
         transition={{ duration: 8, repeat: Infinity, times: [0, 0.4, 0.5, 0.8, 1] }}
         d="M 320 180 L 280 180 M 340 140 L 300 160 M 340 220 L 300 200"
         stroke="#fbbf24" strokeWidth="3" fill="none" strokeLinecap="round"
      />
      <motion.circle 
         cx="350" cy="180" r="15" fill="#fcd34d"
         initial={{ opacity: 0, scale: 0 }}
         animate={{ opacity: [0, 0, 1, 1, 0], scale: [0, 0, 1, 1, 0] }}
         transition={{ duration: 8, repeat: Infinity, times: [0, 0.4, 0.5, 0.8, 1] }}
      />

      {/* Marker Pen Animating to Write/Draw */}
      <motion.g
        initial={{ x: 100, y: 240, opacity: 0 }}
        animate={{ 
          x: [100, 180, 250, 320, 160, 300, 100], 
          y: [240, 90, 90, 180, 180, 180, 240],
          opacity: [0, 1, 1, 1, 1, 1, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, times: [0, 0.1, 0.2, 0.4, 0.6, 0.8, 1] }}
      >
        <rect x="-5" y="-30" width="10" height="30" rx="3" fill="#cbd5e1" />
        <path d="M -3 -30 L 0 -40 L 3 -30 Z" fill="#f8fafc" />
      </motion.g>

      {/* Table/Desk Base */}
      <path d="M 20 450 L 480 450" stroke="#475569" strokeWidth="16" strokeLinecap="round" />
      <path d="M 60 450 L 60 480" stroke="#475569" strokeWidth="12" strokeLinecap="round" />
      <path d="M 440 450 L 440 480" stroke="#475569" strokeWidth="12" strokeLinecap="round" />

      {/* TLM WORKING MODEL: Day & Night Demo */}
      {/* Wooden Base of the model */}
      <rect x="90" y="420" width="320" height="22" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="2" />
      
      {/* TLM Title Plate */}
      <rect x="220" y="426" width="60" height="10" rx="2" fill="#fef3c7" />
      <text x="230" y="434" fill="#92400e" fontSize="8" fontFamily="sans-serif" fontWeight="bold">TLM M-01</text>

      {/* Light Source (Flashlight/Sun TLM part) */}
      <rect x="330" y="380" width="16" height="40" fill="#9ca3af" stroke="#4b5563" strokeWidth="2" />
      <rect x="315" y="350" width="46" height="30" rx="4" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
      <path d="M 315 355 L 305 350 L 305 380 L 315 375 Z" fill="#60a5fa" stroke="#1e40af" strokeWidth="2" />
      
      {/* Light Beam (Animates on to explain the concept) */}
      <motion.path 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.6, 0.6, 0] }}
        transition={{ duration: 8, repeat: Infinity, times: [0, 0.5, 0.6, 0.9, 1] }}
        d="M 305 350 L 180 300 L 180 430 L 305 380 Z" 
        fill="url(#lightBeam)" 
      />

      <defs>
        <linearGradient id="lightBeam" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
          <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Globe (Earth TLM part) */}
      <rect x="145" y="400" width="30" height="20" fill="#9ca3af" stroke="#4b5563" strokeWidth="2" />
      <path d="M 160 400 L 160 300" stroke="#4b5563" strokeWidth="4" />
      {/* Tilt mechanism / Axis */}
      <g transform="rotate(15 160 350)">
        <line x1="160" y1="290" x2="160" y2="410" stroke="#1f2937" strokeWidth="4" strokeLinecap="round" />
        
        {/* Spinning Globe Sphere */}
        <circle cx="160" cy="350" r="45" fill="#0ea5e9" stroke="#0284c7" strokeWidth="2" />
        
        <motion.g 
          animate={{ x: [0, -20, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          {/* Continents looping */}
          <path d="M 130 330 Q 140 310 160 320 T 170 340 Z" fill="#22c55e" />
          <path d="M 150 370 Q 170 360 180 380 T 160 390 Z" fill="#22c55e" />
        </motion.g>

        {/* Day/Night Shading Overlay (Static relative to sun, but tilted axis) */}
        <path d="M 160 305 A 45 45 0 0 0 160 395 Z" fill="#000000" fillOpacity="0.5" />
      </g>

      {/* A small hand pointer pressing the light switch to activate the model */}
      <motion.path 
        initial={{ opacity: 0, x: 380, y: 300 }}
        animate={{ opacity: [0, 0, 1, 1, 1, 0, 0], x: [380, 380, 340, 340, 380, 380, 380], y: [300, 300, 345, 345, 300, 300, 300] }}
        transition={{ duration: 8, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 0.6, 0.8, 1] }}
        d="M 0 0 C -10 -10, -20 10, -5 20 C 5 25, 15 15, 0 0 Z" fill="#fca5a5" stroke="#ef4444" strokeWidth="2"
      />
    </svg>
  );
}
