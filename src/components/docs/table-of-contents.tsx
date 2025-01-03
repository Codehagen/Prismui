"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Bug, Github, Pencil } from "lucide-react";
import { getDocsGitHubUrl, getDocsIssueUrl } from "@/lib/github-url";

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
  const [activeSlug, setActiveSlug] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const slug = entry.target.getAttribute("id");
          if (slug && entry.isIntersecting && entry.intersectionRatio > 0) {
            setActiveSlug(slug);
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: [0, 1],
      }
    );

    const headings = document.querySelectorAll("h2[id], h3[id], h4[id]");
    headings.forEach((heading) => observer.observe(heading));

    // Update active section on scroll
    const handleScroll = () => {
      const headingElements = Array.from(headings);
      const visibleHeadings = headingElements.filter((heading) => {
        const rect = heading.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight * 0.5;
      });

      if (visibleHeadings.length > 0) {
        // Get the last visible heading (the one closest to the top)
        const lastVisibleHeading = visibleHeadings[visibleHeadings.length - 1];
        const slug = lastVisibleHeading.getAttribute("id");
        if (slug) setActiveSlug(slug);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="sticky top-20 col-span-1 hidden flex-col space-y-10 divide-y divide-border self-start md:flex bg-background/50 backdrop-blur-lg p-4 rounded-lg">
      <div>
        <h4 className="mb-4 text-sm font-medium">On This Page</h4>
        <div className="relative">
          <div className="absolute left-0 top-2 h-full w-[1px] bg-border" />
          <div className="space-y-2">
            {items.map((item) => {
              const isActive = activeSlug === item.slug;
              return (
                <div key={item.slug} className="relative">
                  {isActive && (
                    <motion.div
                      layoutId="active-heading-indicator"
                      className="absolute -left-[1px] h-full w-[2px] bg-primary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        ease: "easeInOut",
                        duration: 0.2,
                      }}
                    />
                  )}
                  <Link
                    href={`#${item.slug}`}
                    className={cn(
                      "block py-1 pl-4 text-sm text-muted-foreground hover:text-foreground",
                      isActive && "font-medium text-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                </div>
              );
            })}
          </div>
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
