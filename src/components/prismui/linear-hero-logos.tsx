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
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, opacity: 0.8 }}
            className="relative group"
          >
            <div className="w-20 h-12 bg-muted/30 rounded-lg flex items-center justify-center border border-border/30 group-hover:border-border/60 transition-all duration-300 hover:shadow-sm">
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200">
                {logo}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
