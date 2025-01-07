// DO NOT REMOVE - Examples Registry Guide
/**
 * This file registers examples for the PrismUI registry.
 * Each example must follow this structure to be properly displayed in the documentation.
 *
 * Example Registration Schema:
 * {
 *   name: "example-name",            // Name of the example (must be unique)
 *   type: "registry:example",        // Type must be "registry:example"
 *   category: "examples",            // Category for documentation organization
 *   subcategory: "display",         // Subcategory (display|layout|form|navigation|etc)
 *   code: `"use client";            // The example source code that will be displayed
 *
 *     import { cn } from "@/lib/utils";
 *
 *     interface ExampleProps {
 *       // Props definition
 *     }
 *
 *     export default function Example({ ...props }: ExampleProps) {
 *       return (
 *         // Example implementation
 *       );
 *     }`,
 *   files: [{                       // Example file information
 *     path: "examples/example-name.tsx",
 *     type: "registry:example"
 *   }],
 *   cli: {                          // REQUIRED: CLI installation commands
 *     npm: "npx prismui@latest add example-name",
 *     pnpm: "pnpm dlx prismui@latest add example-name",
 *     yarn: "yarn dlx prismui@latest add example-name",
 *     bun: "bunx prismui@latest add example-name"
 *   },
 *   dependencies: ["@/lib/utils"]    // Required example dependencies
 * }
 *
 * IMPORTANT:
 * - Import the source code directly from the demo file to avoid duplication
 * - Include all necessary imports in the demo file
 * - Use proper formatting and comments in the code
 * - List all dependencies that the example requires
 * - Follow the design system color tokens (e.g., text-primary, bg-secondary)
 */

import { type RegistryItem } from "./schema";
import CardDemo, { demoSource as CardDemoSource } from "./example/card-demo";
import WordRevealDemo, {
  demoSource as WordRevealDemoSource,
} from "./example/word-reveal-demo";
import WordRevealHeroExample, {
  demoSource as WordRevealHeroSource,
} from "./example/word-reveal-hero";
import WordRevealCustomExample, {
  demoSource as WordRevealCustomSource,
} from "./example/word-reveal-custom";
import NumberFlowDemo from "./example/number-flow-demo";
import { demoSource as NumberFlowDemoSource } from "./example/number-flow-demo.source";
import NumberFlowBasic, {
  demoSource as NumberFlowBasicSource,
} from "./example/number-flow-basic";
import LogoCarouselBasic, {
  demoSource as LogoCarouselBasicSource,
} from "./example/logo-carousel-basic";
import LogoCarouselDemo, {
  demoSource as LogoCarouselDemoSource,
} from "./example/logo-carousel-demo";
import ExpandableCardBasic, {
  demoSource as ExpandableCardBasicSource,
} from "./example/expandable-card-basic";
import ExpandableCardDemo, {
  demoSource as ExpandableCardDemoSource,
} from "./example/expandable-card-demo";
import FloatingActionPanelBasic, {
  demoSource as FloatingActionPanelBasicSource,
} from "./example/floating-action-panel-basic";
import FloatingActionPanelDemo, {
  demoSource as FloatingActionPanelDemoSource,
} from "./example/floating-action-panel-demo";
import HeroBadgeBasic, {
  demoSource as HeroBadgeBasicSource,
} from "./example/hero-badge-basic";
import HeroBadgeDemo, {
  demoSource as HeroBadgeDemoSource,
} from "./example/hero-badge-demo";
import ActionButtonBasic, {
  demoSource as ActionButtonBasicSource,
} from "./example/action-button-basic";
import ActionButtonDemo, {
  demoSource as ActionButtonDemoSource,
} from "./example/action-button-demo";
import ButtonGroupBasic, {
  demoSource as ButtonGroupBasicSource,
} from "./example/button-group-basic";
import ButtonGroupDemo, {
  demoSource as ButtonGroupDemoSource,
} from "./example/button-group-demo";
import DisplayCardsBasic, {
  demoSource as DisplayCardsBasicSource,
} from "./example/display-cards-basic";
import DisplayCardsDemo, {
  demoSource as DisplayCardsDemoSource,
} from "./example/display-cards-demo";
import HeroBasic, { demoSource as HeroBasicSource } from "./example/hero-basic";
import HeroDemo, { demoSource as HeroDemoSource } from "./example/hero-demo";
import OpenSourceBasic, {
  demoSource as OpenSourceBasicSource,
} from "./example/open-source-basic";
import OpenSourceDemo, {
  demoSource as OpenSourceDemoSource,
} from "./example/open-source-demo";
import PopoverBasic, {
  demoSource as PopoverBasicSource,
} from "./example/popover-basic";
import PopoverDemo, {
  demoSource as PopoverDemoSource,
} from "./example/popover-demo";
import PopoverMenu, {
  demoSource as PopoverMenuSource,
} from "./example/popover-menu";
import PopoverCommand, {
  demoSource as PopoverCommandSource,
} from "./example/popover-command";
import PopoverForm, {
  demoSource as PopoverFormSource,
} from "./example/popover-form";
import PopoverProject, {
  demoSource as PopoverProjectSource,
} from "./example/popover-project";
import PricingBasic, {
  demoSource as PricingBasicSource,
} from "./example/pricing-basic";
import LandingPageTest, {
  demoSource as LandingPageTestSource,
} from "./example/landing-page-test";

export const examples: RegistryItem[] = [
  {
    name: "number-flow-basic",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: NumberFlowBasicSource,
    dependencies: ["@/components/ui/card", "@number-flow/react"],
  },
  {
    name: "word-reveal-demo",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: WordRevealDemoSource,
    dependencies: ["@/components/prismui/word-reveal"],
  },
  {
    name: "card-demo",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: CardDemoSource,
    dependencies: ["@/components/prismui/card", "@/components/prismui/button"],
  },
  {
    name: "word-reveal-hero",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: WordRevealHeroSource,
    dependencies: ["@/components/prismui/word-reveal"],
  },
  {
    name: "word-reveal-custom",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: WordRevealCustomSource,
    dependencies: ["@/components/prismui/word-reveal"],
  },
  {
    name: "number-flow-demo",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: NumberFlowDemoSource,
    dependencies: [
      "@/components/ui/card",
      "@/lib/utils",
      "@number-flow/react",
      "lucide-react",
    ],
  },
  {
    name: "logo-carousel-basic",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: LogoCarouselBasicSource,
    dependencies: [
      "@/components/prismui/logo-carousel",
      "@/components/ui/card",
      "framer-motion",
    ],
  },
  {
    name: "logo-carousel-demo",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: LogoCarouselDemoSource,
    dependencies: [
      "@/components/prismui/logo-carousel",
      "@/components/ui/card",
      "framer-motion",
    ],
  },
  {
    name: "expandable-card-basic",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: ExpandableCardBasicSource,
    dependencies: ["@/components/prismui/expandable-card"],
  },
  {
    name: "expandable-card-demo",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: ExpandableCardDemoSource,
    dependencies: ["@/components/prismui/expandable-card"],
  },
  {
    name: "floating-action-panel-basic",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: FloatingActionPanelBasicSource,
    dependencies: [
      "@/components/prismui/floating-action-panel",
      "lucide-react",
    ],
  },
  {
    name: "floating-action-panel-demo",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: FloatingActionPanelDemoSource,
    dependencies: [
      "@/components/prismui/floating-action-panel",
      "lucide-react",
      "framer-motion",
    ],
  },
  {
    name: "hero-badge-basic",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: HeroBadgeBasicSource,
    dependencies: ["@/components/prismui/hero-badge", "@/components/icons"],
  },
  {
    name: "hero-badge-demo",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: HeroBadgeDemoSource,
    dependencies: ["@/components/prismui/hero-badge", "@/components/icons"],
  },
  {
    name: "action-button-basic",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: ActionButtonBasicSource,
    dependencies: ["@/components/prismui/action-button"],
  },
  {
    name: "action-button-demo",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: ActionButtonDemoSource,
    dependencies: [
      "@/components/prismui/action-button",
      "@/components/ui/card",
    ],
  },
  {
    name: "button-group-basic",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: ButtonGroupBasicSource,
    dependencies: [
      "@/components/prismui/button-group",
      "@/components/ui/button",
      "lucide-react",
    ],
  },
  {
    name: "button-group-demo",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: ButtonGroupDemoSource,
    dependencies: [
      "@/components/prismui/button-group",
      "@/components/ui/button",
      "@/components/ui/card",
      "lucide-react",
    ],
  },
  {
    name: "display-cards-basic",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: DisplayCardsBasicSource,
    dependencies: ["@/components/prismui/display-cards"],
  },
  {
    name: "display-cards-demo",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: DisplayCardsDemoSource,
    dependencies: [
      "@/components/prismui/display-cards",
      "@/components/ui/card",
      "lucide-react",
    ],
  },
  {
    name: "hero-basic",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: HeroBasicSource,
    dependencies: ["@/components/prismui/hero", "@/components/icons"],
  },
  {
    name: "hero-demo",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: HeroDemoSource,
    dependencies: [
      "@/components/prismui/hero",
      "@/components/icons",
      "@/components/ui/card",
      "@/components/sections/component-preview",
    ],
  },
  {
    name: "open-source-basic",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: OpenSourceBasicSource,
    dependencies: ["@/components/prismui/open-source"],
  },
  {
    name: "open-source-demo",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: OpenSourceDemoSource,
    dependencies: ["@/components/prismui/open-source", "@/components/ui/card"],
  },
  {
    name: "popover-basic",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: PopoverBasicSource,
    dependencies: ["@/components/prismui/popover"],
  },
  {
    name: "popover-demo",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: PopoverDemoSource,
    dependencies: [
      "@/components/prismui/popover",
      "@/components/ui/card",
      "@/components/ui/badge",
      "@/components/ui/input",
      "@/components/ui/button",
      "@/components/ui/separator",
      "@/components/ui/progress",
      "@/components/ui/avatar",
      "@/components/ui/tooltip",
      "lucide-react",
    ],
  },
  {
    name: "popover-menu",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: PopoverMenuSource,
    dependencies: ["@/components/prismui/popover", "lucide-react"],
  },
  {
    name: "popover-command",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: PopoverCommandSource,
    dependencies: [
      "@/components/prismui/popover",
      "@/components/ui/input",
      "@/components/ui/badge",
      "@/components/ui/separator",
      "lucide-react",
    ],
  },
  {
    name: "popover-form",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: PopoverFormSource,
    dependencies: ["@/components/prismui/popover"],
  },
  {
    name: "popover-project",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: PopoverProjectSource,
    dependencies: [
      "@/components/prismui/popover",
      "@/components/ui/badge",
      "@/components/ui/button",
      "@/components/ui/progress",
      "@/components/ui/avatar",
      "@/components/ui/tooltip",
      "lucide-react",
    ],
  },
  {
    name: "pricing-basic",
    type: "registry:example",
    category: "examples",
    subcategory: "display",
    code: PricingBasicSource,
    dependencies: [
      "@/components/section",
      "@/components/ui/button",
      "@/components/ui/label",
      "@/components/ui/switch",
      "framer-motion",
      "canvas-confetti",
      "@number-flow/react",
    ],
  },
  {
    name: "landing-page-test",
    type: "registry:block",
    component: LandingPageTest,
    code: LandingPageTestSource,
    title: "Landing Page Test",
    description: "A simple landing page template for testing V0 integration",
    files: [
      {
        path: "app/landing-page-test/page.tsx",
        type: "registry:page",
        target: "app/page.tsx",
        content: LandingPageTestSource,
      },
      {
        path: "app/landing-page-test/layout.tsx",
        type: "registry:page",
        target: "app/layout.tsx",
        content: `import "@/styles/globals.css"
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}`,
      },
    ],
    meta: {
      author: process.env.NEXT_PUBLIC_V0_TEMPLATES_AUTHOR,
    },
  },
  {
    name: "expandable-card-block",
    type: "registry:block",
    title: "Expandable Card Block",
    description:
      "A block template showcasing the expandable card component in a full page layout",
    component: ExpandableCardBasic,
    code: ExpandableCardBasicSource,
    files: [
      {
        path: "app/expandable-card-block/page.tsx",
        type: "registry:page",
        target: "app/page.tsx",
        content: `export default function ExpandableCardBlockPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Project Status</h1>
          <p className="text-muted-foreground">Track your project progress with our expandable card component.</p>
        </div>
        <div className="grid gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="expandable-card group relative overflow-hidden rounded-lg border bg-background p-6 shadow-md transition-all hover:shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-semibold">Project {i + 1}</h3>
                  <p className="text-sm text-muted-foreground">
                    Project description and details go here. Click to expand and see more information.
                  </p>
                </div>
                <button className="rounded-full p-2 hover:bg-accent">
                  <svg
                    className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </div>
              <div className="mt-4 grid gap-4">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width: \`\${(i + 1) * 25}%\`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium">{(i + 1) * 25}%</span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Tasks</span>
                    <span className="text-sm text-muted-foreground">{(i + 1) * 5}/20</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Due Date</span>
                    <span className="text-sm text-muted-foreground">Dec {15 + i}, 2023</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}`,
      },
      {
        path: "app/expandable-card-block/layout.tsx",
        type: "registry:page",
        target: "app/layout.tsx",
        content: `import "@/styles/globals.css"
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}`,
      },
    ],
    meta: {
      author: process.env.NEXT_PUBLIC_V0_TEMPLATES_AUTHOR,
    },
  },
];
