"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

interface Contributor {
  avatar_url: string;
  login: string;
}

interface Stats {
  stars: number;
  contributors: Contributor[];
}

interface OpenSourceProps {
  /** The repository owner/name (e.g., "codehagen/prismui") */
  repository: string;
  /** Optional GitHub OAuth token for API requests */
  githubToken?: string;
  /** Optional default stats to show while loading */
  defaultStats?: Stats;
  /** Optional custom title */
  title?: string;
  /** Optional custom description */
  description?: string;
  /** Optional custom button text */
  buttonText?: string;
  /** Optional className for styling */
  className?: string;
}

/**
 * Example of how to fetch GitHub stats in your server component or action:
 *
 * ```ts
 * async function getGithubStats(repository: string, githubToken?: string): Promise<Stats> {
 *   try {
 *     const [repoResponse, contributorsResponse] = await Promise.all([
 *       fetch(`https://api.github.com/repos/${repository}`, {
 *         ...(githubToken && {
 *           headers: {
 *             Authorization: `Bearer ${githubToken}`,
 *             "Content-Type": "application/json",
 *           },
 *         }),
 *         next: { revalidate: 3600 },
 *       }),
 *       fetch(`https://api.github.com/repos/${repository}/contributors`, {
 *         ...(githubToken && {
 *           headers: {
 *             Authorization: `Bearer ${githubToken}`,
 *             "Content-Type": "application/json",
 *           },
 *         }),
 *         next: { revalidate: 3600 },
 *       }),
 *     ]);
 *
 *     if (!repoResponse.ok || !contributorsResponse.ok) {
 *       return { stars: 0, contributors: [] };
 *     }
 *
 *     const repoData = await repoResponse.json();
 *     const contributorsData = await contributorsResponse.json();
 *
 *     return {
 *       stars: repoData.stargazers_count,
 *       contributors: contributorsData as Contributor[],
 *     };
 *   } catch (error) {
 *     return { stars: 0, contributors: [] };
 *   }
 * }
 * ```
 */

function StarIcon({
  className,
  delay = 0,
  size = "default",
}: {
  className?: string;
  delay?: number;
  size?: "small" | "default";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.2, rotate: 20 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
        hover: {
          duration: 0.2,
          ease: "easeOut",
        },
      }}
      className={className}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "text-yellow-400",
          size === "small" ? "w-4 h-4" : "w-8 h-8"
        )}
      >
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(size === "small" && "opacity-20")}
        />
      </svg>
    </motion.div>
  );
}

function StarsDecoration() {
  return (
    <div className="absolute -top-8 left-1/2 -translate-x-1/2">
      <div className="flex gap-4">
        <StarIcon delay={0.2} />
        <StarIcon delay={0.3} />
        <StarIcon delay={0.4} />
      </div>
    </div>
  );
}

function ContributorAvatars({ contributors }: { contributors: Contributor[] }) {
  const displayedContributors = contributors.slice(0, 8);

  return (
    <div className="flex flex-wrap gap-2">
      {displayedContributors.map((contributor) => (
        <motion.div
          key={contributor.login}
          whileHover={{ scale: 1.1, y: -3 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Image
            src={contributor.avatar_url}
            alt={`${contributor.login}'s avatar`}
            width={40}
            height={40}
            className="rounded-full border-2 border-background"
          />
        </motion.div>
      ))}
    </div>
  );
}

function OpenSourceCard({
  repository,
  stars,
  contributors,
}: {
  repository: string;
  stars: number;
  contributors: Contributor[];
}) {
  return (
    <div className="relative grid md:grid-cols-2 gap-8 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="relative flex flex-col items-center text-center"
      >
        <motion.a
          href={`https://github.com/${repository}`}
          target="_blank"
          rel="noreferrer"
          className="relative inline-flex flex-col items-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <StarsDecoration />
          <div className="flex flex-col items-center mt-2">
            <div className="text-7xl font-bold">{stars}</div>
            <div className="text-xl text-muted-foreground mt-2">
              Github Stars
            </div>
          </div>
        </motion.a>
      </motion.div>

      <Separator className="md:hidden" />

      <div className="hidden md:block absolute left-1/2 top-0 h-full">
        <Separator orientation="vertical" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="space-y-4">
          <div>
            <div className="text-3xl font-bold">
              {contributors.length}+ Contributors
            </div>
            <div className="text-lg text-muted-foreground mt-2">
              Join our growing community
            </div>
          </div>
          <a
            href={`https://github.com/${repository}/graphs/contributors`}
            target="_blank"
            rel="noreferrer"
            className="inline-block"
          >
            <div className="flex justify-center">
              <ContributorAvatars contributors={contributors} />
            </div>
          </a>
        </div>
      </motion.div>
    </div>
  );
}

function OpenSourceContent({
  repository,
  stars,
  contributors,
  title = "Proudly open-source",
  description = "Our source code is available on GitHub - feel free to read, review, or contribute to it however you want!",
  buttonText = "Star on GitHub",
}: Stats & {
  repository: string;
  title?: string;
  description?: string;
  buttonText?: string;
}) {
  return (
    <section className="container relative py-20">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            {description}
          </p>
          <div className="mt-6">
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <a
                href={`https://github.com/${repository}`}
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 438.549 438.549" className="h-5 w-5">
                  <path
                    fill="currentColor"
                    d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                  ></path>
                </svg>
                {buttonText}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
      <Separator className="mb-16" />
      <div className="max-w-4xl mx-auto">
        <OpenSourceCard
          repository={repository}
          stars={stars}
          contributors={contributors}
        />
      </div>
    </section>
  );
}

export default function OpenSource({
  repository,
  defaultStats = { stars: 0, contributors: [] },
  ...props
}: OpenSourceProps) {
  // This is a placeholder component. You should implement the data fetching
  // in your server component using the example code above.
  return (
    <OpenSourceContent
      repository={repository}
      stars={defaultStats.stars}
      contributors={defaultStats.contributors}
      {...props}
    />
  );
}
