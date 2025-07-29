import { allBlogPosts } from "content-collections";

import { getBlurDataURL } from "@/lib/blog/images";
import BlogCard from "@/components/blog/blog-card";
import { constructMetadata } from "@/lib/blog/constructMetadata";

export const metadata = constructMetadata({
  title: "Blog – PrismUI",
  description:
    "Latest news and updates from PrismUI. Discover expert insights, industry trends, and success stories.",
  canonical: "https://www.prismui.tech/blog",
});

export default async function Blog() {
  const articles = await Promise.all(
    allBlogPosts
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
      .map(async (post) => ({
        title: post.title,
        summary: post.summary,
        publishedAt: post.publishedAt,
        image: post.image,
        author: post.author,
        slug: post.slug,
        categories: post.categories,
        blurDataURL: await getBlurDataURL(post.image),
      }))
  );

  return articles.map((article, idx) => (
    <BlogCard key={article.slug} data={article} priority={idx <= 1} />
  ));
}
