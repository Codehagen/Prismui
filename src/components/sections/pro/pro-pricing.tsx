import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "Perfect for developers and small teams",
    features: [
      "All premium components",
      "Private npm access",
      "TypeScript support",
      "Priority email support",
      "Monthly updates",
      "Commercial license",
    ],
    cta: "Start Pro Trial",
    href: "/pro/auth/signup",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large teams and organizations",
    features: [
      "Everything in Pro",
      "Custom components",
      "Dedicated support",
      "SLA guarantee",
      "Team training",
      "White-label option",
    ],
    cta: "Contact Sales",
    href: "mailto:enterprise@prismui.tech",
    popular: false,
  },
];

export function ProPricing() {
  return (
    <section className="py-20 sm:py-32 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that works best for you and your team.
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
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
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
                <Button
                  asChild
                  className="w-full"
                  size="lg"
                  variant={plan.popular ? "default" : "outline"}
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}