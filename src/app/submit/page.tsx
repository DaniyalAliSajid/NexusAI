"use client";

import React, { useState } from "react";
import {
  Zap,
  CheckCircle2,
  ShieldCheck,
  Flame,
  ArrowRight,
  Globe,
  Mail,
  Loader2,
  Crown,
} from "lucide-react";
import { Badge } from "@/components/badge";

export default function SubmitPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>("fast_track");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    websiteUrl: "",
    tagline: "",
    description: "",
    category: "coding",
    pricingType: "FREEMIUM",
    startingPrice: "20",
    contactEmail: "",
    isClaiming: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.websiteUrl || !formData.contactEmail) {
      alert("Please provide the Tool Name, Website URL, and Contact Email.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedPlan,
          toolData: formData,
        }),
      });

      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        alert("Submission processed successfully!");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to submit tool. Please check your network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-150">
      <div className="mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="text-center">
          <span className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            Maintainer &amp; Founder Portal
          </span>
          <h1 className="mt-3 text-3xl font-bold text-stone-900 dark:text-white tracking-tight sm:text-4xl">
            Submit &amp; Claim Your AI Tool
          </h1>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Get your AI product indexed in front of 30,000+ developers, enterprise buyers, and founders. Choose between our Free Community queue or Accelerated publishing.
          </p>
        </div>

        {/* STEP 1: SELECT PLAN TIER */}
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-stone-200 text-stone-900 dark:bg-stone-800 dark:text-white font-mono font-bold text-xs">
              1
            </span>
            <h2 className="text-sm font-semibold text-stone-900 dark:text-white tracking-tight uppercase">
              Distribution &amp; Review Tier
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* a) Free Lifetime */}
            <div
              onClick={() => setSelectedPlan("free")}
              className={`cursor-pointer rounded-xl border p-5 transition-all flex flex-col justify-between shadow-xs ${
                selectedPlan === "free"
                  ? "border-amber-600 dark:border-amber-500 bg-amber-500/10 dark:bg-stone-900 ring-1 ring-amber-500/30"
                  : "border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] hover:border-amber-500/40"
              }`}
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-mono uppercase text-stone-500 dark:text-stone-400">Community</span>
                  <Badge variant="neutral" size="sm">
                    Free
                  </Badge>
                </div>
                <h3 className="mt-2 text-base font-semibold text-stone-900 dark:text-white">Free Lifetime</h3>
                <div className="mt-1 text-2xl font-bold text-stone-900 dark:text-white font-mono">$0</div>
                <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Basic directory listing placed in verified community queue.
                </p>

                <ul className="mt-4 space-y-2 text-xs text-stone-600 dark:text-stone-400">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-stone-400 dark:text-stone-500 shrink-0" />
                    <span>Permanent index listing</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-stone-400 dark:text-stone-500 shrink-0" />
                    <span>Standard queue</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-stone-400 dark:text-stone-500 shrink-0" />
                    <span>No-Follow link</span>
                  </li>
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 text-center text-xs font-medium text-stone-700 dark:text-stone-300">
                {selectedPlan === "free" ? "✓ Selected" : "Select Free"}
              </div>
            </div>

            {/* b) Fast Track */}
            <div
              onClick={() => setSelectedPlan("fast_track")}
              className={`cursor-pointer rounded-xl border p-5 transition-all flex flex-col justify-between relative shadow-xs ${
                selectedPlan === "fast_track"
                  ? "border-amber-600 dark:border-amber-500 bg-amber-500/10 dark:bg-stone-900 ring-1 ring-amber-500/30"
                  : "border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] hover:border-amber-500/40"
              }`}
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-mono uppercase text-amber-700 dark:text-amber-400 font-semibold">Priority</span>
                  <ShieldCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="mt-2 text-base font-semibold text-stone-900 dark:text-white">Fast Track</h3>
                <div className="mt-1 text-2xl font-bold text-stone-900 dark:text-white font-mono">
                  $19
                  <span className="text-xs text-stone-500 dark:text-stone-400 font-normal"> /one-time</span>
                </div>
                <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Fast publishing within 12 hours with Do-Follow backlink.
                </p>

                <ul className="mt-4 space-y-2 text-xs text-stone-700 dark:text-stone-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span><strong>12-Hour</strong> Guaranteed publish</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span><strong>Do-Follow</strong> SEO backlink</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Verified Badge</span>
                  </li>
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 text-center text-xs font-semibold text-amber-700 dark:text-amber-400">
                {selectedPlan === "fast_track" ? "✓ Selected" : "Select Fast Track"}
              </div>
            </div>

            {/* c) Featured Spotlight */}
            <div
              onClick={() => setSelectedPlan("featured")}
              className={`cursor-pointer rounded-xl border p-5 transition-all flex flex-col justify-between relative shadow-xs ${
                selectedPlan === "featured"
                  ? "border-amber-600 dark:border-amber-500 bg-amber-500/10 dark:bg-stone-900 ring-1 ring-amber-500/30"
                  : "border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] hover:border-amber-500/40"
              }`}
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-mono uppercase text-stone-500 dark:text-stone-400">Spotlight</span>
                  <Flame className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                </div>
                <h3 className="mt-2 text-base font-semibold text-stone-900 dark:text-white">Featured Spotlight</h3>
                <div className="mt-1 text-2xl font-bold text-stone-900 dark:text-white font-mono">
                  $49
                  <span className="text-xs text-stone-500 dark:text-stone-400 font-normal"> /one-time</span>
                </div>
                <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Prominent placement and newsletter distribution to 35k+ developers.
                </p>

                <ul className="mt-4 space-y-2 text-xs text-stone-700 dark:text-stone-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Top sticky placement</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Newsletter distribution</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Telemetry dashboard</span>
                  </li>
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 text-center text-xs font-semibold text-stone-800 dark:text-stone-200">
                {selectedPlan === "featured" ? "✓ Selected" : "Select Spotlight"}
              </div>
            </div>

            {/* d) Growth Partner */}
            <div
              onClick={() => setSelectedPlan("growth_partner")}
              className={`cursor-pointer rounded-xl border p-5 transition-all flex flex-col justify-between relative shadow-xs ${
                selectedPlan === "growth_partner"
                  ? "border-amber-600 dark:border-amber-500 bg-amber-500/10 dark:bg-stone-900 ring-1 ring-amber-500/30"
                  : "border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] hover:border-amber-500/40"
              }`}
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-mono uppercase text-amber-700 dark:text-amber-400 font-semibold">Growth</span>
                  <Crown className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="mt-2 text-base font-semibold text-stone-900 dark:text-white">Growth Partner</h3>
                <div className="mt-1 text-2xl font-bold text-stone-900 dark:text-white font-mono">
                  $89
                  <span className="text-xs text-stone-500 dark:text-stone-400 font-normal"> /one-time</span>
                </div>
                <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Full custom review, lead capture widget, and Google indexing.
                </p>

                <ul className="mt-4 space-y-2 text-xs text-stone-700 dark:text-stone-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>1,500-word review</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Custom Lead Widget</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Organic Google Indexing</span>
                  </li>
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 text-center text-xs font-semibold text-amber-700 dark:text-amber-400">
                {selectedPlan === "growth_partner" ? "✓ Selected" : "Select Growth"}
              </div>
            </div>
          </div>
        </div>

        {/* STEP 2: METADATA & CLAIM WIZARD FORM */}
        <form onSubmit={handleSubmit} className="mt-10 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1c1917] p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-2 mb-5 border-b border-stone-200 dark:border-stone-800 pb-3">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-stone-200 text-stone-900 dark:bg-stone-800 dark:text-white font-mono font-bold text-xs">
              2
            </span>
            <h2 className="text-sm font-semibold text-stone-900 dark:text-white tracking-tight uppercase">
              Metadata &amp; Founder Information
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                Tool Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Cursor, Runway Gen-3"
                className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-3.5 py-2 text-xs text-stone-950 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:border-amber-500/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                Website URL *
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-2.5 h-3.5 w-3.5 text-stone-400 dark:text-stone-500" />
                <input
                  type="url"
                  name="websiteUrl"
                  required
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  placeholder="https://yourcompany.com"
                  className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 pl-9 pr-3.5 py-2 text-xs text-stone-950 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:border-amber-500/50 focus:outline-none"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                Tagline *
              </label>
              <input
                type="text"
                name="tagline"
                required
                value={formData.tagline}
                onChange={handleInputChange}
                placeholder="One concise line explaining the tool's core value"
                className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-3.5 py-2 text-xs text-stone-950 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:border-amber-500/50 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                Full Description
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe key capabilities and architecture..."
                className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-3.5 py-2 text-xs text-stone-950 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:border-amber-500/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-3 py-2 text-xs text-stone-950 dark:text-white focus:border-amber-500/50 focus:outline-none cursor-pointer"
              >
                <option value="coding">Coding Agents &amp; IDEs</option>
                <option value="llms">LLMs &amp; Reasoning Models</option>
                <option value="video">Video &amp; 3D Generation</option>
                <option value="art">Generative Art &amp; Design</option>
                <option value="search">Research &amp; Search Engines</option>
                <option value="audio">Voice &amp; Speech AI</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                Pricing Model
              </label>
              <select
                name="pricingType"
                value={formData.pricingType}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-3 py-2 text-xs text-stone-950 dark:text-white focus:border-amber-500/50 focus:outline-none cursor-pointer"
              >
                <option value="FREEMIUM">Freemium</option>
                <option value="FREE">100% Free / Open Source</option>
                <option value="PAID">Paid / Commercial</option>
                <option value="TRIAL">Free Trial Available</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                Founder Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-3.5 w-3.5 text-stone-400 dark:text-stone-500" />
                <input
                  type="email"
                  name="contactEmail"
                  required
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="founder@company.com"
                  className="w-full rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 pl-9 pr-3.5 py-2 text-xs text-stone-950 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:border-amber-500/50 focus:outline-none"
                />
              </div>
            </div>

            <div className="sm:col-span-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/50 p-3.5 shadow-xs">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.isClaiming}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, isClaiming: e.target.checked }))
                  }
                  className="rounded border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-amber-600 focus:ring-0 accent-amber-600 mt-0.5"
                />
                <div className="text-xs">
                  <span className="font-semibold text-stone-900 dark:text-white block">
                    Claim Official Tool Ownership
                  </span>
                  <span className="text-stone-500 dark:text-stone-400 text-[11px]">
                    Verify that you represent the creators of this software.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-stone-200 dark:border-stone-800 pt-4">
            <div className="text-xs text-stone-600 dark:text-stone-400">
              Selected Tier:{" "}
              <strong className="text-stone-950 dark:text-white uppercase font-mono">
                {selectedPlan.replace("_", " ")}
              </strong>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-5 py-2.5 font-medium text-xs text-white transition-all hover:bg-amber-500 disabled:opacity-50 cursor-pointer shadow-sm active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>
                    {selectedPlan === "free"
                      ? "Submit Free Listing"
                      : "Proceed to Secure Stripe Checkout"}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
