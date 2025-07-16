"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import DisplayCards from "./display-cards";

interface LinearHeroVisualProps {
  className?: string;
  delay?: number;
  showSocialProof?: boolean;
}

export default function LinearHeroVisual({
  className,
  delay = 0.3,
  showSocialProof = true,
}: LinearHeroVisualProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {/* Main visual - Display cards */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay }}
        className="relative flex justify-center"
      >
        <DisplayCards />
      </motion.div>

      {/* Social proof */}
      {showSocialProof && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Powering the world's best product teams. From next-gen startups to established enterprises.
          </p>
          <div className="flex items-center justify-center gap-8 opacity-60">
            <div className="text-sm font-medium">Company A</div>
            <div className="text-sm font-medium">Company B</div>
            <div className="text-sm font-medium">Company C</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}