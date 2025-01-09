import { allChangelogPosts } from "content-collections";
import { MDX } from "@/components/blog/mdx";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const categories = {
  new: "bg-emerald-500/15 text-emerald-500",
  improvement: "bg-blue-500/15 text-blue-500",
  fix: "bg-amber-500/15 text-amber-500",
} as const;

export default async function ChangelogPage() {
  const sortedChangelogs = [...allChangelogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
        <div className="mb-16">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            Changelog
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            New features, improvements, and fixes.
          </p>
        </div>

        <div className="space-y-16">
          {sortedChangelogs.map((changelog) => (
            <article
              key={changelog.slug}
              className="relative rounded-lg border bg-card shadow-sm transition-colors hover:bg-accent/50 overflow-hidden"
            >
              {changelog.image && (
                <div className="w-full overflow-hidden">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={changelog.image}
                      alt={changelog.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                      priority={true}
                    />
                  </AspectRatio>
                </div>
              )}

              <div className="p-6 space-y-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <time
                      dateTime={changelog.publishedAt}
                      className="text-sm text-muted-foreground"
                    >
                      {new Date(changelog.publishedAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </time>
                    {changelog.categories?.map((category) => (
                      <span
                        key={category}
                        className={cn(
                          "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
                          categories[category as keyof typeof categories]
                        )}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    {changelog.title}
                  </h2>
                </div>

                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <MDX code={changelog.mdx} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
