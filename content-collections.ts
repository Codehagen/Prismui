import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { createHighlighter } from "shiki";
import GithubSlugger from "github-slugger";

const prettyCodeOptions: Options = {
  theme: "github-dark",
  getHighlighter: (options) =>
    createHighlighter({
      ...options,
    }),
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

const computedFields = (type: "blog" | "changelog" | "docs" | "legal") => ({
  slug: (document) => {
    const slugger = new GithubSlugger();
    return document.slug || slugger.slug(document.title);
  },
  tableOfContents: (document) => {
    const content =
      document.content || document.body?.raw || document.mdx?.code || "";
    const headings = content.match(/^##\s(.+)$/gm);
    const slugger = new GithubSlugger();
    return (
      headings?.map((heading) => {
        const title = heading.replace(/^##\s/, "");
        return {
          title,
          slug: slugger.slug(title),
        };
      }) || []
    );
  },
  images: (document) => {
    if (!document.body?.raw) return [];
    return (
      document.body.raw.match(/(?<=<Image[^>]*\bsrc=")[^"]+(?="[^>]*\/>)/g) ||
      []
    );
  },
  tweetIds: (document) => {
    if (!document.body?.raw) return [];
    const tweetMatches = document.body.raw.match(/<Tweet\sid="[0-9]+"\s\/>/g);
    return tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)[0]) || [];
  },
  githubRepos: (document) => {
    if (!document.body?.raw) return [];
    return (
      document.body.raw.match(
        /(?<=<GithubRepo[^>]*\burl=")[^"]+(?="[^>]*\/>)/g
      ) || []
    );
  },
});

const BlogPost = defineCollection({
  name: "BlogPost",
  directory: "src/content/blog",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    categories: z
      .array(z.enum(["overview", "engineering"]))
      .default(["overview"]),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    featured: z.boolean().default(false),
    image: z.string(),
    images: z.array(z.string()).optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    author: z.string(),
    summary: z.string(),
    related: z.array(z.string()).optional(),
    githubRepos: z.array(z.string()).optional(),
    tweetIds: z.array(z.string()).optional(),
    slug: z.string().optional(),
  }),
  transform: async (document, context) => {
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
      console.log("MDX compilation successful for:", document.title);
      const computed = computedFields("blog");
      return {
        ...document,
        slug: computed.slug(document),
        mdx,
        related: document.related || [],
        tableOfContents: computed.tableOfContents({
          ...document,
          body: { raw: mdx.raw },
        }),
        images: computed.images({ ...document, body: { raw: mdx.raw } }),
        tweetIds: computed.tweetIds({ ...document, body: { raw: mdx.raw } }),
        githubRepos: computed.githubRepos({
          ...document,
          body: { raw: mdx.raw },
        }),
      };
    } catch (error) {
      console.error("Error compiling MDX for:", document.title, error);
      console.error("Error details:", error.stack);
      throw error;
    }
  },
});

const ChangelogPost = defineCollection({
  name: "ChangelogPost",
  directory: "src/content/changelog",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    summary: z.string(),
    author: z.string().optional(),
    image: z.string().optional(),
    categories: z.array(
      z.enum(["new", "improvement", "fix"])
    ).default(["new"]),
    slug: z.string().optional(),
  }),
  transform: async (document, context) => {
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
      console.log("MDX compilation successful for:", document.title);
      const computed = computedFields("changelog");
      return {
        ...document,
        slug: computed.slug(document),
        mdx,
        tableOfContents: computed.tableOfContents({
          ...document,
          body: { raw: mdx.raw },
        }),
        images: computed.images({ ...document, body: { raw: mdx.raw } }),
        tweetIds: computed.tweetIds({ ...document, body: { raw: mdx.raw } }),
        githubRepos: computed.githubRepos({
          ...document,
          body: { raw: mdx.raw },
        }),
      };
    } catch (error) {
      console.error("Error compiling MDX for:", document.title, error);
      console.error("Error details:", error.stack);
      throw error;
    }
  },
});

export const DocsPost = defineCollection({
  name: "DocsPost",
  directory: "src/content/docs",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    summary: z.string(),
    author: z.string(),
    categories: z.array(z.string()).default(["docs"]),
    related: z.array(z.string()).optional(),
    slug: z.string().optional(),
  }),
  transform: async (document, context) => {
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
      console.log("MDX compilation successful for:", document.title);
      const computed = computedFields("docs");
      return {
        ...document,
        slug: computed.slug(document),
        mdx,
        tableOfContents: computed.tableOfContents({
          ...document,
          body: { raw: mdx.raw },
        }),
        images: computed.images({ ...document, body: { raw: mdx.raw } }),
        tweetIds: computed.tweetIds({ ...document, body: { raw: mdx.raw } }),
        githubRepos: computed.githubRepos({
          ...document,
          body: { raw: mdx.raw },
        }),
      };
    } catch (error) {
      console.error("Error compiling MDX for:", document.title, error);
      console.error("Error details:", error.stack);
      throw error;
    }
  },
});

export const LegalPost = defineCollection({
  name: "LegalPost",
  directory: "src/content/legal",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
    updatedAt: z.string(),
    slug: z.string().optional(),
  }),
  transform: async (document, context) => {
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
      console.log("MDX compilation successful for:", document.title);
      const computed = computedFields("legal");
      return {
        ...document,
        slug: computed.slug(document),
        mdx,
        tableOfContents: computed.tableOfContents({
          ...document,
          body: { raw: mdx.raw },
        }),
        images: computed.images({ ...document, body: { raw: mdx.raw } }),
        tweetIds: computed.tweetIds({ ...document, body: { raw: mdx.raw } }),
        githubRepos: computed.githubRepos({
          ...document,
          body: { raw: mdx.raw },
        }),
      };
    } catch (error) {
      console.error("Error compiling MDX for:", document.title, error);
      console.error("Error details:", error.stack);
      throw error;
    }
  },
});

export default defineConfig({
  collections: [BlogPost, ChangelogPost, DocsPost, LegalPost],
});
