import { NextRequest, NextResponse } from "next/server";
import { stripe, getPlanByPriceId } from "@/lib/payments/stripe";
import { upgradeUserMembership, createPaymentRecord } from "@/lib/payments/user-management";
import { MembershipTier } from "@/app/generated/prisma";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment succeeded:", paymentIntent.id);
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCancellation(subscription);
        break;
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.subscription) {
          console.log("Subscription invoice paid:", invoice.id);
        }
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const { userId, planType } = session.metadata || {};

  if (!userId || !planType) {
    console.error("Missing metadata in checkout session:", session.id);
    return;
  }

  try {
    // Retrieve the line items to get the price ID
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const priceId = lineItems.data[0]?.price?.id;

    if (!priceId) {
      console.error("No price ID found in line items for session:", session.id);
      return;
    }

    const plan = getPlanByPriceId(priceId);
    if (!plan) {
      console.error("Unknown plan for price ID:", priceId);
      return;
    }

    // Map plan types to membership tiers
    // Both Individual plans map to PRO_LIFETIME tier
    const tier: MembershipTier = "PRO_LIFETIME";
    
    await upgradeUserMembership(
      userId,
      tier,
      session.customer as string,
      session.payment_intent as string
    );

    // Store payment record
    await createPaymentRecord({
      userId,
      stripeSessionId: session.id,
      stripePaymentIntentId: session.payment_intent as string,
      amount: session.amount_total || 0,
      currency: session.currency?.toUpperCase() || "USD",
      planType,
      status: "completed",
      createdAt: new Date(),
    });

    console.log(`Successfully upgraded user ${userId} to ${planType}`);
  } catch (error) {
    console.error("Failed to upgrade user:", error);
    throw error;
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  
  try {
    // Find user by Stripe customer ID
    const { PrismaClient } = await import("@/app/generated/prisma");
    const prisma = new PrismaClient();
    
    const user = await prisma.user.findUnique({
      where: { stripeCustomerId: customerId },
      include: { proMembership: true },
    });
    
    if (!user?.proMembership) {
      console.error("No user or membership found for customer:", customerId);
      return;
    }
    
    // Update subscription status
    const isActive = subscription.status === "active" || subscription.status === "trialing";
    
    await prisma.proMembership.update({
      where: { userId: user.id },
      data: {
        isActive,
        status: isActive ? "ACTIVE" : "INACTIVE",
        updatedAt: new Date(),
      },
    });
    
    console.log(`Updated subscription for user ${user.id}: ${subscription.status}`);
  } catch (error) {
    console.error("Failed to update subscription:", error);
    throw error;
  }
}

async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  
  try {
    const { PrismaClient } = await import("@/app/generated/prisma");
    const prisma = new PrismaClient();
    
    const user = await prisma.user.findUnique({
      where: { stripeCustomerId: customerId },
      include: { proMembership: true },
    });
    
    if (!user?.proMembership) {
      console.error("No user or membership found for customer:", customerId);
      return;
    }
    
    // Deactivate membership
    await prisma.proMembership.update({
      where: { userId: user.id },
      data: {
        isActive: false,
        status: "INACTIVE",
        updatedAt: new Date(),
      },
    });
    
    console.log(`Cancelled subscription for user ${user.id}`);
  } catch (error) {
    console.error("Failed to cancel subscription:", error);
    throw error;
  }
}