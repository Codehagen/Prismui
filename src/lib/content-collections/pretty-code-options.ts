import { type Options } from "rehype-pretty-code";
import { createHighlighter } from "shiki";

// Create highlighter once and reuse for performance
const highlighterPromise = createHighlighter({
  themes: ["github-dark"],
  langs: ["typescript", "javascript", "jsx", "tsx", "css", "json", "bash", "markdown"],
});

export const prettyCodeOptions: Options = {
  theme: "github-dark",
  getHighlighter: async (options) => await highlighterPromise,
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    if (!node.properties.className) {
      node.properties.className = [];
    }
    node.properties.className.push("line--highlighted");
  },
  onVisitHighlightedChars(node) {
    if (!node.properties.className) {
      node.properties.className = [];
    }
    node.properties.className = ["word--highlighted"];
  },
};