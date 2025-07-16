"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface LinearHeroCTAProps {
  className?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  delay?: number;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function LinearHeroCTA({
  className,
  primaryCTA = "Start building",
  secondaryCTA = "Learn more",
  delay = 0.2,
  onPrimaryClick,
  onSecondaryClick,
}: LinearHeroCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={cn("flex flex-col sm:flex-row gap-4", className)}
    >
      <Button 
        size="lg" 
        className="bg-primary hover:bg-primary/90"
        onClick={onPrimaryClick}
      >
        {primaryCTA}
      </Button>
      <Button 
        size="lg" 
        variant="outline"
        onClick={onSecondaryClick}
      >
        {secondaryCTA}
      </Button>
    </motion.div>
  );
}