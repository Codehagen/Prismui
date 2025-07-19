import { NextRequest, NextResponse } from "next/server";
import { stripe, PLANS, type PlanType } from "@/lib/payments/stripe";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { planType }: { planType: PlanType } = await request.json();

    if (!planType || !PLANS[planType]) {
      return NextResponse.json(
        { error: "Invalid plan type" },
        { status: 400 }
      );
    }

    const plan = PLANS[planType];
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Determine payment mode based on plan type
    const isSubscription = planType === "INDIVIDUAL_ANNUAL"; // Annual plan
    const mode = isSubscription ? "subscription" : "payment";
    
    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer_email: session.user.email,
      payment_method_types: ["card"],
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      mode,
      success_url: `${baseUrl}/pro/upgrade/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pro/upgrade/cancel`,
      metadata: {
        userId: session.user.id,
        planType,
      },
      // Allow promotion codes
      allow_promotion_codes: true,
      // For subscriptions, allow customer to manage their subscription
      ...(isSubscription && {
        subscription_data: {
          metadata: {
            userId: session.user.id,
            planType,
          },
        },
      }),
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}