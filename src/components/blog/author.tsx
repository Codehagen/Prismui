import Link from "next/link";

import BlurImage from "@/lib/blog/blur-image";
import { timeAgo } from "@/lib/utils";

const authors = {
  codehagen: {
    name: "Christer Hagen",
    image:
      "https://imagedelivery.net/r-6-yk-gGPtjfbIST9-8uA/addc4b60-4c8f-47d7-10ab-6f9048432500/public",
  },
  motormary: {
    name: "Mathias Moen",
    image:
      "https://imagedelivery.net/r-6-yk-gGPtjfbIST9-8uA/4ee5b8c7-29a6-484a-844d-d99c52a49300/public",
  },
} as const;

type AuthorProps = {
  username: keyof typeof authors;
  updatedAt?: string;
  imageOnly?: boolean;
};

export default async function Author({
  username,
  updatedAt,
  imageOnly,
}: AuthorProps) {
  if (!authors[username]) {
    console.error(`Author not found: ${username}`);
    return null;
  }

  return imageOnly ? (
    <span className="w-10 h-10 relative">
      <BlurImage
        src={authors[username].image}
        alt={authors[username].name}
        fill
        className="border border-white ring-1 ring-primary rounded-full transition-all group-hover:brightness-90"
      />
    </span>
  ) : updatedAt ? (
    <div className="flex items-center space-x-3">
      <span className="w-10 h-10 relative">
        <BlurImage
          src={authors[username].image}
          alt={authors[username].name}
          fill
          className="border border-white ring-1 ring-primary rounded-full"
        />
      </span>
      <div className="flex flex-col">
        <p className="text-sm text-gray-500">
          Written by {authors[username].name}
        </p>
        <time dateTime={updatedAt} className="text-sm font-light text-gray-400">
          Last updated {timeAgo(new Date(updatedAt))}
        </time>
      </div>
    </div>
  ) : (
    <Link
      href={`https://twitter.com/${username}`}
      className="group flex items-center space-x-3"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="w-10 h-10 relative">
        <BlurImage
          src={authors[username].image}
          alt={authors[username].name}
          fill
          className="border border-white ring-1 ring-primary rounded-full transition-all group-hover:brightness-90"
        />
      </span>
      <div className="flex flex-col">
        <p className="font-semibold text-gray-700">{authors[username].name}</p>
        <p className="text-sm text-gray-500">@{username}</p>
      </div>
    </Link>
  );
}
