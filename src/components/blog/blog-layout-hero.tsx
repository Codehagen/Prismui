"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, List } from "lucide-react";

import { BLOG_CATEGORIES } from "@/lib/blog/content";
import { cn } from "@/lib/utils";

import MaxWidthWrapper from "./max-width-wrapper";
import Popover from "./popover";

export default function BlogLayoutHero() {
  const { slug } = useParams() as { slug?: string };

  const data = BLOG_CATEGORIES.find((category) => category.slug === slug);

  const [openPopover, setOpenPopover] = useState(false);

  return (
    <>
      <MaxWidthWrapper>
        <div className="max-w-screen-sm py-16">
          <h1 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">
            {data?.title || "Blog"}
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            {data?.description || "Latest insights and updates from Prism UI."}
          </p>
          <nav className="mt-6 hidden w-fit items-center space-x-2 rounded-full border border-border bg-background p-2 md:flex">
            <CategoryLink title="Overview" href="/blog" active={!slug} />
            {BLOG_CATEGORIES.map((category) => (
              <CategoryLink
                key={category.slug}
                title={category.title}
                href={`/blog/category/${category.slug}`}
                active={category.slug === slug}
              />
            ))}
          </nav>
        </div>
      </MaxWidthWrapper>
      <Popover
        content={
          <div className="w-full p-4">
            <CategoryLink
              title="Overview"
              href="/blog"
              active={!slug}
              mobile
              setOpenPopover={setOpenPopover}
            />
            {BLOG_CATEGORIES.map((category) => (
              <CategoryLink
                key={category.slug}
                title={category.title}
                href={`/blog/category/${category.slug}`}
                active={category.slug === slug}
                mobile
                setOpenPopover={setOpenPopover}
              />
            ))}
            <CategoryLink
              title="Updates"
              href="/updates"
              mobile
              setOpenPopover={setOpenPopover}
            />
          </div>
        }
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
        mobileOnly
      >
        <button
          onClick={() => {
            setOpenPopover(!openPopover);
          }}
          className="flex w-full items-center space-x-2 border-t border-border px-2.5 py-4 text-sm text-foreground"
        >
          <List size={16} />
          <p>Categories</p>
        </button>
      </Popover>
    </>
  );
}

const CategoryLink = ({
  title,
  href,
  active,
  mobile,
  setOpenPopover,
}: {
  title: string;
  href: string;
  active?: boolean;
  mobile?: boolean;
  setOpenPopover?: (open: boolean) => void;
}) => {
  if (mobile) {
    return (
      <Link
        href={href}
        {...(setOpenPopover && {
          onClick: () => setOpenPopover(false),
        })}
        className="flex w-full items-center justify-between rounded-md p-2 transition-colors hover:bg-muted active:bg-muted/80"
      >
        <p className="text-sm text-muted-foreground">{title}</p>
        {active && <Check size={16} className="text-muted-foreground" />}
      </Link>
    );
  }
  return (
    <Link href={href} className="relative z-10">
      <div
        className={cn(
          "rounded-full px-4 py-2 text-sm transition-all",
          active
            ? "text-primary-foreground"
            : "text-muted-foreground hover:bg-muted active:bg-muted/80"
        )}
      >
        {title}
      </div>
      {active && (
        <motion.div
          layoutId="indicator"
          className="absolute left-0 top-0 h-full w-full rounded-full bg-gradient-to-tr from-primary via-primary/80 to-primary"
          style={{ zIndex: -1 }}
        />
      )}
    </Link>
  );
};
