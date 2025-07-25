/**
 * Blog page
 * Credits to Steven Tey and the Dub.sh team
 * @see https://github.com/steven-tey/dub
 */

import MaxWidthWrapper from "@/components/blog/max-width-wrapper";
import { allBlogPosts } from "content-collections";
import { notFound } from "next/navigation";
import Link from "next/link";
import Author from "@/components/blog/author";
import { MDX } from "@/components/blog/mdx";
import { getBlurDataURL } from "@/lib/blog/images";
import { Metadata } from "next";
import { constructMetadata, formatDate } from "@/lib/utils";
import { BLOG_CATEGORIES } from "@/lib/blog/content";
import BlurImage from "@/lib/blog/blur-image";

export async function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = allBlogPosts.find((post) => post.slug === slug);
  if (!post) {
    return;
  }

  const { title, seoTitle, summary, seoDescription, image } = post;

  return constructMetadata({
    title: `${seoTitle || title} – Prism UI`,
    description: seoDescription || summary,
    image,
    canonical: `https://prismui.tech/blog/${slug}`,
  });
}

export default async function BlogArticle({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const data = allBlogPosts.find((post) => post.slug === slug);
  if (!data) {
    notFound();
  }

  const [thumbnailBlurhash, images] = await Promise.all([
    getBlurDataURL(data.image),
    await Promise.all(
      (data.images || []).map(async (src: string) => ({
        src,
        blurDataURL: await getBlurDataURL(src),
      }))
    ),
  ]);

  // Find the first valid category for the post
  const category = data.categories
    .map((cat) => BLOG_CATEGORIES.find((c) => c.slug === cat))
    .find((cat) => cat !== undefined);

  if (!category) {
    console.error(`No valid category found for post: ${data.slug}`);
    notFound();
  }

  const relatedArticles = data.related
    ? data.related
        .map((slug) => allBlogPosts.find((post) => post.slug === slug))
        .filter((post): post is NonNullable<typeof post> => post !== undefined)
    : [];

  return (
    <>
      <MaxWidthWrapper>
        <div className="flex max-w-screen-sm flex-col space-y-4 pt-16">
          <div className="flex items-center space-x-4">
            <Link
              href={`/blog/category/${category.slug}`}
              className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-semibold text-foreground shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.1)] backdrop-blur transition-all hover:border-border/80 hover:bg-card/50"
            >
              {category.title}
            </Link>
            <time
              dateTime={data.publishedAt}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {formatDate(data.publishedAt)}
            </time>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl sm:leading-snug">
            {data.title}
          </h1>
          <p className="text-xl text-muted-foreground">{data.summary}</p>
        </div>
      </MaxWidthWrapper>

      <div className="relative">
        <div className="absolute top-52 h-[calc(100%-13rem)] w-full border border-border bg-card/50 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur-lg" />
        <MaxWidthWrapper className="grid grid-cols-4 gap-5 px-0 pt-10 lg:gap-10">
          <div className="relative col-span-4 flex flex-col space-y-8 bg-card sm:rounded-t-xl sm:border sm:border-border md:col-span-3">
            <BlurImage
              className="aspect-[1200/630] rounded-t-xl object-cover"
              src={data.image}
              blurDataURL={thumbnailBlurhash}
              width={1200}
              height={630}
              alt={data.title}
              priority // cause it's above the fold
            />
            <MDX
              code={data.mdx}
              images={images}
              className="px-5 pb-20 pt-4 sm:px-10"
            />
          </div>
          <div className="sticky top-20 col-span-1 mt-48 hidden flex-col divide-y divide-border self-start sm:flex">
            <div className="flex flex-col space-y-4 py-5">
              <p className="text-sm text-muted-foreground">Written by</p>
              <Author username={data.author} />
            </div>
            {relatedArticles.length > 0 && (
              <div className="flex flex-col space-y-4 py-5">
                <p className="text-sm text-muted-foreground">Read more</p>
                <ul className="flex flex-col space-y-4">
                  {relatedArticles.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col space-y-2"
                      >
                        <p className="font-semibold text-foreground underline-offset-4 group-hover:underline">
                          {post.title}
                        </p>
                        <p className="line-clamp-2 text-sm text-muted-foreground underline-offset-2 group-hover:underline">
                          {post.summary}
                        </p>
                        <p className="text-xs text-muted-foreground underline-offset-2 group-hover:underline">
                          {formatDate(post.publishedAt)}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}
