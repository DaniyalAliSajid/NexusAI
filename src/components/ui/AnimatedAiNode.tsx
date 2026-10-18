"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedAiNodeProps {
  isFocused?: boolean;
  className?: string;
}

export function AnimatedAiNode({ isFocused = false, className = "h-5 w-5" }: AnimatedAiNodeProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer Rotating/Pulsing Geometric Ring */}
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        animate={{
          rotate: isFocused ? 360 : [0, 90, 180, 270, 360],
        }}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: isFocused ? 8 : 20,
            ease: "linear",
          },
        }}
      >
        <motion.polygon
          points="12,2 22,12 12,22 2,12"
          stroke="currentColor"
          strokeWidth="1.25"
          className="text-amber-500/70"
          initial={{ pathLength: 0.8 }}
          animate={{
            pathLength: [0.8, 1, 0.8],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
        />
        <circle
          cx="12"
          cy="12"
          r="3"
          className="fill-amber-500"
        />
      </motion.svg>

      {/* Subtle Focus Ring */}
      {isFocused && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border border-amber-500"
        />
      )}
    </div>
  );
}
