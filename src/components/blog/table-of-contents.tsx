"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import useCurrentAnchor from "@/lib/blog/use-current-anchor";
import { cn } from "@/lib/utils";
import { Bug, Lightbulb, Pencil } from "lucide-react";

export default function TableOfContents({
  items,
}: {
  items: {
    title: string;
    slug: string;
  }[];
}) {
  const currentAnchor = useCurrentAnchor();

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <h4 className="mb-4 font-medium text-foreground">On This Page</h4>
        <div className="relative grid gap-4 border-l-2 border-border">
          {items.map((item) => {
            const isActive = currentAnchor === item.slug;
            return (
              <div key={item.slug} className="relative">
                {isActive && (
                  <motion.div
                    layoutId="blog-active-indicator"
                    className="absolute -left-0.5 h-full border-l-2 border-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      duration: 0.15,
                      ease: "easeOut"
                    }}
                    style={{ willChange: "opacity" }}
                  />
                )}
                <Link
                  href={`#${item.slug}`}
                  className={cn(
                    "-ml-0.5 block pl-4 text-sm text-muted-foreground transition-colors hover:text-foreground",
                    {
                      "text-foreground": isActive,
                    }
                  )}
                >
                  {item.title}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h4 className="mb-4 font-medium text-foreground">Contribute</h4>
        <div className="grid gap-2">
          <Link
            href="/report-issue"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Bug className="h-4 w-4" />
            Report an issue
          </Link>
          <Link
            href="/request-feature"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Lightbulb className="h-4 w-4" />
            Request a feature
          </Link>
          <Link
            href="/edit-page"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Pencil className="h-4 w-4" />
            Edit this page
          </Link>
        </div>
      </div>
    </div>
  );
}
