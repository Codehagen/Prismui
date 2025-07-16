"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LinearHeroLogosProps {
  className?: string;
  description?: string;
  logos?: string[];
  delay?: number;
}

export default function LinearHeroLogos({
  className,
  description = "Powering the world's best product teams. From next-gen startups to established enterprises.",
  logos = ["Company A", "Company B", "Company C"],
  delay = 0.4,
}: LinearHeroLogosProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={cn("text-center -mt-8 py-8", className)}
    >
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="flex items-center justify-center gap-8 opacity-60">
        {logos.map((logo, index) => (
          <div key={index} className="text-sm font-medium">
            {logo}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
