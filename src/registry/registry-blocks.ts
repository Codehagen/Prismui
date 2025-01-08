import { type Registry } from "./schema";

export const blocks = [
  {
    name: "expandable-card-template",
    type: "registry:block",
    title: "Expandable Card Template",
    description: "A template showcasing the expandable card component",
    files: [
      {
        path: "expandable-card-template/app/page.tsx",
        type: "registry:page",
        target: "app/page.tsx",
      },
      {
        path: "expandable-card-template/app/layout.tsx",
        type: "registry:page",
        target: "app/layout.tsx",
      },
      {
        path: "expandable-card-template/app/globals.css",
        type: "registry:page",
        target: "app/globals.css",
      },
    ],
    meta: {
      author: process.env.NEXT_PUBLIC_V0_TEMPLATES_AUTHOR,
    },
  },
  {
    name: "landing-page-test",
    type: "registry:block",
    title: "Landing Page Test",
    description: "A simple landing page template for testing V0 integration",
    files: [
      {
        path: "landing-page-test/app/page.tsx",
        type: "registry:page",
        target: "app/page.tsx",
      },
      {
        path: "landing-page-test/app/layout.tsx",
        type: "registry:page",
        target: "app/layout.tsx",
      },
      {
        path: "landing-page-test/app/globals.css",
        type: "registry:page",
        target: "app/globals.css",
      },
    ],
    meta: {
      author: process.env.NEXT_PUBLIC_V0_TEMPLATES_AUTHOR,
    },
  },
] satisfies Registry;
