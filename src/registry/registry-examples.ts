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

export const examples: RegistryItem[] = [
  {
    name: "number-flow-basic",
    type: "examples",
    component: NumberFlowBasic,
    code: NumberFlowBasicSource,
    dependencies: ["@/components/ui/card", "@number-flow/react"],
  },
  {
    name: "word-reveal-demo",
    type: "examples",
    component: WordRevealDemo,
    code: WordRevealDemoSource,
    dependencies: ["@/components/prismui/word-reveal"],
  },
  {
    name: "card-demo",
    type: "examples",
    component: CardDemo,
    code: CardDemoSource,
    dependencies: ["@/components/prismui/card", "@/components/prismui/button"],
  },
  {
    name: "word-reveal-hero",
    type: "examples",
    component: WordRevealHeroExample,
    code: WordRevealHeroSource,
    dependencies: ["@/components/prismui/word-reveal"],
  },
  {
    name: "word-reveal-custom",
    type: "examples",
    component: WordRevealCustomExample,
    code: WordRevealCustomSource,
    dependencies: ["@/components/prismui/word-reveal"],
  },
  {
    name: "number-flow-demo",
    type: "examples",
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
    type: "examples",
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
    type: "examples",
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
    type: "examples",
    component: ExpandableCardBasic,
    code: ExpandableCardBasicSource,
    dependencies: ["@/components/prismui/expandable-card"],
  },
  {
    name: "expandable-card-demo",
    type: "examples",
    component: ExpandableCardDemo,
    code: ExpandableCardDemoSource,
    dependencies: ["@/components/prismui/expandable-card"],
  },
  {
    name: "floating-action-panel-basic",
    type: "examples",
    component: FloatingActionPanelBasic,
    code: FloatingActionPanelBasicSource,
    dependencies: [
      "@/components/prismui/floating-action-panel",
      "lucide-react",
    ],
  },
  {
    name: "floating-action-panel-demo",
    type: "examples",
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
    type: "examples",
    component: HeroBadgeBasic,
    code: HeroBadgeBasicSource,
    dependencies: ["@/components/prismui/hero-badge", "@/components/icons"],
  },
  {
    name: "hero-badge-demo",
    type: "examples",
    component: HeroBadgeDemo,
    code: HeroBadgeDemoSource,
    dependencies: ["@/components/prismui/hero-badge", "@/components/icons"],
  },
];
