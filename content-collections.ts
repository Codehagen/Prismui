import { defineCollection, defineConfig } from "@content-collections/core";
import { createMDXTransform } from "./src/lib/content-collections/transform-factory";

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
  transform: createMDXTransform({ collectionType: "blog" }),
});

const ChangelogPost = defineCollection({
  name: "ChangelogPost",
  directory: "src/content/changelog",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    summary: z.string(),
    image: z.string(),
    author: z.string(),
    slug: z.string().optional(),
  }),
  transform: createMDXTransform({ collectionType: "changelog", computeRelated: false }),
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
  transform: createMDXTransform({ collectionType: "docs" }),
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
  transform: createMDXTransform({ collectionType: "legal", computeRelated: false }),
});

export const ProDocsPost = defineCollection({
  name: "ProDocsPost",
  directory: "src/content-pro/docs",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    summary: z.string(),
    author: z.string(),
    categories: z.array(z.string()).default(["pro"]),
    related: z.array(z.string()).optional(),
    slug: z.string().optional(),
  }),
  transform: createMDXTransform({ collectionType: "docs" }),
});

export default defineConfig({
  collections: [BlogPost, ChangelogPost, DocsPost, LegalPost, ProDocsPost],
});
