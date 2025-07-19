import { NextRequest, NextResponse } from "next/server";
import { stripe, getPlanByPriceId } from "@/lib/payments/stripe";
import { upgradeUserMembership, createPaymentRecord, type MembershipType } from "@/lib/payments/user-management";
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

    // Update user's membership status
    const membership: MembershipType = planType === "INDIVIDUAL_LIFETIME" ? "PRO" : "PRO";
    await upgradeUserMembership(
      userId,
      membership,
      session.customer as string
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