import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // In development / testing without a live webhook secret
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err: any) {
    console.error(`Webhook signature verification failed:`, err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle successful checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (metadata?.toolSlug) {
      const toolSlug = metadata.toolSlug;
      const planTier = (metadata.planTier as any) || "FAST_TRACK";

      try {
        // 1. Promote tool to PUBLISHED with verified badge
        const tool = await prisma.tool.upsert({
          where: { slug: toolSlug },
          update: {
            status: "PUBLISHED",
            verifiedBadge: true,
          },
          create: {
            name: metadata.toolName || toolSlug,
            slug: toolSlug,
            tagline: "Frontier AI Solution",
            description: "Verified listing on NexusAI directory.",
            websiteUrl: metadata.websiteUrl || "https://example.com",
            status: "PUBLISHED",
            verifiedBadge: true,
          },
        });

        // 2. Provision or upgrade Vendor record
        await prisma.vendor.upsert({
          where: { toolId: tool.id },
          update: {
            planTier: planTier,
            analyticsAccess: true,
          },
          create: {
            userId: session.customer_email || metadata.contactEmail || `user_${Date.now()}`,
            toolId: tool.id,
            planTier: planTier,
            analyticsAccess: true,
          },
        });

        console.log(`Successfully upgraded tool ${toolSlug} to ${planTier}`);
      } catch (dbError) {
        console.error("Database error during Stripe webhook fulfillment:", dbError);
      }
    }
  }

  return NextResponse.json({ received: true });
}
