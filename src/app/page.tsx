"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Sparkles,
  Layers,
  Code2,
  Brain,
  Video,
  Mic,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/badge";
import { ToolCard, ToolCardData } from "@/components/tool-card";
import { AgentBar } from "@/components/ai-finder/AgentBar";
import { CommandPalette } from "@/components/command-palette";
import { InteractiveVectorGrid } from "@/components/ui/InteractiveVectorGrid";
import { BrandLogo } from "@/components/ui/BrandLogos";
import { TelemetryCard } from "@/components/compare/TelemetryCard";

const INITIAL_TOOLS: ToolCardData[] = [
  {
    id: "tool_1",
    name: "Cursor AI",
    slug: "cursor-ai",
    tagline: "The AI-first Code Editor built for pairing with frontier reasoning models.",
    description: "An intelligent, fork-of-VSCode development environment engineered specifically for deep multi-file AI code generation and instant codebase indexing.",
    websiteUrl: "https://cursor.com",
    pricingType: "FREEMIUM",
    startingPrice: 20,
    categories: [
      { id: "cat_1", name: "Coding Agents", slug: "coding-agents" },
      { id: "cat_2", name: "Developer Tools", slug: "developer-tools" },
    ],
    tags: ["editor", "agentic-coding", "autocomplete", "multi-file"],
    verifiedBadge: true,
    domainAuthority: 84,
    reviewScore: 4.96,
    dealPercent: 20,
  },
  {
    id: "tool_2",
    name: "Claude 3.7 Sonnet",
    slug: "claude-3-7-sonnet",
    tagline: "Hybrid frontier reasoning and coding model with extended thought tokens.",
    description: "Anthropic's flagship hybrid model that can instantaneously switch between fast responses and extended, visible reasoning step sequences.",
    websiteUrl: "https://anthropic.com/claude",
    pricingType: "FREEMIUM",
    startingPrice: 20,
    categories: [
      { id: "cat_3", name: "LLMs & Reasoning", slug: "llms-reasoning" },
      { id: "cat_1", name: "Coding Agents", slug: "coding-agents" },
    ],
    tags: ["reasoning", "multimodal", "hybrid-thinking", "api"],
    verifiedBadge: true,
    domainAuthority: 91,
    reviewScore: 4.98,
  },
  {
    id: "tool_3",
    name: "Midjourney v7",
    slug: "midjourney-v7",
    tagline: "Hyper-realistic generative image synthesis and creative art platform.",
    description: "State of the art generative visual diffusion platform producing photorealistic textures, dynamic lighting, and coherent multi-subject compositions.",
    websiteUrl: "https://midjourney.com",
    pricingType: "PAID",
    startingPrice: 10,
    categories: [
      { id: "cat_4", name: "Generative Art", slug: "generative-art" },
    ],
    tags: ["text-to-image", "photorealism", "creative-art"],
    verifiedBadge: true,
    domainAuthority: 89,
    reviewScore: 4.88,
  },
  {
    id: "tool_4",
    name: "Perplexity Pro",
    slug: "perplexity-pro",
    tagline: "Live-search AI engine with transparent citation trees and academic search.",
    description: "Combines real-time web crawling with multi-LLM synthesis to provide conversational answers with verifiable inline sources.",
    websiteUrl: "https://perplexity.ai",
    pricingType: "FREEMIUM",
    startingPrice: 20,
    categories: [
      { id: "cat_5", name: "Research & Search", slug: "research-search" },
    ],
    tags: ["search", "citations", "academic", "live-web"],
    verifiedBadge: true,
    domainAuthority: 86,
    reviewScore: 4.82,
  },
  {
    id: "tool_5",
    name: "ElevenLabs Prime",
    slug: "elevenlabs-prime",
    tagline: "Ultra-natural multilingual voice synthesis, voice cloning, and audio AI.",
    description: "Generates emotive, human-grade voiceovers with zero latency speech-to-speech translation across 32+ international languages.",
    websiteUrl: "https://elevenlabs.io",
    pricingType: "FREEMIUM",
    startingPrice: 5,
    categories: [
      { id: "cat_6", name: "Voice & Audio", slug: "voice-audio" },
    ],
    tags: ["voice-cloning", "speech-synthesis", "podcast", "dubbing"],
    verifiedBadge: true,
    domainAuthority: 82,
    reviewScore: 4.79,
    dealPercent: 15,
  },
  {
    id: "tool_6",
    name: "v0 by Vercel",
    slug: "v0-vercel",
    tagline: "Generative UI system to rapidly scaffold, preview, and export React/Tailwind.",
    description: "Converts text prompts into modern Shadcn/UI and Tailwind CSS components ready to drop directly into Next.js App Router projects.",
    websiteUrl: "https://v0.dev",
    pricingType: "FREE",
    startingPrice: 0,
    categories: [
      { id: "cat_1", name: "Coding Agents", slug: "coding-agents" },
      { id: "cat_2", name: "Developer Tools", slug: "developer-tools" },
    ],
    tags: ["ui-generation", "react", "shadcn", "tailwind"],
    verifiedBadge: true,
    domainAuthority: 80,
    reviewScore: 4.72,
  },
  {
    id: "tool_7",
    name: "DeepSeek-R1",
    slug: "deepseek-r1",
    tagline: "Open-weights frontier reasoning engine trained through large-scale RL.",
    description: "Massively capable open-weights reasoning model matching closed-source frontier architectures in competitive programming and mathematical proof.",
    websiteUrl: "https://deepseek.com",
    pricingType: "FREE",
    startingPrice: 0,
    categories: [
      { id: "cat_3", name: "LLMs & Reasoning", slug: "llms-reasoning" },
    ],
    tags: ["open-weights", "reinforcement-learning", "math", "reasoning"],
    verifiedBadge: true,
    domainAuthority: 79,
    reviewScore: 4.91,
  },
  {
    id: "tool_8",
    name: "Flux.1 Schnell",
    slug: "flux-schnell",
    tagline: "Next-gen open-weights rectified flow transformer for image generation.",
    description: "12B parameter rectified flow transformer for lightning-speed photorealistic image generation, permissive Apache 2.0 license, and zero watermarks.",
    websiteUrl: "https://blackforestlabs.ai",
    pricingType: "FREE",
    startingPrice: 0,
    categories: [
      { id: "cat_4", name: "Generative Art", slug: "generative-art" },
    ],
    tags: ["open-weights", "free", "no-watermark", "commercial-rights"],
    verifiedBadge: true,
    domainAuthority: 76,
    reviewScore: 4.90,
  },
];

const CATEGORIES = [
  { id: "ALL", name: "All Tools", icon: Layers },
  { id: "coding-agents", name: "Coding Agents", icon: Code2 },
  { id: "llms-reasoning", name: "LLMs & Reasoning", icon: Brain },
  { id: "generative-art", name: "Generative Art & 3D", icon: Video },
  { id: "research-search", name: "Research & Search", icon: Search },
  { id: "voice-audio", name: "Voice & Audio", icon: Mic },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedPricing, setSelectedPricing] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Comparison selection
  const [compareList, setCompareList] = useState<ToolCardData[]>([
    INITIAL_TOOLS[0], // Cursor
    INITIAL_TOOLS[1], // Claude 3.7
  ]);

  const handleToggleCompare = (tool: ToolCardData) => {
    if (compareList.some((t) => t.id === tool.id)) {
      setCompareList(compareList.filter((t) => t.id !== tool.id));
    } else {
      if (compareList.length >= 2) {
        setCompareList([compareList[1], tool]);
      } else {
        setCompareList([...compareList, tool]);
      }
    }
  };

  const filteredTools = useMemo(() => {
    return INITIAL_TOOLS.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "ALL" ||
        tool.categories.some((c) => c.slug === selectedCategory);

      const matchesPricing =
        selectedPricing === "ALL" || tool.pricingType === selectedPricing;

      const matchesVerified = !onlyVerified || tool.verifiedBadge;

      return matchesSearch && matchesCategory && matchesPricing && matchesVerified;
    });
  }, [searchQuery, selectedCategory, selectedPricing, onlyVerified]);

  return (
    <div className="relative min-h-screen">
      {/* Interactive Subtle Vector Network Grid (Parallax Cursor Reaction) */}
      <InteractiveVectorGrid />

      {/* HERO SECTION - Clean Enterprise B2B Aesthetic */}
      <section className="relative pt-16 pb-16 sm:pt-24 sm:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Value-Driven Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] px-3.5 py-1 text-xs text-stone-700 dark:text-stone-300 shadow-xs"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-medium">Verified Software Intelligence</span>
            <span className="text-stone-400 dark:text-stone-600">•</span>
            <span className="text-stone-500 dark:text-stone-400">Q2 2026 Directory</span>
          </motion.div>

          {/* Crisp Headings - Clean High Contrast */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mt-6 text-4xl font-semibold tracking-tight text-stone-900 dark:text-white sm:text-6xl"
          >
            The Verified AI Directory for Modern Engineering Teams
          </motion.h1>

          {/* Clean Muted Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.18 }}
            className="mx-auto mt-5 max-w-2xl text-base text-stone-600 dark:text-stone-400 leading-relaxed"
          >
            Discover, benchmark, and deploy frontier AI models, developer agents, and generative workflows with transparent telemetry and verified community reviews.
          </motion.p>

          {/* CONVERSATIONAL AI AGENT FINDER */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mt-8"
          >
            <AgentBar />
          </motion.div>

          {/* REAL BUSINESS METRICS SECTION */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.35 }}
            className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 text-left transition-colors hover:border-amber-500/30 shadow-xs dark:shadow-none">
              <div className="text-2xl font-bold font-mono text-stone-900 dark:text-white">10,000+</div>
              <div className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">AI Tools Indexed</div>
            </div>
            <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 text-left transition-colors hover:border-amber-500/30 shadow-xs dark:shadow-none">
              <div className="text-2xl font-bold font-mono text-stone-900 dark:text-white">100%</div>
              <div className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">Verified Dofollow Directory</div>
            </div>
            <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 text-left transition-colors hover:border-amber-500/30 shadow-xs dark:shadow-none">
              <div className="text-2xl font-bold font-mono text-stone-900 dark:text-white">30K+</div>
              <div className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">Monthly Buyers & Founders</div>
            </div>
            <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-4 text-left transition-colors hover:border-amber-500/30 shadow-xs dark:shadow-none">
              <div className="text-2xl font-bold font-mono text-stone-900 dark:text-white">24h</div>
              <div className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">Guaranteed Publishing</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HEAD-TO-HEAD COMPARISON MATRIX PREVIEW */}
      <section id="compare" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-6 sm:p-7 shadow-xs dark:shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  Comparison Engine
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">Side-by-Side Telemetry</span>
              </div>
              <h2 className="mt-2 text-xl font-bold text-stone-900 dark:text-white tracking-tight">
                Programmatic Head-to-Head Duel
              </h2>
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 max-w-sm">
              Click &quot;Compare&quot; on any card below to swap candidates into this live comparison engine.
            </div>
          </div>

          {/* Comparison Cards Display using TelemetryCard */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {compareList.map((tool, idx) => (
              <TelemetryCard
                key={tool.id}
                tool={tool}
                candidateIndex={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MAIN DIRECTORY EXPLORER */}
      <section id="explore" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Category Filter Pills (Warm Stone & Amber) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-all duration-150 shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-stone-900 text-white border border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-200 shadow-xs"
                    : "border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 text-stone-700 dark:text-stone-300 hover:border-amber-500/50 hover:text-stone-950 dark:hover:text-stone-100"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-amber-500 dark:text-amber-600" : "text-stone-400 dark:text-stone-500"}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
          <Link
            href="/categories"
            className="flex items-center gap-1.5 rounded-lg border border-dashed border-amber-300 dark:border-amber-500/40 bg-amber-500/10 px-3.5 py-2 text-xs font-semibold text-amber-800 dark:text-amber-400 hover:bg-amber-500/20 shrink-0 transition-colors"
          >
            <span>All Categories Hub</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Filter Controls Row */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-3.5 shadow-xs">
          {/* Pricing Tabs */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-stone-500 dark:text-stone-400 text-[11px] uppercase font-mono mr-1">Pricing:</span>
            {["ALL", "FREE", "FREEMIUM", "PAID"].map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPricing(p)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                  selectedPricing === p
                    ? "bg-stone-900 text-white border border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-200 shadow-xs"
                    : "text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Verified Filter & Count */}
          <div className="flex items-center gap-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-stone-700 dark:text-stone-300 select-none">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="rounded border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-amber-600 focus:ring-0 accent-amber-600"
              />
              <span className="flex items-center gap-1 text-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-600 dark:text-amber-500" />
                Verified Only
              </span>
            </label>

            <span className="text-stone-500 font-mono text-[11px]">
              Showing <span className="text-stone-900 dark:text-stone-200 font-medium">{filteredTools.length}</span> tools
            </span>
          </div>
        </div>

        {/* Tools Cards Grid with Staggered Framer Motion Animations */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.06 },
            },
          }}
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filteredTools.map((tool) => (
            <motion.div
              key={tool.id}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
              }}
            >
              <ToolCard tool={tool} onCompare={handleToggleCompare} />
            </motion.div>
          ))}
        </motion.div>

        {filteredTools.length === 0 && (
          <div className="mt-8 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] py-14 text-center">
            <Sparkles className="mx-auto h-8 w-8 text-stone-400 animate-pulse" />
            <h3 className="mt-3 text-sm font-semibold text-stone-900 dark:text-white">No tools found</h3>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              Try adjusting your search query, pricing filter, or verified badge toggle.
            </p>
          </div>
        )}
      </section>

      {/* ENTERPRISE DIRECTORY ARCHITECTURE SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 border-t border-stone-200 dark:border-stone-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              Architecture & Transparency
            </span>
            <h2 className="mt-3 text-2xl font-bold text-stone-900 dark:text-white tracking-tight sm:text-3xl">
              Engineered for Enterprise Discovery & Direct Sourcing
            </h2>
            <p className="mt-3 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              NexusAI indexes software tools using transparent benchmarks, verified community audits, and programmatic telemetry. Built with high-speed caching and direct PostgreSQL data modeling.
            </p>

            <div className="mt-5 space-y-2.5 text-xs text-stone-700 dark:text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-600 dark:text-amber-500 shrink-0" />
                <span>Standardized latency and code accuracy benchmark telemetry</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-600 dark:text-amber-500 shrink-0" />
                <span>100% Do-Follow backlinks for verified maintainers and founders</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-600 dark:text-amber-500 shrink-0" />
                <span>Automatic daily ingestion from GitHub Trending, Product Hunt, and Hugging Face</span>
              </div>
            </div>
          </div>

          {/* Clean Terminal Box */}
          <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-5 font-mono text-xs shadow-md dark:shadow-xl">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3 text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
                <div className="h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
                <div className="h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
                <span className="ml-2 text-[11px] text-stone-600 dark:text-stone-400">nexusai.config.ts</span>
              </div>
              <Badge variant="amber" size="sm" glowing={false}>
                Production Ready
              </Badge>
            </div>
            <pre className="mt-4 text-stone-800 dark:text-stone-300 overflow-x-auto text-[11px] leading-relaxed">
{`export const directoryConfig = {
  version: "2026.2",
  catalogSize: "10,000+",
  indexingRate: "Real-time edge sync",
  verification: "Automated + Human expert audit",
  apiSupport: "REST + pgvector semantic retrieval",
};`}
            </pre>
          </div>
        </div>
      </section>

      {/* Global Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
    </div>
  );
}
