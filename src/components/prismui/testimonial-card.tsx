"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-primary/20 text-primary p-1 py-0.5 font-bold",
        className
      )}
    >
      {children}
    </motion.span>
  );
};

export interface TestimonialCardProps {
  name: string;
  role: string;
  description: React.ReactNode;
  rating?: number;
  img?: string;
  className?: string;
  variant?: "minimal" | "modern" | "tweet";
  [key: string]: any;
}

export function TestimonialCard({
  description,
  name,
  role,
  rating = 5,
  img,
  className,
  variant = "minimal",
  ...props
}: TestimonialCardProps) {
  if (variant === "tweet") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={cn(
            "group relative overflow-hidden rounded-xl bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/50 transition-all duration-200 hover:shadow-lg",
            "min-h-[8rem]",
            className
          )}
          {...props}
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {img && (
                  <div className="overflow-hidden rounded-full border border-gray-200/50 bg-gradient-to-br from-white to-gray-50 transition-all">
                    <div className="relative h-8 w-8">
                      <Image
                        alt={name}
                        src={img}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
                <div>
                  <div className="flex items-center font-semibold text-foreground transition-colors">
                    {name}
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-muted-foreground">
                      {role}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-2 mt-2 whitespace-pre-wrap text-sm text-foreground">
              {description}
            </div>

            <div className="mt-2 flex items-center justify-start space-x-8 opacity-75 transition-opacity group-hover:opacity-100">
              <div className="inline-flex items-center gap-1.5 text-muted-foreground/60">
                <Star className="h-3 w-3 text-yellow-500" />
                <span className="text-xs font-medium">{rating}.0</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "modern") {
    return (
      <div
        className={cn(
          "mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4",
          "border border-neutral-200 bg-white",
          "dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
          className
        )}
        {...props}
      >
        <div className="select-none text-sm font-normal text-neutral-700 dark:text-neutral-400">
          {description}
          <div className="flex flex-row py-1">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} className="size-4 text-yellow-500" />
            ))}
          </div>
        </div>

        <div className="flex w-full select-none items-center justify-start gap-5">
          {img && (
            <Image
              src={img}
              alt={name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full ring-1 ring-border ring-offset-4"
            />
          )}
          <div>
            <p className="font-medium text-neutral-500">{name}</p>
            <p className="text-xs font-normal text-neutral-400">{role}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex w-72 shrink-0 cursor-pointer snap-center snap-always flex-col justify-between rounded-xl p-6",
        "border bg-card text-card-foreground shadow-lg",
        className
      )}
      {...props}
    >
      <div className="select-none space-y-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-normal text-muted-foreground"
        >
          {description}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="select-none space-y-2"
        >
          <div className="flex flex-row gap-0.5">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} className="size-4 text-yellow-500" />
            ))}
          </div>
          <div>
            <p className="font-medium text-foreground">{name}</p>
            <p className="text-sm font-normal text-muted-foreground">{role}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export interface TestimonialSectionProps {
  testimonials: TestimonialCardProps[];
  className?: string;
  variant?: "grid" | "scroll";
  autoScroll?: boolean;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  repeat?: number;
  columns?: 2 | 3 | 4;
}

export function TestimonialSection({
  testimonials,
  className,
  variant = "scroll",
  autoScroll = false,
  direction = "right",
  pauseOnHover = true,
  repeat = 2,
  columns = 3,
}: TestimonialSectionProps) {
  return (
    <section className={cn("py-14", className)}>
      <div className="mx-auto md:container md:px-8">
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm font-semibold text-muted-foreground"
        >
          TESTIMONIALS
        </motion.h3>
        {variant === "grid" ? (
          <div className="relative mt-6 max-h-[700px] overflow-hidden py-14">
            <div
              className={cn("gap-4", {
                "md:columns-2": columns === 2,
                "md:columns-2 xl:columns-3": columns === 3,
                "md:columns-2 xl:columns-3 2xl:columns-4": columns === 4,
              })}
            >
              {testimonials.map((card, idx) => (
                <TestimonialCard key={idx} variant="modern" {...card} />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 w-full bg-gradient-to-t from-background from-20%" />
          </div>
        ) : (
          <div className="relative mx-auto mt-6 max-w-[100vw] overflow-hidden">
            {autoScroll ? (
              <div
                className={cn(
                  "group flex overflow-hidden py-14 [--duration:40s] [--gap:1.5rem] [gap:var(--gap)]"
                )}
              >
                {Array(repeat)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex shrink-0 justify-around [gap:var(--gap)]",
                        "animate-testimonial-scroll",
                        direction === "right" &&
                          "[animation-direction:reverse]",
                        pauseOnHover &&
                          "group-hover:[animation-play-state:paused]"
                      )}
                    >
                      {testimonials.map((card, idx) => (
                        <TestimonialCard
                          key={idx}
                          variant="minimal"
                          {...card}
                        />
                      ))}
                    </div>
                  ))}
              </div>
            ) : (
              <div
                className={cn(
                  "flex snap-x snap-mandatory gap-6 overflow-x-auto py-14",
                  "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                )}
              >
                <div className="size-72 shrink-0 md:h-60 md:min-w-96" />
                {testimonials.map((card, idx) => (
                  <TestimonialCard key={idx} variant="minimal" {...card} />
                ))}
                <div className="size-72 shrink-0 md:h-60 md:min-w-96" />
              </div>
            )}
            {!autoScroll && (
              <>
                <div className="pointer-events-none absolute inset-y-0 left-0 hidden h-full w-1/5 bg-gradient-to-r from-background md:block" />
                <div className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-1/5 bg-gradient-to-l from-background md:block" />
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
