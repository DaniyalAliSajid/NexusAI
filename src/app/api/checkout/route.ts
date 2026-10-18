import { NextResponse } from "next/server";
import { stripe, PLAN_TIERS } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { planId, toolData } = body;

    if (!toolData?.name || !toolData?.websiteUrl) {
      return NextResponse.json(
        { error: "Tool name and website URL are required." },
        { status: 400 }
      );
    }

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const slug = toolData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    // 1. FREE LIFETIME PLAN: Instant submission to database without payment
    if (planId === "free" || !planId) {
      try {
        await prisma.tool.upsert({
          where: { slug },
          update: {
            name: toolData.name,
            tagline: toolData.tagline || "",
            description: toolData.description || "",
            websiteUrl: toolData.websiteUrl,
            pricingType: toolData.pricingType || "FREEMIUM",
            status: "PENDING",
          },
          create: {
            name: toolData.name,
            slug,
            tagline: toolData.tagline || "Innovative AI Application",
            description: toolData.description || "Submitted via NexusAI Freemium Portal",
            websiteUrl: toolData.websiteUrl,
            pricingType: toolData.pricingType || "FREEMIUM",
            status: "PENDING",
            verifiedBadge: false,
          },
        });
      } catch (dbErr) {
        console.warn("Prisma upsert fallback in sandbox mode:", dbErr);
      }

      return NextResponse.json({
        success: true,
        isFree: true,
        redirectUrl: `${origin}/dashboard?submitted=true&plan=free&slug=${slug}`,
      });
    }

    // 2. PAID TIERS: FAST_TRACK, FEATURED, GROWTH_PARTNER
    const selectedPlanKey =
      planId === "fast_track"
        ? "FAST_TRACK"
        : planId === "featured"
        ? "FEATURED"
        : "EXPERT_REVIEW";

    const planConfig = PLAN_TIERS[selectedPlanKey];

    // Check if Stripe key is configured with a real live/test key
    const hasRealStripeKey =
      process.env.STRIPE_SECRET_KEY &&
      !process.env.STRIPE_SECRET_KEY.includes("dummy");

    if (hasRealStripeKey) {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `NexusAI ${planConfig.name} Placement`,
                description: `Sponsorship & indexing for ${toolData.name}`,
              },
              unit_amount: planConfig.price,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        customer_email: toolData.contactEmail || undefined,
        success_url: `${origin}/dashboard?payment=success&session_id={CHECKOUT_SESSION_ID}&plan=${planId}&slug=${slug}`,
        cancel_url: `${origin}/submit?payment=cancelled`,
        metadata: {
          toolName: toolData.name,
          toolSlug: slug,
          websiteUrl: toolData.websiteUrl,
          planTier: selectedPlanKey,
          contactEmail: toolData.contactEmail || "",
        },
      });

      return NextResponse.json({
        success: true,
        sessionId: session.id,
        checkoutUrl: session.url,
      });
    }

    // Dev/Sandbox simulation fallback for instant testing
    return NextResponse.json({
      success: true,
      isSandbox: true,
      checkoutUrl: `${origin}/dashboard?payment=success&mock_session=cs_test_mock_${Date.now()}&plan=${planId}&slug=${slug}`,
    });
  } catch (error: any) {
    console.error("Checkout session error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
