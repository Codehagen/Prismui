import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, Shield, LogOut } from "lucide-react";
import { constructMetadata } from "@/lib/utils";
import { getCurrentUser, requireUser } from "@/lib/pro/auth/user-actions";
import { signOut } from "@/actions/auth-actions";
import { PaymentButton } from "@/components/payments/payment-button";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Upgrade to PrismUI Individual License",
  description:
    "Unlock premium React components and exclusive features with PrismUI Individual License.",
});

const plans = [
  {
    name: "Individual License - Annual Access",
    price: "$149",
    originalPrice: "$199",
    description: "Perfect for individual developers",
    features: [
      "30+ Premium components",
      "Advanced animations & effects",
      "TypeScript support",
      "Email support",
      "Annual updates",
      "Commercial license",
      "Component source code",
      "Design system tokens",
    ],
    cta: "Get Annual Access",
    popular: false,
    savings: "Save $50",
    planType: "INDIVIDUAL_ANNUAL" as const,
    billing: "per year",
  },
  {
    name: "Individual License - Lifetime Access",
    price: "$199",
    originalPrice: "$299",
    description: "Complete access with premium features",
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
    cta: "Get Lifetime Access",
    popular: true,
    savings: "Save $100",
    planType: "INDIVIDUAL_LIFETIME" as const,
    billing: "one-time",
  },
];

const whyChooseLifetime = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Pay Once, Own Forever",
    description:
      "No recurring fees. Pay once and get lifetime access to all current and future components.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Instant Access",
    description:
      "Get immediate access to all premium components the moment your payment is processed.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Future-Proof",
    description:
      "All future components and updates are included at no additional cost.",
  },
];

export default async function UpgradePage() {
  const user = await requireUser();
  console.log("🔄 User:", user);

  return (
    <div className="min-h-screen">
      {/* User Info Banner */}
      {user && (
        <div className="bg-primary/10 border-b border-primary/20 px-4 py-3">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-primary">
                👋 Welcome, <span className="font-bold">{user.name}</span>! 
                <span className="ml-2 text-xs opacity-75">({user.email})</span>
                <span className="ml-2 text-xs bg-primary/20 px-2 py-1 rounded">FREE TIER</span>
              </p>
            </div>
            <form action={signOut}>
              <Button variant="outline" size="sm" type="submit" className="gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="mr-1 h-3 w-3" />
              Limited Time Offer
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Get Your <span className="text-primary">Individual License</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Hi {user.name || user.email}! 👋 Ready to unlock the full
              potential of PrismUI? Choose your individual license for lifetime
              access to premium components and exclusive features.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Lifetime */}
      <section className="py-20 sm:py-32 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why choose lifetime membership?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The smartest investment for your development toolkit.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {whyChooseLifetime.map((item) => (
                <Card key={item.title} className="border-2">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      {item.icon}
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Choose your individual license
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              One-time payment. Lifetime access. No recurring fees.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl gap-8 lg:grid-cols-2">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={
                  plan.popular
                    ? "border-2 border-primary shadow-lg"
                    : "border-2"
                }
              >
                {plan.popular && (
                  <div className="text-center">
                    <Badge className="relative -top-3 bg-primary">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className={plan.popular ? "pt-2" : ""}>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700"
                    >
                      {plan.savings}
                    </Badge>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-lg text-muted-foreground line-through">
                      {plan.originalPrice}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {plan.billing}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 shrink-0 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <PaymentButton
                    planType={plan.planType}
                    variant={plan.popular ? "default" : "outline"}
                    className="w-full"
                  >
                    {plan.cta}
                  </PaymentButton>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 sm:py-32 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-2xl space-y-8">
            <div>
              <h3 className="text-lg font-semibold">
                What does lifetime mean?
              </h3>
              <p className="mt-2 text-muted-foreground">
                Lifetime means you pay once and get access forever. No recurring
                fees, no expiration dates.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                Do I get future updates?
              </h3>
              <p className="mt-2 text-muted-foreground">
                Yes! All future components, updates, and improvements are
                included at no additional cost.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                Can I use this for commercial projects?
              </h3>
              <p className="mt-2 text-muted-foreground">
                Absolutely! Both plans include a commercial license for
                unlimited projects.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
