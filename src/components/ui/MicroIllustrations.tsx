"use client";

import React from "react";
import { motion } from "framer-motion";

interface SvgProps {
  className?: string;
  isHovered?: boolean;
}

export function CodeBracketsSvg({ className = "h-5 w-5", isHovered = false }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <motion.path
        d="M8 6L3 12L8 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          x: isHovered ? -1.5 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.path
        d="M16 6L21 12L16 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          x: isHovered ? 1.5 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.path
        d="M14 4L10 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-amber-500"
        initial={{ pathLength: 0.8 }}
        animate={{
          pathLength: isHovered ? 1 : 0.8,
          opacity: isHovered ? 1 : 0.7,
        }}
        transition={{ duration: 0.3 }}
      />
    </svg>
  );
}

export function NeuralNetworkSvg({ className = "h-5 w-5", isHovered = false }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="6" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="18" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.25" className="text-amber-500" />

      <motion.path
        d="M8.5 7L15.5 11"
        stroke="currentColor"
        strokeWidth="1.25"
        initial={{ pathLength: 0.6 }}
        animate={{ pathLength: isHovered ? 1 : 0.6 }}
        transition={{ duration: 0.3 }}
      />
      <motion.path
        d="M8.5 17L15.5 13"
        stroke="currentColor"
        strokeWidth="1.25"
        initial={{ pathLength: 0.6 }}
        animate={{ pathLength: isHovered ? 1 : 0.6 }}
        transition={{ duration: 0.3 }}
      />
    </svg>
  );
}

export function TelemetryChartSvg({ className = "h-5 w-5", isHovered = false }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 20H21" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <motion.path
        d="M4 16L9 11L14 14L20 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-amber-500"
        initial={{ pathLength: 0.7 }}
        animate={{
          pathLength: isHovered ? 1 : 0.7,
        }}
        transition={{ duration: 0.3 }}
      />
      <circle cx="20" cy="7" r="1.5" className="fill-amber-500" />
    </svg>
  );
}

export function GenerativeCanvasSvg({ className = "h-5 w-5", isHovered = false }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.25" />
      <motion.circle
        cx="8.5"
        cy="8.5"
        r="2"
        stroke="currentColor"
        strokeWidth="1.25"
        className="text-amber-500"
        animate={{ scale: isHovered ? 1.15 : 1 }}
      />
      <motion.path
        d="M21 15L16 10L5 21"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0.8 }}
        animate={{ pathLength: isHovered ? 1 : 0.8 }}
      />
    </svg>
  );
}

export function SearchGraphSvg({ className = "h-5 w-5", isHovered = false }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.25" />
      <motion.path
        d="M16.5 16.5L21 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{
          x: isHovered ? 1 : 0,
          y: isHovered ? 1 : 0,
        }}
      />
      <circle cx="11" cy="11" r="2" className="fill-amber-500/80" />
    </svg>
  );
}

export function AudioWaveSvg({ className = "h-5 w-5", isHovered = false }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <motion.line
        x1="6"
        y1="9"
        x2="6"
        y2="15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{ y1: isHovered ? 6 : 9, y2: isHovered ? 18 : 15 }}
      />
      <motion.line
        x1="12"
        y1="5"
        x2="12"
        y2="19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-amber-500"
        animate={{ y1: isHovered ? 3 : 5, y2: isHovered ? 21 : 19 }}
      />
      <motion.line
        x1="18"
        y1="9"
        x2="18"
        y2="15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{ y1: isHovered ? 7 : 9, y2: isHovered ? 17 : 15 }}
      />
    </svg>
  );
}
