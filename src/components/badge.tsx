import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "indigo" | "emerald" | "amber" | "neutral" | "cyan" | "purple";
  size?: "sm" | "md";
  glowing?: boolean;
  children: React.ReactNode;
}

export function Badge({
  variant = "amber",
  size = "md",
  glowing = false,
  children,
  className,
  ...props
}: BadgeProps) {
  const variantStyles = {
    // Warm Amber primary accent
    indigo: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25",
    amber: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25",
    emerald: "bg-stone-200/60 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-300 dark:border-stone-700",
    neutral: "bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700",
    cyan: "bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800",
    purple: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 font-medium tracking-tight",
    md: "text-xs px-2.5 py-1 font-medium tracking-tight",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border transition-all duration-150 select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
