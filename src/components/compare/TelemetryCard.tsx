import React from "react";
import { Badge } from "@/components/badge";
import { BrandLogo } from "@/components/ui/BrandLogos";

export interface TelemetryCardProps {
  tool: {
    name: string;
    slug?: string;
    pricingType?: string;
    tagline?: string;
    reviewScore?: number;
    domainAuthority?: number | null;
    benchmarkScores?: {
      reasoningScore?: number;
      speedScore?: number;
      accuracyScore?: number;
      contextWindowScore?: number;
    };
  };
  candidateIndex?: number;
  className?: string;
}

export function TelemetryCard({
  tool,
  candidateIndex = 0,
  className = "",
}: TelemetryCardProps) {
  const reasoningPct = Math.min(
    100,
    Math.round(
      tool.benchmarkScores?.reasoningScore ??
        (tool.reviewScore ? tool.reviewScore * 20 : 85)
    )
  );

  const domainScore = tool.domainAuthority ?? 82;

  return (
    <div
      className={`rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-5 shadow-xs transition-all hover:border-amber-500/30 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-xs bg-stone-50 dark:bg-stone-900">
            <BrandLogo
              slug={tool.slug || tool.name}
              size={40}
              className="h-full w-full"
            />
          </div>
          <div>
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
              {tool.name}
            </h4>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              {tool.pricingType || "Subscription"}
            </span>
          </div>
        </div>

        <span className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
          Candidate #{candidateIndex + 1}
        </span>
      </div>

      {tool.tagline && (
        <p className="mt-3 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
          {tool.tagline}
        </p>
      )}

      {/* Monochromatic Clean Telemetry System */}
      <div className="mt-4 space-y-3 pt-3.5 border-t border-stone-200 dark:border-stone-800 text-xs">
        {/* Metric 1: Reasoning & Quality */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[11px] font-medium text-stone-700 dark:text-stone-300">
              Reasoning &amp; Quality
            </span>
            <span className="font-mono text-xs font-semibold text-stone-900 dark:text-stone-100">
              {reasoningPct}%
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-stone-100 dark:bg-stone-900 overflow-hidden border border-stone-200/50 dark:border-stone-800/50">
            <div
              className="h-full bg-stone-900 dark:bg-stone-100 rounded-full transition-all duration-300"
              style={{ width: `${reasoningPct}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Domain Authority & Trust */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[11px] font-medium text-stone-600 dark:text-stone-400">
              Domain Authority
            </span>
            <span className="font-mono text-xs text-stone-600 dark:text-stone-400">
              {domainScore}/100
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-stone-100 dark:bg-stone-900 overflow-hidden border border-stone-200/50 dark:border-stone-800/50">
            <div
              className="h-full bg-stone-400 dark:bg-stone-700 rounded-full transition-all duration-300"
              style={{ width: `${domainScore}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
