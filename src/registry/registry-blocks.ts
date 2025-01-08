import { type Registry } from "./schema";

    export const blocks = [
{
  "name": "landing-page-test",
  "type": "registry:block",
  "title": "Landing Page Test",
  "description": "A template for landing-page-test",
  "files": [
    {
      "path": "landing-page-test/app/globals.css",
      "type": "registry:page",
      "target": "app/globals.css"
    },
    {
      "path": "landing-page-test/app/layout.tsx",
      "type": "registry:page",
      "target": "app/layout.tsx"
    },
    {
      "path": "landing-page-test/app/page.tsx",
      "type": "registry:page",
      "target": "app/page.tsx"
    }
  ]
}
] satisfies Registry;