import GithubSlugger from "github-slugger";
import readingTime from "reading-time";

export interface TableOfContentsItem {
  level: number;
  title: string;
  slug: string;
}

export interface ComputedFields {
  slug: (document: any) => string;
  tableOfContents: (document: any) => TableOfContentsItem[];
  images: (document: any) => string[];
  tweetIds: (document: any) => string[];
  githubRepos: (document: any) => string[];
  readingTime: (document: any) => number;
  excerpt: (document: any) => string;
}

export const createComputedFields = (type: "blog" | "changelog" | "docs" | "legal"): ComputedFields => ({
  slug: (document) => {
    if (document.slug) return document.slug;
    const slugger = new GithubSlugger();
    return slugger.slug(document.title);
  },

  tableOfContents: (document) => {
    const content = document.mdx?.raw || document.body?.raw || document.content || "";
    const headingRegex = /^(#{2,6})\s(.+)$/gm;
    const headings: TableOfContentsItem[] = [];
    const slugger = new GithubSlugger();
    
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const title = match[2].trim();
      headings.push({
        level,
        title,
        slug: slugger.slug(title),
      });
    }
    
    return headings;
  },

  images: (document) => {
    const content = document.mdx?.raw || document.body?.raw || "";
    if (!content) return [];
    
    // Enhanced regex to capture both Image components and markdown images
    const imageComponentRegex = /(?<=<Image[^>]*\bsrc=")[^"]+(?="[^>]*\/>)/g;
    const markdownImageRegex = /!\[[^\]]*\]\(([^)]+)\)/g;
    
    const images = [];
    
    // Get Image component sources
    const componentMatches = content.match(imageComponentRegex) || [];
    images.push(...componentMatches);
    
    // Get markdown image sources
    let match;
    while ((match = markdownImageRegex.exec(content)) !== null) {
      images.push(match[1]);
    }
    
    return [...new Set(images)]; // Remove duplicates
  },

  tweetIds: (document) => {
    const content = document.mdx?.raw || document.body?.raw || "";
    if (!content) return [];
    
    const tweetMatches = content.match(/<Tweet\sid="[0-9]+"\s\/>/g);
    return tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)?.[0]).filter(Boolean) || [];
  },

  githubRepos: (document) => {
    const content = document.mdx?.raw || document.body?.raw || "";
    if (!content) return [];
    
    return content.match(/(?<=<GithubRepo[^>]*\burl=")[^"]+(?="[^>]*\/>)/g) || [];
  },

  readingTime: (document) => {
    const content = document.mdx?.raw || document.body?.raw || document.content || "";
    const plainText = content.replace(/(<([^>]+)>)/gi, "").replace(/```[\s\S]*?```/g, "");
    return Math.ceil(readingTime(plainText).minutes);
  },

  excerpt: (document) => {
    // Use summary if available
    if (document.summary) return document.summary;
    
    // Otherwise generate from content
    const content = document.mdx?.raw || document.body?.raw || document.content || "";
    const plainText = content
      .replace(/(<([^>]+)>)/gi, "") // Remove HTML tags
      .replace(/```[\s\S]*?```/g, "") // Remove code blocks
      .replace(/^#{1,6}\s.+$/gm, "") // Remove headings
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Convert links to text
      .replace(/!\[[^\]]*\]\([^)]+\)/g, "") // Remove images
      .trim();
    
    return plainText.length > 160 ? plainText.substring(0, 157) + "..." : plainText;
  },
});