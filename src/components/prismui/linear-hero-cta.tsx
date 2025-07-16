"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, Play } from "lucide-react";
import EnhancedButton from "./enhanced-button";

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
  const [primaryLoading, setPrimaryLoading] = useState(false);
  const [secondaryLoading, setSecondaryLoading] = useState(false);

  const handlePrimaryClick = async () => {
    setPrimaryLoading(true);
    try {
      await onPrimaryClick?.();
    } finally {
      // Simulate async action
      setTimeout(() => setPrimaryLoading(false), 2000);
    }
  };

  const handleSecondaryClick = async () => {
    setSecondaryLoading(true);
    try {
      await onSecondaryClick?.();
    } finally {
      setTimeout(() => setSecondaryLoading(false), 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={cn("flex flex-col sm:flex-row gap-4", className)}
    >
      <EnhancedButton
        size="lg"
        variant="primary"
        isLoading={primaryLoading}
        loadingText="Starting..."
        icon={<ArrowRight className="w-4 h-4" />}
        iconPosition="right"
        onClick={handlePrimaryClick}
        className="min-w-[140px]"
      >
        {primaryCTA}
      </EnhancedButton>
      
      <EnhancedButton
        size="lg"
        variant="outline"
        isLoading={secondaryLoading}
        loadingText="Loading..."
        icon={<Play className="w-4 h-4" />}
        iconPosition="left"
        onClick={handleSecondaryClick}
        className="min-w-[140px]"
      >
        {secondaryCTA}
      </EnhancedButton>
    </motion.div>
  );
}