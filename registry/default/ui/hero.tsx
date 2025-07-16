"use client";

import { motion, useAnimation } from "framer-motion";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ComponentPreview } from "@/components/sections/component-preview";
import { useEffect } from "react";

const ease = [0.16, 1, 0.3, 1];

interface HeroPillProps {
  href?: string;
  text: string;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

function HeroPill({ href, text, icon, endIcon }: HeroPillProps) {
  const controls = useAnimation();

  return (
    <Link href={href || "/docs"} className="group">
      <motion.div
        className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm transition-colors hover:bg-muted"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        onHoverStart={() => controls.start({ rotate: -10 })}
        onHoverEnd={() => controls.start({ rotate: 0 })}
      >
        <motion.div
          className="text-foreground/60 transition-colors group-hover:text-primary"
          animate={controls}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          {icon || <Icons.logo className="h-4 w-4" />}
        </motion.div>
        <span>{text}</span>
        {endIcon || <Icons.chevronRight className="h-4 w-4" />}
      </motion.div>
    </Link>
  );
}

interface HeroContentProps {
  title: string;
  titleHighlight?: string;
  description: string;
  primaryAction?: {
    href: string;
    text: string;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    href: string;
    text: string;
    icon?: React.ReactNode;
  };
}

function HeroContent({
  title,
  titleHighlight,
  description,
  primaryAction,
  secondaryAction,
}: HeroContentProps) {
  return (
    <div className="flex flex-col space-y-4">
      <motion.h1
        className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        {title}{" "}
        {titleHighlight && (
          <span className="text-primary">{titleHighlight}</span>
        )}
      </motion.h1>
      <motion.p
        className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8, ease }}
      >
        {description}
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row gap-4 pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease }}
      >
        {primaryAction && (
          <Link
            href={primaryAction.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              "gap-2 w-full sm:w-auto justify-center"
            )}
          >
            {primaryAction.icon}
            {primaryAction.text}
          </Link>
        )}
        {secondaryAction && (
          <Link
            href={secondaryAction.href}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "gap-2 w-full sm:w-auto justify-center"
            )}
          >
            {secondaryAction.icon}
            {secondaryAction.text}
          </Link>
        )}
      </motion.div>
    </div>
  );
}

interface HeroProps {
  pill?: {
    href?: string;
    text: string;
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
  };
  content: HeroContentProps;
  preview?: React.ReactNode;
}

export default function Hero({ pill, content, preview }: HeroProps) {
  return (
    <div className="container relative overflow-hidden">
      <div className="flex min-h-[calc(100vh-64px)] flex-col lg:flex-row items-center py-8 px-4 md:px-8 lg:px-12">
        <div className="flex flex-col gap-4 w-full lg:max-w-2xl">
          {pill && <HeroPill {...pill} />}
          <HeroContent {...content} />
        </div>
        {preview && (
          <div className="w-full lg:max-w-xl lg:pl-16 mt-12 lg:mt-0">
            {preview}
          </div>
        )}
      </div>
    </div>
  );
}
