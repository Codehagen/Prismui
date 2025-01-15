import * as React from "react";
import { MDXContent } from "@content-collections/mdx/react";
import Link from "next/link";
import { allBlogPosts, allChangelogPosts } from "content-collections";
import { ListChecks } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, formatDate } from "@/lib/utils";
import BlurImage from "@/lib/blog/blur-image";
import CopyBox from "./copy-box";
import ExpandingArrow from "./icons/expanding-arrow";
import ZoomImage from "./zoom-image";
import { ComponentPreview } from "@/components/component-preview";
import { ComponentSource } from "@/components/component-source";
import { Note } from "@/components/ui/note";
import { SectionPreview } from "@/components/section-preview";
import { MdxCodeBlock } from "@/components/mdx-code-block";
import { ComponentPreviewNotRegistry } from "@/components/component-preview-not-registry";
import { DownloadButton } from "@/components/download-button";

const CustomLink = (props: any) => {
  const href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link {...props} href={href}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "font-heading mt-2 scroll-m-20 text-4xl font-bold",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  a: CustomLink,
  Link: CustomLink,
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("ml-6 list-disc [&>li]:mt-2", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("ml-6 list-decimal [&>li]:mt-2", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-border pl-6 italic text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("m-0 border-t border-border p-0 even:bg-muted", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border border-border px-4 py-2 text-left font-medium text-foreground [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border-t border-border px-4 py-2 text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({
    children,
    className,
    ...props
  }: React.HTMLAttributes<HTMLPreElement>) => {
    const childArray = React.Children.toArray(children);
    const code = childArray[0] as React.ReactElement;

    if (code.type !== "code") {
      return (
        <pre className={className} {...props}>
          {children}
        </pre>
      );
    }

    const language = code.props.className?.replace("language-", "") || "tsx";

    return (
      <MdxCodeBlock
        code={code.props.children as string}
        language={language}
        className="mb-4 mt-6"
      />
    );
  },
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const isInline = !props.className?.includes("language-");
    return (
      <code
        className={cn(
          isInline
            ? "relative rounded bg-zinc-800 px-[0.3rem] py-[0.2rem] font-mono text-sm text-zinc-50"
            : "relative font-mono text-sm text-zinc-50",
          className
        )}
        {...props}
      />
    );
  },
  Quote: (props: {
    author: string;
    authorSrc: string;
    title: string;
    company: string;
    companySrc: string;
    text: string;
  }) => (
    <div className="not-prose mt-4 flex flex-col items-center justify-center space-y-4 rounded-md border border-border bg-card p-10">
      <div className="w-fit rounded-full bg-gradient-to-r from-blue-100 to-green-100 p-1.5 dark:from-blue-900 dark:to-green-900">
        <BlurImage
          className="h-20 w-20 rounded-full border-2 border-background"
          src={props.authorSrc}
          alt={props.author}
          width={80}
          height={80}
        />
      </div>
      <p className="text-center text-lg text-muted-foreground [text-wrap:balance]">
        &quot;{props.text}&quot;
      </p>
      <div className="flex items-center justify-center space-x-2">
        <BlurImage
          className="h-12 w-12 rounded-md border-2 border-background"
          src={props.companySrc}
          alt={props.company}
          width={48}
          height={48}
        />
        <div className="flex flex-col">
          <p className="font-semibold text-foreground">{props.author}</p>
          <p className="text-sm text-muted-foreground">{props.title}</p>
        </div>
      </div>
    </div>
  ),
  Prerequisites: (props: any) => (
    <div className="mt-4 rounded-md border border-border bg-card px-6 py-1 text-[0.95rem] leading-[1.4rem] shadow-md">
      <div className="-mb-6 flex items-center space-x-2 text-muted-foreground">
        <ListChecks size={20} />
        <p className="text-sm font-medium uppercase">Prerequisites</p>
      </div>
      {props.children}
    </div>
  ),
  CopyBox,
  Changelog: (props: any) => (
    <ul className="not-prose grid list-none rounded-xl border border-border bg-card p-4">
      {[...allBlogPosts, ...allChangelogPosts]
        .filter((post) => post.publishedAt <= props.before)
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
        .slice(0, props.count)
        .map((post: any) => (
          <li key={post.slug}>
            <Link
              href={`/${post.type === "BlogPost" ? "blog" : "changelog"}/${
                post.slug
              }`}
              className="group flex items-center justify-between rounded-lg px-2 py-3 transition-colors hover:bg-muted active:bg-muted/80 sm:px-4"
            >
              <div>
                <p className="text-xs font-medium text-muted-foreground group-hover:text-foreground">
                  {formatDate(post.publishedAt)}
                </p>
                <h3 className="my-px text-base font-medium text-foreground group-hover:text-foreground">
                  {post.title}
                </h3>
                <p className="line-clamp-1 text-sm text-muted-foreground group-hover:text-foreground">
                  {post.summary}
                </p>
              </div>
              <ExpandingArrow className="-ml-4 h-4 w-4 text-muted-foreground group-hover:text-foreground" />
            </Link>
          </li>
        ))}
    </ul>
  ),
  Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3
      className={cn(
        "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  Steps: ({ ...props }) => (
    <div
      className="[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"
      {...props}
    />
  ),
  Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
    <Tabs className={cn("relative mt-6 w-full", className)} {...props} />
  ),
  TabsList: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsList>) => (
    <TabsList
      className={cn(
        "w-full justify-start rounded-none border-b bg-transparent p-0",
        className
      )}
      {...props}
    />
  ),
  TabsTrigger: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsTrigger>) => (
    <TabsTrigger
      className={cn(
        "relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none",
        className
      )}
      {...props}
    />
  ),
  TabsContent: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsContent>) => (
    <TabsContent
      className={cn(
        "relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold",
        className
      )}
      {...props}
    />
  ),
  ComponentPreview,
  ComponentSource,
  ComponentPreviewNotRegistry,
  MdxCodeBlock,
  Note,
  SectionPreview,
  DownloadButton,
};

interface MDXProps {
  code: string;
  images?: { alt?: string; src: string; blurDataURL: string }[];
  className?: string;
}

interface MDXImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  blurDataURL?: string;
}

export function MDX({ code, images, className }: MDXProps) {
  const MDXImage = (props: MDXImageProps) => {
    if (!images) return null;

    // Special handling for Twitter profile images
    if (props.src?.includes("twimg.com")) {
      return (
        <img
          {...props}
          loading="eager"
          className={cn(props.className, "h-full w-full object-cover")}
        />
      );
    }

    const blurDataURL = images.find(
      (image) => image.src === props.src
    )?.blurDataURL;

    return <ZoomImage {...props} blurDataURL={blurDataURL} />;
  };

  return (
    <article className={cn("mx-auto max-w-[120ch]", className)}>
      <MDXContent
        code={code}
        components={{
          ...components,
          Image: MDXImage,
          img: MDXImage,
        }}
      />
    </article>
  );
}
