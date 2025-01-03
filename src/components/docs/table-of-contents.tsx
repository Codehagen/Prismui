"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Bug, Github, Pencil } from "lucide-react";
import { getDocsGitHubUrl, getDocsIssueUrl } from "@/lib/github-url";
import useCurrentAnchor from "@/lib/blog/use-current-anchor";

interface TableOfContentsProps {
  items: {
    title: string;
    slug: string;
  }[];
  currentPageSlug: string;
}

export function TableOfContents({
  items,
  currentPageSlug,
}: TableOfContentsProps) {
  const currentAnchor = useCurrentAnchor();

  return (
    <div className="sticky top-20 col-span-1 hidden flex-col space-y-10 divide-y divide-border self-start md:flex bg-background/50 backdrop-blur-lg p-4 rounded-lg">
      <div>
        <h4 className="mb-4 text-sm font-medium">On This Page</h4>
        <div className="relative grid gap-2 border-l-2 border-border">
          {items.map((item) => {
            const isActive = currentAnchor === item.slug;
            return (
              <div key={item.slug} className="relative">
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute -left-0.5 h-full border-l-2 border-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <Link
                  href={`#${item.slug}`}
                  className={cn(
                    "-ml-0.5 block pl-4 text-sm text-muted-foreground transition-colors hover:text-foreground",
                    isActive && "text-foreground"
                  )}
                >
                  {item.title}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="pt-6 space-y-4">
        <h4 className="text-sm font-medium">Contribute</h4>
        <div className="flex flex-col gap-2">
          <Link
            href={getDocsIssueUrl(
              `Issue: ${currentPageSlug}`,
              `Issue found on: ${currentPageSlug}\n\nDescription:\n`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Bug className="h-4 w-4" />
            Report an issue
          </Link>
          <Link
            href={getDocsGitHubUrl(currentPageSlug)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Pencil className="h-4 w-4" />
            Edit this page
          </Link>
          <Link
            href="https://github.com/codehagen/prismui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}
