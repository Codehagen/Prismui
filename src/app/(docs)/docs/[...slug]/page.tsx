import MaxWidthWrapper from "@/components/blog/max-width-wrapper";
import { allDocsPosts } from "content-collections";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDX } from "@/components/blog/mdx";
import { getBlurDataURL } from "@/lib/blog/images";
import { TableOfContents } from "@/components/docs/table-of-contents";
import { ChevronRight } from "lucide-react";
import Author from "@/components/blog/author";

export async function generateStaticParams() {
  return allDocsPosts.map((post) => ({
    slug: post.slug.split("/"),
  }));
}

export default async function DocsPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = params.slug.join("/");
  const data = allDocsPosts.find((post) => post.slug === slug);

  if (!data) {
    notFound();
  }

  const images = await Promise.all(
    (data.images || []).map(async (src: string) => ({
      src,
      blurDataURL: await getBlurDataURL(src),
    }))
  );

  const relatedArticles = data.related
    ? data.related
        .map((slug) => allDocsPosts.find((post) => post.slug === slug))
        .filter((post): post is NonNullable<typeof post> => post !== undefined)
    : [];

  // Create breadcrumb segments
  const segments = [
    { name: "Documentation", href: "/docs" },
    ...params.slug.map((segment, index) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: `/docs/${params.slug.slice(0, index + 1).join("/")}`,
    })),
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50" />

      <div className="relative">
        <div className="grid grid-cols-4 gap-10 py-10">
          <div className="col-span-4 flex flex-col space-y-8 md:col-span-3 md:pr-10">
            <div className="flex items-center space-x-2">
              {segments.map((segment, index) => (
                <div key={segment.href} className="flex items-center">
                  {index > 0 && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  <Link
                    href={segment.href}
                    className="whitespace-nowrap text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    {segment.name}
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex flex-col space-y-4">
              <h1 className="font-display text-3xl font-bold !leading-snug text-foreground sm:text-4xl">
                {data.title}
              </h1>
              <p className="text-muted-foreground">{data.summary}</p>
              <Author username={data.author} updatedAt={data.publishedAt} />
            </div>
            <div className="prose prose-gray max-w-none dark:prose-invert">
              <MDX code={data.mdx} images={images} />
            </div>
            {relatedArticles.length > 0 && (
              <div className="flex flex-col space-y-4 border-t border-border pt-8">
                <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                  Related Articles
                </h2>
                <div className="grid gap-2 rounded-xl border border-border bg-card p-4">
                  {relatedArticles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/docs/${article.slug}`}
                      className="group flex flex-col space-y-2 rounded-lg p-3 transition-colors hover:bg-muted"
                    >
                      <p className="font-medium text-foreground group-hover:text-foreground">
                        {article.title}
                      </p>
                      <p className="line-clamp-2 text-sm text-muted-foreground group-hover:text-foreground">
                        {article.summary}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="sticky top-20 col-span-1 hidden flex-col space-y-10 divide-y divide-border self-start md:flex">
            <TableOfContents
              items={data.tableOfContents}
              currentPageSlug={`/docs/${params.slug.join("/")}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
