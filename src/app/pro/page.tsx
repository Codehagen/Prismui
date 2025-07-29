import { constructMetadata } from "@/lib/utils";
import { ProHero } from "@/components/sections/pro/pro-hero";
import { ProShowcase } from "@/components/sections/pro/pro-showcase";
import { ProTemplateShowcase } from "@/components/sections/pro/pro-template-showcase";
import { ProTestimonials } from "@/components/sections/pro/pro-testimonials";
import { ProPricing } from "@/components/sections/pro/pro-pricing";
import { ProFAQ } from "@/components/sections/pro/pro-faq";
import { ProCTA } from "@/components/sections/pro/pro-cta";

export const metadata = constructMetadata({
  title: "PrismUI Pro - Premium React Components",
  description:
    "Get access to premium React components, exclusive content, and priority support with PrismUI Pro. Unlock advanced templates, premium animations, and pro-only features for building exceptional React applications.",
  canonical: "https://www.prismui.tech/pro",
});

export default function ProLandingPage() {
  return (
    <>
      <ProHero />
      <ProShowcase />
      <ProTemplateShowcase />
      <ProTestimonials />
      <ProPricing />
      <ProFAQ />
      <ProCTA />
    </>
  );
}
