import { siteConfig } from "@/lib/config";
import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";
import ms from "ms";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || siteConfig.url}${path}`;
}

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = absoluteUrl("/og"),
  canonical,
  noIndex = false,
  ...props
}: {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
  [key: string]: Metadata[keyof Metadata];
}): Metadata {
  return {
    title: {
      template: "%s | " + siteConfig.name,
      default: siteConfig.name,
    },
    description: description || siteConfig.description,
    keywords: siteConfig.keywords,
    openGraph: {
      title,
      description,
      url: canonical || siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@codehagen",
      site: "@prismui",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: "/favicon.ico",
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonical || siteConfig.url,
    },
    authors: [
      {
        name: siteConfig.name,
        url: siteConfig.url,
      },
    ],
    ...props,
  };
}

export function formatDate(date: string) {
  let currentDate = new Date().getTime();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date).getTime();
  let timeDifference = Math.abs(currentDate - targetDate);
  let daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  let fullDate = new Date(date).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (daysAgo < 1) {
    return "Today";
  } else if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${weeksAgo}w ago)`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (${monthsAgo}mo ago)`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${fullDate} (${yearsAgo}y ago)`;
  }
}

export const timeAgo = (
  timestamp: Date | null,
  {
    withAgo,
  }: {
    withAgo?: boolean;
  } = {}
): string => {
  if (!timestamp) return "Never";
  const diff = Date.now() - new Date(timestamp).getTime();
  if (diff < 1000) {
    // less than 1 second
    return "Just now";
  } else if (diff > 82800000) {
    // more than 23 hours – similar to how Twitter displays timestamps
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year:
        new Date(timestamp).getFullYear() !== new Date().getFullYear()
          ? "numeric"
          : undefined,
    });
  }
  return `${ms(diff)}${withAgo ? " ago" : ""}`;
};

export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0";
}

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
); // 7-character random string

interface SWRError extends Error {
  status: number;
}
