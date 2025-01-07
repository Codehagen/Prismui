"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, Twitter } from "lucide-react";
import Image from "next/image";
import { type Tweet } from "react-tweet/api";
import { enrichTweet } from "react-tweet";
import { fetchTweet } from "@/app/actions/tweet";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TweetCardProps {
  id: string;
  className?: string;
  compact?: boolean;
  hideMedia?: boolean;
  iconVariant?: "twitter" | "x";
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

function TweetCardSkeleton({
  compact,
  className,
}: Pick<TweetCardProps, "compact" | "className">) {
  return (
    <Card
      className={cn(
        "flex flex-col space-y-4 p-6",
        {
          "h-[20rem]": !compact,
          "h-[8rem]": compact,
        },
        className
      )}
    >
      <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-3 w-[100px]" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </Card>
  );
}

const TweetCardContent = React.memo(function TweetCardContent({
  tweet,
  className,
  compact = false,
  hideMedia = false,
  iconVariant = "twitter",
}: Omit<TweetCardProps, "id"> & { tweet: Tweet }) {
  const Icon = iconVariant === "twitter" ? Twitter : Icons.twitter;
  const iconColor =
    iconVariant === "twitter" ? "text-[#3BA9EE]" : "text-foreground";
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn(
          "group relative overflow-hidden bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/50 transition-all duration-200 hover:shadow-lg",
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
              <a
                href={user.url}
                target="_blank"
                rel="noreferrer"
                className="transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div
                  className={cn(
                    "overflow-hidden border border-gray-200/50 bg-gradient-to-br from-white to-gray-50 transition-all not-prose",
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
                  <div className="relative h-full w-full">
                    <Image
                      alt={user.screen_name}
                      src={user.profile_image_url_https}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              </a>
              <div>
                <a
                  href={user.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center font-semibold text-foreground transition-colors hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {truncate(user.name, compact ? 15 : 20)}
                  {(user.verified ||
                    user.is_blue_verified ||
                    user.verified_type) && (
                    <motion.svg
                      aria-label="Verified Account"
                      className={cn("ml-1 inline", {
                        "h-4 w-4": !compact,
                        "h-3 w-3": compact,
                        "text-blue-500": user.is_blue_verified,
                        "text-yellow-500": user.verified_type === "Business",
                      })}
                      viewBox="0 0 24 24"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                      }}
                    >
                      <g fill="currentColor">
                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                      </g>
                    </motion.svg>
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-9 w-9 rounded-full p-0 hover:bg-blue-50 hover:text-blue-500"
                  >
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center"
                    >
                      <span className="sr-only">
                        View on {iconVariant === "twitter" ? "Twitter" : "X"}
                      </span>
                      <Icon
                        className={cn(
                          iconColor,
                          "transition-all duration-200 ease-in-out group-hover:scale-110",
                          {
                            "h-5 w-5": !compact,
                            "h-4 w-4": compact,
                          }
                        )}
                      />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  View on {iconVariant === "twitter" ? "Twitter" : "X"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
                      className="text-blue-500 transition-colors hover:text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="my-3"
            >
              {video && (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border not-prose">
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
                  className={cn("grid gap-2 not-prose", {
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
            </motion.div>
          )}

          <div
            className={cn(
              "flex items-center justify-center space-x-8 transition-opacity group-hover:opacity-100",
              {
                "mt-4 opacity-90": !compact,
                "mt-2 opacity-75": compact,
              }
            )}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="h-auto space-x-2 p-0 hover:bg-transparent"
                  >
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group inline-flex items-center gap-1.5 text-muted-foreground/60 transition-colors hover:text-rose-500"
                      href={like_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Heart
                        className={cn(
                          "transition-all duration-300 ease-in-out group-hover:fill-rose-500 group-hover:stroke-rose-500",
                          {
                            "h-4 w-4": !compact,
                            "h-3 w-3": compact,
                          }
                        )}
                      />
                      <span
                        className={cn(
                          "font-medium transition-colors duration-300 ease-in-out group-hover:text-rose-500",
                          {
                            "text-sm": !compact,
                            "text-xs": compact,
                          }
                        )}
                      >
                        {formatNumber(favorite_count)}
                      </span>
                    </motion.a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Like on Twitter</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="h-auto space-x-2 p-0 hover:bg-transparent"
                  >
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group inline-flex items-center gap-1.5 text-muted-foreground/60 transition-colors hover:text-sky-500"
                      href={reply_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle
                        className={cn(
                          "transition-all duration-300 ease-in-out group-hover:fill-sky-500 group-hover:stroke-sky-500",
                          {
                            "h-4 w-4": !compact,
                            "h-3 w-3": compact,
                          }
                        )}
                      />
                      <span
                        className={cn(
                          "font-medium transition-colors duration-300 ease-in-out group-hover:text-sky-500",
                          {
                            "text-sm": !compact,
                            "text-xs": compact,
                          }
                        )}
                      >
                        {formatNumber(conversation_count)}
                      </span>
                    </motion.a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Reply on Twitter</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});

export function TweetCard({
  id,
  className,
  compact,
  hideMedia,
  iconVariant = "twitter",
}: TweetCardProps) {
  const [tweet, setTweet] = React.useState<Tweet | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    async function loadTweet() {
      try {
        const result = await fetchTweet(id);

        if (!mounted) return;

        if ("error" in result) {
          throw new Error(result.error);
        }

        setTweet(result.tweet);
      } catch (err) {
        if (!mounted) return;
        setError(
          err instanceof Error ? err : new Error("Failed to load tweet")
        );
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadTweet();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (isLoading) {
    return <TweetCardSkeleton compact={compact} className={className} />;
  }

  if (error) {
    return (
      <Card
        className={cn(
          "flex items-center justify-center p-6 text-center",
          {
            "h-[20rem]": !compact,
            "h-[8rem]": compact,
          },
          className
        )}
      >
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            {error.message}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.location.reload()}
            className="h-auto p-0 text-xs font-normal text-blue-500 hover:bg-transparent hover:text-blue-600"
          >
            Try again
          </Button>
        </div>
      </Card>
    );
  }

  if (!tweet) {
    return null;
  }

  return (
    <TweetCardContent
      tweet={tweet}
      className={className}
      compact={compact}
      hideMedia={hideMedia}
      iconVariant={iconVariant}
    />
  );
}
