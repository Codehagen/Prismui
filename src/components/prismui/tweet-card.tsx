"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, Twitter } from "lucide-react";
import Image from "next/image";
import { type Tweet } from "react-tweet/api";
import { enrichTweet } from "react-tweet";
import { fetchTweet } from "@/app/actions/tweet";

interface TweetCardProps {
  id: string;
  className?: string;
  compact?: boolean;
  hideMedia?: boolean;
}

interface VideoVariant {
  type: string;
  src: string;
  bitrate?: number;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

function truncate(str: string, length: number) {
  if (!str || str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function TweetCard({
  id,
  className,
  compact = false,
  hideMedia = false,
}: TweetCardProps) {
  const [tweet, setTweet] = React.useState<Tweet | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadTweet = async () => {
      try {
        setIsLoading(true);
        const result = await fetchTweet(id);
        if ("error" in result) {
          throw new Error(result.error);
        }
        setTweet(result.tweet);
      } catch (err) {
        console.error("Error loading tweet:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to load tweet")
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadTweet();
  }, [id]);

  if (isLoading) {
    return (
      <Card
        className={cn(
          "flex items-center justify-center p-6",
          {
            "h-[20rem]": !compact,
            "h-[8rem]": compact,
          },
          className
        )}
      >
        <p className="text-sm text-muted-foreground">Loading tweet...</p>
      </Card>
    );
  }

  if (error || !tweet) {
    return (
      <Card
        className={cn(
          "flex items-center justify-center p-6",
          {
            "h-[20rem]": !compact,
            "h-[8rem]": compact,
          },
          className
        )}
      >
        <p className="text-sm text-muted-foreground">
          {error?.message || "Failed to load tweet"}
        </p>
      </Card>
    );
  }

  const enrichedTweet = enrichTweet(tweet);
  const {
    user,
    photos,
    video,
    entities,
    favorite_count,
    conversation_count,
    url,
    like_url,
    reply_url,
    created_at,
  } = enrichedTweet;

  const createdAt = new Date(created_at);
  const hasMedia = !hideMedia && (video || (photos && photos.length > 0));

  return (
    <Card
      className={cn(
        "group relative overflow-hidden bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/50",
        {
          "min-h-[8rem] max-h-[12rem]": compact && !hasMedia,
          "max-h-[12rem]": hideMedia,
          "h-fit": !hideMedia && hasMedia,
        },
        className
      )}
    >
      <div
        className={cn("p-6", {
          "pb-3": compact,
          "p-4": hideMedia || compact,
        })}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <a href={user.url} target="_blank" rel="noreferrer">
              <div
                className={cn(
                  "overflow-hidden border border-gray-200 transition-all ease-in-out hover:scale-105",
                  {
                    "h-10 w-10": !compact,
                    "h-8 w-8": compact,
                    "rounded-full":
                      user.profile_image_shape === "Circle" ||
                      !user.profile_image_shape,
                    "rounded-md": user.profile_image_shape === "Square",
                  }
                )}
              >
                <Image
                  alt={user.screen_name}
                  height={compact ? 32 : 48}
                  width={compact ? 32 : 48}
                  src={user.profile_image_url_https}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              </div>
            </a>
            <div>
              <a
                href={user.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center font-semibold text-foreground hover:underline"
              >
                {truncate(user.name, compact ? 15 : 20)}
                {(user.verified ||
                  user.is_blue_verified ||
                  user.verified_type) && (
                  <svg
                    aria-label="Verified Account"
                    className={cn("ml-1 inline", {
                      "h-4 w-4": !compact,
                      "h-3 w-3": compact,
                      "text-blue-500": user.is_blue_verified,
                      "text-yellow-500": user.verified_type === "Business",
                    })}
                    viewBox="0 0 24 24"
                  >
                    <g fill="currentColor">
                      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                    </g>
                  </svg>
                )}
              </a>
              <div className="flex items-center space-x-1">
                <a
                  href={user.url}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "text-muted-foreground transition-all duration-75 hover:text-foreground",
                    {
                      "text-sm": !compact,
                      "text-xs": compact,
                    }
                  )}
                >
                  @{truncate(user.screen_name, compact ? 12 : 16)}
                </a>
                <span className="text-muted-foreground">·</span>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "text-muted-foreground transition-all duration-75 hover:text-foreground",
                    {
                      "text-sm": !compact,
                      "text-xs": compact,
                    }
                  )}
                >
                  {createdAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </a>
              </div>
            </div>
          </div>
          <a href={url} target="_blank" rel="noreferrer">
            <span className="sr-only">Link to tweet</span>
            <Twitter
              className={cn(
                "text-[#3BA9EE] transition-all ease-in-out hover:scale-105",
                {
                  "h-5 w-5": !compact,
                  "h-4 w-4": compact,
                }
              )}
            />
          </a>
        </div>

        <div
          className={cn("whitespace-pre-wrap text-foreground", {
            "mb-2 mt-4 text-[15px]": !compact,
            "mb-1 mt-2 text-sm": compact,
          })}
        >
          {entities.map((item, i) => {
            switch (item.type) {
              case "hashtag":
              case "mention":
              case "url":
              case "symbol":
                return (
                  <a
                    key={i}
                    className="text-[#1d9bf0] hover:underline"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.text}
                  </a>
                );
              case "media":
                return null;
              default:
                return (
                  <span
                    key={i}
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                );
            }
          })}
        </div>

        {!hideMedia && (
          <div className="my-3">
            {video && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border">
                {video.variants.length > 0 && (
                  <video
                    className="h-full w-full"
                    controls
                    preload="metadata"
                    poster={video.poster}
                  >
                    {video.variants
                      .filter((v) => v.type === "video/mp4")
                      .sort(
                        (a, b) =>
                          ((b as VideoVariant).bitrate || 0) -
                          ((a as VideoVariant).bitrate || 0)
                      )
                      .map((v, i) => (
                        <source key={i} src={v.src} type={v.type} />
                      ))}
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}
            {photos && !video && (
              <div
                className={cn("grid gap-2", {
                  "grid-cols-1": photos.length === 1,
                  "grid-cols-2": photos.length > 1,
                })}
              >
                {photos.map((photo, i) => (
                  <a key={i} href={url} target="_blank" rel="noreferrer">
                    <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
                      <Image
                        src={photo.url}
                        alt={tweet.text}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                      />
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        <div
          className={cn("flex items-center justify-center space-x-8", {
            "mt-4": !compact,
            "mt-2": compact,
          })}
        >
          <a
            className="group flex items-center space-x-3 text-muted-foreground hover:text-red-500"
            href={like_url}
            target="_blank"
            rel="noreferrer"
          >
            <Heart
              className={cn("group-hover:fill-red-500", {
                "h-4 w-4": !compact,
                "h-3 w-3": compact,
              })}
            />
            <span
              className={cn({
                "text-sm": !compact,
                "text-xs": compact,
              })}
            >
              {formatNumber(favorite_count)}
            </span>
          </a>
          <a
            className="group flex items-center space-x-3 text-muted-foreground hover:text-[#1d9bf0]"
            href={reply_url}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle
              className={cn("group-hover:fill-[#1d9bf0]", {
                "h-4 w-4": !compact,
                "h-3 w-3": compact,
              })}
            />
            <span
              className={cn({
                "text-sm": !compact,
                "text-xs": compact,
              })}
            >
              {formatNumber(conversation_count)}
            </span>
          </a>
        </div>
      </div>
    </Card>
  );
}
