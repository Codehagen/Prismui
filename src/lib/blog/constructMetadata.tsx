import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = "https://prismui.tech/_static/static_og.png",
  icons = "/favicon.ico",
  canonical,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  canonical?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: siteConfig.name,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@codehagen",
    },
    icons,
    metadataBase: new URL(HOME_DOMAIN),
    alternates: {
      canonical: canonical,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export const HOME_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://prismui.tech"
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000";

export const APP_HOSTNAMES = new Set([
  "prismui.tech",
  "preview.prismui.tech",
  "localhost:3000",
  "localhost",
]);

export const truncate = (str: string | null, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length - 3)}...`;
};
