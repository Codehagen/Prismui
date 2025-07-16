import { compileMDX } from "@content-collections/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { prettyCodeOptions } from "./pretty-code-options";
import { createComputedFields } from "./computed-fields";

export interface TransformOptions {
  collectionType: "blog" | "changelog" | "docs" | "legal";
  computeRelated?: boolean;
}

export const createMDXTransform = ({ collectionType, computeRelated = true }: TransformOptions) => {
  return async (document: any, context: any) => {
    try {
      const mdx = await compileMDX(context, document, {
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, prettyCodeOptions],
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ["subheading-anchor"],
                ariaLabel: "Link to section",
              },
            },
          ],
        ],
        remarkPlugins: [remarkGfm],
      });

      console.log(`MDX compilation successful for ${collectionType}:`, document.title);
      
      const computed = createComputedFields(collectionType);
      
      // Create document with MDX for computed fields
      const docWithMDX = { ...document, mdx };
      
      const transformedDoc = {
        ...document,
        slug: computed.slug(document),
        mdx,
        tableOfContents: computed.tableOfContents(docWithMDX),
        images: computed.images(docWithMDX),
        tweetIds: computed.tweetIds(docWithMDX),
        githubRepos: computed.githubRepos(docWithMDX),
        readingTime: computed.readingTime(docWithMDX),
        excerpt: computed.excerpt(docWithMDX),
      };

      // Add related field for collections that support it
      if (computeRelated && "related" in document) {
        transformedDoc.related = document.related || [];
      }

      return transformedDoc;
    } catch (error) {
      console.error(`Error compiling MDX for ${collectionType}:`, document.title, error);
      if (error instanceof Error) {
        console.error("Error details:", error.stack);
      }
      throw error;
    }
  };
};