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
import {
  Check,
  Sparkles,
  Lock,
  Zap,
  Shield,
  HeartHandshake,
} from "lucide-react";
import { constructMetadata } from "@/lib/utils";
import { getCurrentUser, isAuthenticated } from "@/lib/pro/auth/user-actions";

export const metadata = constructMetadata({
  title: "PrismUI Pro - Premium React Components",
  description:
    "Get access to premium React components, exclusive content, and priority support with PrismUI Pro.",
});

const features = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Premium Components",
    description:
      "Access to 50+ exclusive pro components not available in the free tier",
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Private npm Registry",
    description: "Install components directly from our private npm registry",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Advanced Features",
    description:
      "Complex animations, data visualizations, and enterprise patterns",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "TypeScript First",
    description: "Fully typed components with comprehensive TypeScript support",
  },
  {
    icon: <HeartHandshake className="h-5 w-5" />,
    title: "Priority Support",
    description:
      "Get help directly from the PrismUI team with priority response",
  },
];

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

export default async function ProLandingPage() {
  const isAuth = await isAuthenticated();
  const user = await getCurrentUser();
  console.log("🔄 User:", user);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="mr-1 h-3 w-3" />
              Premium Components
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Build faster with{" "}
              <span className="text-primary">PrismUI Pro</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Get access to premium React components, exclusive templates, and
              priority support. Ship professional applications faster than ever.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-4">
              {isAuth ? (
                <>
                  <Button asChild size="lg">
                    <Link href="/pro/upgrade">Upgrade to Pro</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/pro/docs">Browse Docs</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg">
                    <Link href="/pro/auth/signup">Start Free Trial</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/pro/auth/login">Sign In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to build amazing UIs
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              PrismUI Pro includes everything from the open source version, plus
              exclusive premium features.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="border-2">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
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

      {/* CTA Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to upgrade your development workflow?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of developers building better UIs with PrismUI Pro.
            </p>
            <div className="mt-10">
              <Button asChild size="lg">
                <Link href="/pro/auth/signup">Start your free trial</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
