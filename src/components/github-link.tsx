import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/lib/config"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export function GitHubLink() {
  return (
    <Button asChild size="sm" variant="ghost" className="h-8 shadow-none">
      <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
        <Icons.github className="h-4 w-4" />
        <React.Suspense fallback={<Skeleton className="h-4 w-8" />}>
          <StarsCount />
        </React.Suspense>
      </Link>
    </Button>
  )
}

async function StarsCount() {
  try {
    // Extract repository owner/name from GitHub URL
    const repoPath = siteConfig.links.github.replace("https://github.com/", "")
    const data = await fetch(`https://api.github.com/repos/${repoPath}`, {
      next: { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
    })
    
    if (!data.ok) {
      return null
    }
    
    const json = await data.json()

    return (
      <span className="text-muted-foreground w-8 text-xs tabular-nums">
        {json.stargazers_count >= 1000
          ? `${(json.stargazers_count / 1000).toFixed(1)}k`
          : json.stargazers_count?.toLocaleString() || "0"}
      </span>
    )
  } catch (error) {
    return null
  }
}