import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sparkles,
  Lock,
  Zap,
  Shield,
  HeartHandshake,
} from "lucide-react";

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

export function ProFeatures() {
  return (
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
  );
}