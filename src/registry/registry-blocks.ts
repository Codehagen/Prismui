import { type Registry } from "./schema";

    export const blocks = [
{
  "name": "expandable-card-template",
  "type": "registry:block",
  "title": "Expandable Card Template",
  "description": "A template for expandable-card-template",
  "files": [
    {
      "path": "expandable-card-template/app/page.tsx",
      "type": "registry:page",
      "target": "app/page.tsx"
    },
    {
      "path": "expandable-card-template/app/layout.tsx",
      "type": "registry:page",
      "target": "app/layout.tsx"
    },
    {
      "path": "expandable-card-template/app/globals.css",
      "type": "registry:page",
      "target": "app/globals.css"
    },
    {
      "path": "expandable-card-template/app/component/expandable-card.tsx",
      "type": "registry:page",
      "target": "app/component/expandable-card.tsx"
    },
    {
      "path": "expandable-card-template/app/hooks/use-expandable.ts",
      "type": "registry:page",
      "target": "app/hooks/use-expandable.ts"
    }
  ]
},
{
  "name": "floating-action-panel-template",
  "type": "registry:block",
  "title": "Floating Action Panel Template",
  "description": "A template for floating-action-panel-template",
  "files": [
    {
      "path": "floating-action-panel-template/app/page.tsx",
      "type": "registry:page",
      "target": "app/page.tsx"
    },
    {
      "path": "floating-action-panel-template/app/layout.tsx",
      "type": "registry:page",
      "target": "app/layout.tsx"
    },
    {
      "path": "floating-action-panel-template/app/globals.css",
      "type": "registry:page",
      "target": "app/globals.css"
    },
    {
      "path": "floating-action-panel-template/app/component/floating-action-panel.tsx",
      "type": "registry:page",
      "target": "app/component/floating-action-panel.tsx"
    }
  ]
},
{
  "name": "landing-page-test",
  "type": "registry:block",
  "title": "Landing Page Test",
  "description": "A template for landing-page-test",
  "files": [
    {
      "path": "landing-page-test/app/page.tsx",
      "type": "registry:page",
      "target": "app/page.tsx"
    },
    {
      "path": "landing-page-test/app/layout.tsx",
      "type": "registry:page",
      "target": "app/layout.tsx"
    },
    {
      "path": "landing-page-test/app/globals.css",
      "type": "registry:page",
      "target": "app/globals.css"
    }
  ]
}
] satisfies Registry;