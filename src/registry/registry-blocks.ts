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