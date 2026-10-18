import React from "react";
import Link from "next/link";
import { Globe, ExternalLink, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 dark:border-stone-800/80 bg-stone-100/70 dark:bg-[#0c0a09] text-stone-600 dark:text-stone-400 transition-colors duration-150">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-900 text-amber-500 dark:bg-stone-100 dark:text-amber-600 font-semibold text-xs shadow-xs">
                ✦
              </div>
              <span className="text-base font-semibold tracking-tight text-stone-900 dark:text-stone-100">
                NexusAI
              </span>
            </div>
            <p className="mt-3 max-w-sm text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              The verified directory and benchmark engine indexing frontier AI models, developer agents, and generative workflows for modern software teams.
            </p>

            <div className="mt-5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 px-2.5 py-1 text-[11px] text-stone-700 dark:text-stone-300 shadow-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>All Catalog Services Operational</span>
              </span>
            </div>
          </div>

          {/* Directory Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-200">
              Directory
            </h3>
            <ul className="mt-3.5 space-y-2 text-xs">
              <li>
                <Link href="/categories" className="font-semibold text-amber-600 dark:text-amber-400 hover:underline transition-colors">
                  All Categories →
                </Link>
              </li>
              <li>
                <Link href="/categories/coding" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Coding Agents
                </Link>
              </li>
              <li>
                <Link href="/categories/llms" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Reasoning LLMs
                </Link>
              </li>
              <li>
                <Link href="/categories/video" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Generative Video & 3D
                </Link>
              </li>
              <li>
                <Link href="/categories/audio" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Voice & Realtime Speech
                </Link>
              </li>
              <li>
                <Link href="/tools?pricing=FREE" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Open Source & Free Tier
                </Link>
              </li>
            </ul>
          </div>

          {/* Matrix Comparisons Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              Comparisons
            </h3>
            <ul className="mt-3.5 space-y-2 text-xs">
              <li>
                <Link href="/compare/cursor-vs-claude-3-7-sonnet" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Cursor vs. Claude 3.7
                </Link>
              </li>
              <li>
                <Link href="/compare/midjourney-vs-flux-schnell" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Midjourney vs. Flux
                </Link>
              </li>
              <li>
                <Link href="/compare/perplexity-vs-deepseek-r1" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Perplexity vs. DeepSeek
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Side-by-Side Matrix
                </Link>
              </li>
            </ul>
          </div>

          {/* For Creators & Vendors */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              For Maintainers
            </h3>
            <ul className="mt-3.5 space-y-2 text-xs">
              <li>
                <Link href="/submit" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Submit AI Tool
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Fast Track (12h)
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Vendor Portal
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Dofollow Directory
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 dark:border-zinc-800/80 pt-6 sm:flex-row text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} NexusAI. Built for engineering teams and founders.</p>
          <div className="flex items-center gap-5">
            <Link href="/tools" className="hover:text-zinc-700 dark:hover:text-zinc-300">Directory</Link>
            <Link href="/sitemap.xml" className="hover:text-zinc-700 dark:hover:text-zinc-300">Sitemap</Link>
            <Link href="/robots.txt" className="hover:text-zinc-700 dark:hover:text-zinc-300">Robots</Link>
            <span>Clean B2B SaaS Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
