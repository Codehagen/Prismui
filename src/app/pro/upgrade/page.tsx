import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { constructMetadata } from "@/lib/utils";
import { requireUser } from "@/lib/pro/auth/user-actions";
import { ProPricingUpgrade } from "@/components/sections/pro/pro-pricing-upgrade";

export const metadata = constructMetadata({
  title: "Upgrade to PrismUI Pro",
  description:
    "Unlock premium React components and exclusive features with PrismUI Pro.",
  canonical: "https://www.prismui.tech/pro/upgrade",
});

export default async function UpgradePage() {
  const user = await requireUser();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="mr-1 h-3 w-3" />
              Limited Time Offer
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Welcome back, {user.name || user.email}! 👋
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Ready to unlock the full potential of PrismUI? Choose your plan below and get instant access to premium components and exclusive features.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Component */}
      <ProPricingUpgrade />

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
