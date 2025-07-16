import { defineConfig } from "@content-collections/core";
import { prettyCodeOptions } from "./src/lib/content-collections/pretty-code-options";
import rehypePrettyCode from "rehype-pretty-code";

export default defineConfig({
  collections: {},
  markdown: {
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
});
