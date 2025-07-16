import { prettyCodeOptions } from "./content-collections/pretty-code-options";
import rehypePrettyCode from "rehype-pretty-code";

export const mdxOptions = {
  rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
};
