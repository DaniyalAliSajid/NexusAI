import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy_nexusai_stripe_key", {
  apiVersion: "2025-02-24.acacia" as any,
  typescript: true,
});

export const PLAN_TIERS = {
  FREE: {
    id: "free",
    name: "Free Lifetime",
    price: 0,
    priceLabel: "$0",
    badge: "Community",
    features: [
      "Standard directory placement",
      "Community reviews & ratings",
      "No-follow outbound link",
      "Standard 7-day review queue",
    ],
  },
  FAST_TRACK: {
    id: "fast_track",
    name: "Fast Track",
    price: 1900, // $19.00 in cents
    priceLabel: "$19",
    badge: "Fast 12h",
    features: [
      "Guaranteed publishing within 12 hours",
      "Do-Follow high DA SEO backlink",
      "Verified AI Badge on profile",
      "Permanent placement in category index",
    ],
  },
  FEATURED: {
    id: "featured",
    name: "Featured Spotlight",
    price: 4900, // $49.00 in cents
    priceLabel: "$49",
    badge: "Popular",
    features: [
      "Top sticky placement on homepage & category",
      "Highlighted in weekly NexusAI Newsletter (35k+ devs)",
      "Do-Follow backlink + social announcement",
      "Full analytics telemetry access",
    ],
  },
  EXPERT_REVIEW: {
    id: "growth_partner",
    name: "Growth Partner",
    price: 8900, // $89.00 in cents
    priceLabel: "$89",
    badge: "Max Growth",
    features: [
      "In-depth 1,500-word benchmark & review article",
      "Custom Lead Capture widget directly on tool card",
      "Guaranteed organic Google Search indexing",
      "Priority inclusion in head-to-head comparison engine",
    ],
  },
};
