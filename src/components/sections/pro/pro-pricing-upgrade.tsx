"use client";

import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { PaymentButton } from "@/components/payments/payment-button";

const plans = [
  {
    name: "Individual Annual",
    price: "$149",
    period: "/year",
    description: "Perfect for individual developers",
    features: [
      "50+ Premium React components",
      "TypeScript & Framer Motion",
      "Commercial use license",
      "Annual updates",
      "Email support",
      "Perpetual license",
    ],
    cta: "Get Annual Access",
    planType: "INDIVIDUAL_ANNUAL" as const,
    popular: false,
  },
  {
    name: "Individual Lifetime",
    price: "$199",
    period: "one-time",
    description: "Best value for serious developers",
    features: [
      "50+ Premium React components",
      "TypeScript & Framer Motion",
      "Commercial use license",
      "Lifetime access & updates",
      "5+ Premium templates",
      "Priority email support",
    ],
    cta: "Get Lifetime Access",
    planType: "INDIVIDUAL_LIFETIME" as const,
    popular: true,
  },
];

export function ProPricingUpgrade() {
  return (
    <section className="relative isolate py-24 sm:py-32">
      {/* Background decoration */}
      <div 
        aria-hidden="true" 
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
      >
        <div 
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary/30 to-primary/10 opacity-30"
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-base font-semibold text-primary">Pricing</span>
          </div>
          <h2 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
            Ship in Hours, <span className="text-muted-foreground">Not Weeks</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
            Skip 200+ hours of development with premium React components. Get TypeScript, 
            Framer Motion animations, and production-ready templates that ship instantly.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
          {/* Pro Plan */}
          <div className={cn(
            "rounded-3xl p-8 ring-1 backdrop-blur-xl",
            "bg-white/20 ring-white/20 border-2 border-primary/20",
            "sm:mx-8 sm:rounded-b-none sm:p-10 lg:mx-0 lg:rounded-bl-3xl lg:rounded-tr-none",
            "hover:bg-white/30 transition-all duration-300"
          )}>
            <h3 id="tier-pro" className="text-base font-semibold text-primary">
              {plans[0].name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-5xl font-semibold tracking-tight">{plans[0].price}</span>
              <span className="text-base text-muted-foreground">{plans[0].period}</span>
            </p>
            <p className="mt-6 text-base text-muted-foreground">{plans[0].description}</p>
            <ul role="list" className="mt-8 space-y-3 text-sm sm:mt-10">
              {plans[0].features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-primary" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <PaymentButton
              planType={plans[0].planType}
              variant="outline"
              className="mt-8 w-full sm:mt-10"
            >
              {plans[0].cta}
            </PaymentButton>
          </div>

          {/* Lifetime Plan - Highlighted */}
          <div className={cn(
            "relative rounded-3xl p-8 shadow-2xl backdrop-blur-xl",
            "bg-gradient-to-br from-gray-900/80 to-gray-800/80 text-white",
            "border border-white/10 ring-2 ring-primary/30",
            "sm:p-10 transform scale-105 transition-all duration-300",
            "lg:-mt-4 shadow-primary/20" // Lift the card slightly on desktop
          )}>
            {/* Recommended Badge */}
            <Badge className="absolute -top-3 left-4 bg-green-500 text-white border-0">
              Recommended
            </Badge>
            
            <h3 id="tier-lifetime" className="text-base font-semibold text-white">
              {plans[1].name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-5xl font-semibold tracking-tight text-white">
                {plans[1].price}
              </span>
              <span className="text-base text-gray-300">{plans[1].period}</span>
            </p>
            <p className="mt-6 text-base text-gray-200">{plans[1].description}</p>
            <ul role="list" className="mt-8 space-y-3 text-sm text-gray-100 sm:mt-10">
              {plans[1].features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-green-400" />
                  <span className="text-gray-100">{feature}</span>
                </li>
              ))}
            </ul>
            <PaymentButton
              planType={plans[1].planType}
              className="mt-8 w-full bg-white text-gray-900 hover:bg-gray-100 font-semibold sm:mt-10"
            >
              {plans[1].cta}
            </PaymentButton>
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="mx-auto mt-20 max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-foreground">2,340+</div>
              <div className="text-sm text-muted-foreground mt-1">Active Developers</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-foreground">50K+</div>
              <div className="text-sm text-muted-foreground mt-1">Components Downloaded</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-foreground">12K+</div>
              <div className="text-sm text-muted-foreground mt-1">GitHub Stars</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-foreground">98%</div>
              <div className="text-sm text-muted-foreground mt-1">Developer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}