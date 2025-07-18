"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroTextProps {
  className?: string;
  headline?: string;
  subheadline?: string;
  delay?: number;
}

export default function HeroText({
  className,
  headline = "Acme is the all-in-one platform for modern product teams",
  subheadline = "Streamline your workflow from idea to launch with powerful tools built for collaboration.",
  delay = 0,
}: HeroTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={cn("space-y-6", className)}
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
        <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
          {headline.split(' ').slice(0, 4).join(' ')}
        </span>
        <br />
        <span className="bg-gradient-to-r from-foreground/90 to-foreground/70 bg-clip-text text-transparent">
          {headline.split(' ').slice(4).join(' ')}
        </span>
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
        {subheadline}
      </p>
    </motion.div>
  );
}