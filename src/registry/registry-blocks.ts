import { type RegistryItem } from "./schema";
import ExpandableCardBasic, {
  demoSource as ExpandableCardBasicSource,
} from "./example/expandable-card-basic";
import LandingPageTest, {
  demoSource as LandingPageTestSource,
} from "./example/landing-page-test";
import { readFileSync } from "fs";
import { join } from "path";

// Helper function to read template files
function readTemplate(path: string): string {
  return readFileSync(
    join(process.cwd(), "src/registry/blocks", path),
    "utf-8"
  );
}

// Get templates
const sharedLayout = readTemplate("layout.tsx");
const expandableCardPage = readTemplate("expandable-card/page.tsx");
const landingPage = readTemplate("landing-page/page.tsx");

// Get component content
const expandableCard = readFileSync(
  join(process.cwd(), "src/components/prismui/expandable-card.tsx"),
  "utf-8"
);

export const blocks: RegistryItem[] = [
  // Landing Page Block
  {
    name: "landing-page-test",
    type: "registry:block",
    title: "Landing Page",
    description: "A simple landing page template for testing V0 integration",
    component: LandingPageTest,
    code: LandingPageTestSource,
    files: [
      {
        path: "landing-page-test/page.tsx",
        type: "registry:page",
        target: "app/page.tsx",
        content: landingPage,
      },
      {
        path: "landing-page-test/layout.tsx",
        type: "registry:page",
        target: "app/layout.tsx",
        content: sharedLayout,
      },
    ],
    meta: {
      author: process.env.NEXT_PUBLIC_V0_TEMPLATES_AUTHOR,
    },
  },

  // Expandable Card Block
  {
    name: "expandable-card-block",
    type: "registry:block",
    title: "Project Status Dashboard",
    description:
      "A project status dashboard using expandable cards to display project information",
    component: ExpandableCardBasic,
    code: ExpandableCardBasicSource,
    files: [
      {
        path: "expandable-card-block/page.tsx",
        type: "registry:page",
        target: "app/page.tsx",
        content: expandableCardPage,
      },
      {
        path: "expandable-card-block/layout.tsx",
        type: "registry:page",
        target: "app/layout.tsx",
        content: sharedLayout,
      },
      {
        path: "expandable-card-block/components/project-status-card.tsx",
        type: "registry:component",
        target: "components/project-status-card.tsx",
        content: expandableCard,
      },
    ],
    meta: {
      author: process.env.NEXT_PUBLIC_V0_TEMPLATES_AUTHOR,
    },
  },
];
