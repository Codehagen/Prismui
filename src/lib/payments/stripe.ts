import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export const STRIPE_PRICE_IDS = {
  INDIVIDUAL_LIFETIME: process.env.STRIPE_INDIVIDUAL_LIFETIME_PRICE_ID!,
  INDIVIDUAL_PREMIUM: process.env.STRIPE_INDIVIDUAL_PREMIUM_PRICE_ID!,
} as const;

export const PLANS = {
  INDIVIDUAL_LIFETIME: {
    name: "Individual License - Lifetime Access",
    price: 199,
    priceId: STRIPE_PRICE_IDS.INDIVIDUAL_LIFETIME,
    features: [
      "50+ Premium components",
      "Advanced animations & effects", 
      "TypeScript support",
      "Priority email support",
      "Lifetime updates",
      "Commercial license",
      "Component source code",
      "Design system tokens",
      "White-label license",
      "Custom components on request",
    ],
  },
  INDIVIDUAL_PREMIUM: {
    name: "Individual License - Premium Access",
    price: 149,
    priceId: STRIPE_PRICE_IDS.INDIVIDUAL_PREMIUM,
    features: [
      "30+ Premium components",
      "Advanced animations & effects", 
      "TypeScript support",
      "Email support",
      "Lifetime updates",
      "Commercial license",
      "Component source code",
      "Design system tokens",
    ],
  },
} as const;

export type PlanType = keyof typeof PLANS;

export function getPlanByPriceId(priceId: string): PlanType | null {
  for (const [planKey, plan] of Object.entries(PLANS)) {
    if (plan.priceId === priceId) {
      return planKey as PlanType;
    }
  }
  return null;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}