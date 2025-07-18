"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

const buttonVariants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/50",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary/50",
  outline: "border border-border bg-background hover:bg-muted focus:ring-border",
  ghost: "hover:bg-muted hover:text-foreground focus:ring-muted",
};

const sizeVariants = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export default function EnhancedButton({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  loadingText,
  icon,
  iconPosition = "left",
  children,
  disabled,
  ...props
}: EnhancedButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02, y: -1 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
      className={cn(
        // Base styles
        "relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        // Enhanced shadow and depth
        "shadow-sm hover:shadow-md active:shadow-sm",
        // Variant styles
        buttonVariants[variant],
        // Size styles
        sizeVariants[size],
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {/* Loading overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-current/10 rounded-lg"
        >
          <Loader2 className="w-4 h-4 animate-spin" />
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2"
      >
        {icon && iconPosition === "left" && (
          <motion.span
            whileHover={{ x: variant === "outline" ? 2 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.span>
        )}
        
        <span>{isLoading && loadingText ? loadingText : children}</span>
        
        {icon && iconPosition === "right" && (
          <motion.span
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.span>
        )}
      </motion.div>
    </motion.button>
  );
}