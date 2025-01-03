"use client";

import { motion, useAnimation } from "framer-motion";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ComponentPreview } from "./component-preview";
import { useEffect } from "react";

const ease = [0.16, 1, 0.3, 1];

function HeroPill() {
  const controls = useAnimation();

  return (
    <Link href="/docs" className="group">
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
          <Icons.logo className="h-4 w-4" />
        </motion.div>
        <span>New! PrismUI Components</span>
        <Icons.chevronRight className="h-4 w-4" />
      </motion.div>
    </Link>
  );
}

function HeroContent() {
  return (
    <div className="flex flex-col space-y-4">
      <motion.h1
        className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        The better way to <span className="text-primary">build apps fast</span>
      </motion.h1>
      <motion.p
        className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8, ease }}
      >
        A fully customizable component library built on top of shadcn/ui.
        Beautiful, accessible, and ready for production.
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row gap-4 pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease }}
      >
        <Link
          href="/docs"
          className={cn(
            buttonVariants({ size: "lg" }),
            "gap-2 w-full sm:w-auto justify-center"
          )}
        >
          <Icons.book className="h-4 w-4" />
          Documentation
        </Link>
        <Link
          href="/docs"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "gap-2 w-full sm:w-auto justify-center"
          )}
        >
          <Icons.component className="h-4 w-4" />
          Components
        </Link>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <div className="container relative overflow-hidden">
      <div className="flex min-h-[calc(100vh-64px)] flex-col lg:flex-row items-center py-8 px-4 md:px-8 lg:px-12">
        <div className="flex flex-col gap-4 w-full lg:max-w-2xl">
          <HeroPill />
          <HeroContent />
        </div>
        <div className="w-full lg:max-w-xl lg:pl-16 mt-12 lg:mt-0">
          <ComponentPreview />
        </div>
      </div>
    </div>
  );
}
