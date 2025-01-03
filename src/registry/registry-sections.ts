// DO NOT REMOVE - Sections Registry Guide
/**
 * This file registers sections for the PrismUI registry.
 * To add a new section:
 * 1. Create the section component in src/components/sections/[section-name].tsx
 * 2. Add a new entry to the sections array below with the component code
 * 3. Run `pnpm build:registry` to update the registry
 *
 * Section Registration Schema:
 * {
 *   name: "section-name",
 *   type: "registry:block",
 *   category: "sections",
 *   subcategory: "hero|features|cta|etc",
 *   code: `...section code...`,
 *   files: [{
 *     path: "section/[section-name].tsx",
 *     type: "registry:block",
 *     content: `...section code...`
 *   }],
 *   dependencies: ["@/components/ui/button", ...other-deps],
 * }
 */

import { HeroTest } from "@/registry/section/hero-test";
import { type RegistryItem } from "./schema";
import Pricing from "./section/pricing";

export const sections: RegistryItem[] = [
  {
    name: "hero-test",
    type: "registry:block",
    component: HeroTest,
    category: "sections",
    subcategory: "hero",
    code: `"use client";

import { Button } from "@/components/ui/button";
import { WordReveal } from "@/components/prismui/word-reveal";

export function HeroTest() {
  return (
    <section className="container flex flex-col items-center justify-center gap-4 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-center gap-2">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          <WordReveal>
            Building blocks for your Next.js project
          </WordReveal>
        </h1>
        <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
          Beautifully designed components that you can copy and paste into your
          apps. Accessible. Customizable. Open Source.
        </p>
      </div>
      <div className="flex gap-4">
        <Button size="lg">Get Started</Button>
        <Button size="lg" variant="outline">
          Components
        </Button>
      </div>
    </section>
  );
}`,
    files: [
      {
        path: "registry/section/hero-test.tsx",
        type: "registry:block",
        content: `"use client";

import { Button } from "@/components/ui/button";
import { WordReveal } from "@/components/prismui/word-reveal";

export function HeroTest() {
  return (
    <section className="container flex flex-col items-center justify-center gap-4 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-center gap-2">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          <WordReveal>
            Building blocks for your Next.js project
          </WordReveal>
        </h1>
        <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
          Beautifully designed components that you can copy and paste into your
          apps. Accessible. Customizable. Open Source.
        </p>
      </div>
      <div className="flex gap-4">
        <Button size="lg">Get Started</Button>
        <Button size="lg" variant="outline">
          Components
        </Button>
      </div>
    </section>
  );
}`,
      },
    ],
    dependencies: [
      "@/components/ui/button",
      "@/components/prismui/word-reveal",
    ],
  },
  {
    name: "pricing",
    type: "registry:block",
    component: Pricing,
    category: "sections",
    subcategory: "marketing",
    files: [
      {
        path: "section/pricing.tsx",
        type: "registry:block",
        content: `"use client";

import { Button } from "@/components/ui/button";
import { WordReveal } from "@/components/prismui/word-reveal";

export function Pricing() {
  return <div>Pricing</div>;
}`,
      },
    ],
    dependencies: ["@/components/ui/button"],
  },
];