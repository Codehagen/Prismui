// DO NOT REMOVE - Examples Registry Guide
/**
 * This file registers examples for the PrismUI registry.
 * Each example must follow this structure to be properly displayed in the documentation.
 *
 * Example Registration Schema:
 * {
 *   name: "component-demo",          // Name of the example (must be unique)
 *   type: "examples",                // Type must be "examples"
 *   component: ComponentDemo,        // The actual React component
 *   code: ComponentDemoSource,       // Import the source code directly from the file
 *   dependencies: ["@/components/prismui/component"] // Required component imports
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
    type: "registry:component",
    component: NumberFlowBasic,
    code: NumberFlowBasicSource,
    dependencies: ["@/components/ui/card", "@number-flow/react"],
  },
  {
    name: "word-reveal-demo",
    type: "registry:example",
    component: WordRevealDemo,
    code: WordRevealDemoSource,
    dependencies: ["@/components/prismui/word-reveal"],
  },
  {
    name: "card-demo",
    type: "registry:example",
    component: CardDemo,
    code: CardDemoSource,
    dependencies: ["@/components/prismui/card", "@/components/prismui/button"],
  },
  {
    name: "word-reveal-hero",
    type: "registry:example",
    component: WordRevealHeroExample,
    code: WordRevealHeroSource,
    dependencies: ["@/components/prismui/word-reveal"],
  },
  {
    name: "word-reveal-custom",
    type: "registry:example",
    component: WordRevealCustomExample,
    code: WordRevealCustomSource,
    dependencies: ["@/components/prismui/word-reveal"],
  },
  {
    name: "number-flow-demo",
    type: "registry:example",
    component: NumberFlowDemo,
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
    component: LogoCarouselBasic,
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
    component: LogoCarouselDemo,
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
    component: ExpandableCardBasic,
    code: ExpandableCardBasicSource,
    dependencies: ["@/components/prismui/expandable-card"],
  },
  {
    name: "expandable-card-demo",
    type: "registry:example",
    component: ExpandableCardDemo,
    code: ExpandableCardDemoSource,
    dependencies: ["@/components/prismui/expandable-card"],
  },
  {
    name: "floating-action-panel-basic",
    type: "registry:example",
    component: FloatingActionPanelBasic,
    code: FloatingActionPanelBasicSource,
    dependencies: [
      "@/components/prismui/floating-action-panel",
      "lucide-react",
    ],
  },
  {
    name: "floating-action-panel-demo",
    type: "registry:example",
    component: FloatingActionPanelDemo,
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
    component: HeroBadgeBasic,
    code: HeroBadgeBasicSource,
    dependencies: ["@/components/prismui/hero-badge", "@/components/icons"],
  },
  {
    name: "hero-badge-demo",
    type: "registry:example",
    component: HeroBadgeDemo,
    code: HeroBadgeDemoSource,
    dependencies: ["@/components/prismui/hero-badge", "@/components/icons"],
  },
  {
    name: "action-button-basic",
    type: "registry:example",
    component: ActionButtonBasic,
    code: ActionButtonBasicSource,
    dependencies: ["@/components/prismui/action-button"],
  },
  {
    name: "action-button-demo",
    type: "registry:example",
    component: ActionButtonDemo,
    code: ActionButtonDemoSource,
    dependencies: [
      "@/components/prismui/action-button",
      "@/components/ui/card",
    ],
  },
  {
    name: "button-group-basic",
    type: "registry:example",
    component: ButtonGroupBasic,
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
    component: ButtonGroupDemo,
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
    component: DisplayCardsBasic,
    code: DisplayCardsBasicSource,
    dependencies: ["@/components/prismui/display-cards"],
  },
  {
    name: "display-cards-demo",
    type: "registry:example",
    component: DisplayCardsDemo,
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
    component: HeroBasic,
    code: HeroBasicSource,
    dependencies: ["@/components/prismui/hero", "@/components/icons"],
  },
  {
    name: "hero-demo",
    type: "registry:example",
    component: HeroDemo,
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
    component: OpenSourceBasic,
    code: OpenSourceBasicSource,
    dependencies: ["@/components/prismui/open-source"],
  },
  {
    name: "open-source-demo",
    type: "registry:example",
    component: OpenSourceDemo,
    code: OpenSourceDemoSource,
    dependencies: ["@/components/prismui/open-source", "@/components/ui/card"],
  },
  {
    name: "popover-basic",
    type: "registry:example",
    component: PopoverBasic,
    code: PopoverBasicSource,
    dependencies: ["@/components/prismui/popover"],
  },
  {
    name: "popover-demo",
    type: "registry:example",
    component: PopoverDemo,
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
    component: PopoverMenu,
    code: PopoverMenuSource,
    dependencies: ["@/components/prismui/popover", "lucide-react"],
  },
  {
    name: "popover-command",
    type: "registry:example",
    component: PopoverCommand,
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
    component: PopoverForm,
    code: PopoverFormSource,
    dependencies: ["@/components/prismui/popover"],
  },
  {
    name: "popover-project",
    type: "registry:example",
    component: PopoverProject,
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
    component: PricingBasic,
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
        path: "app/page.tsx",
        type: "registry:page",
        target: "app/page.tsx",
        content: LandingPageTestSource,
      },
      {
        path: "app/layout.tsx",
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
