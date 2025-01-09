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

import { type RegistryItem } from "./schema";
import Pricing from "./section/pricing";
import HeroSection from "./section/hero";

export const sections: RegistryItem[] = [
  {
    name: "hero",
    type: "registry:block",
    component: HeroSection,
    category: "sections",
    subcategory: "hero",
    code: `"use client";

import Hero from "@/components/prismui/hero";
import { Icons } from "@/components/icons";
import { ComponentPreview } from "@/components/sections/component-preview";

export default function HeroSection() {
  return (
    <Hero
      pill={{
        text: "New! PrismUI Components",
        href: "/docs",
        icon: <Icons.logo className="h-4 w-4" />,
      }}
      content={{
        title: "The better way to",
        titleHighlight: "build apps fast",
        description:
          "A fully customizable component library built on top of shadcn/ui. Beautiful, accessible, and ready for production.",
        primaryAction: {
          href: "/docs",
          text: "Documentation",
          icon: <Icons.book className="h-4 w-4" />,
        },
        secondaryAction: {
          href: "/docs",
          text: "Components",
          icon: <Icons.component className="h-4 w-4" />,
        },
      }}
      preview={<ComponentPreview />}
    />
  );
}`,
    files: [
      {
        path: "registry/section/hero.tsx",
        type: "registry:block",
        content: `"use client";

import Hero from "@/components/prismui/hero";
import { Icons } from "@/components/icons";
import { ComponentPreview } from "@/components/sections/component-preview";

export default function HeroSection() {
  return (
    <Hero
      pill={{
        text: "New! PrismUI Components",
        href: "/docs",
        icon: <Icons.logo className="h-4 w-4" />,
      }}
      content={{
        title: "The better way to",
        titleHighlight: "build apps fast",
        description:
          "A fully customizable component library built on top of shadcn/ui. Beautiful, accessible, and ready for production.",
        primaryAction: {
          href: "/docs",
          text: "Documentation",
          icon: <Icons.book className="h-4 w-4" />,
        },
        secondaryAction: {
          href: "/docs",
          text: "Components",
          icon: <Icons.component className="h-4 w-4" />,
        },
      }}
      preview={<ComponentPreview />}
    />
  );
}`,
      },
    ],
    dependencies: [
      "@/components/prismui/hero",
      "@/components/icons",
      "@/components/sections/component-preview",
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
