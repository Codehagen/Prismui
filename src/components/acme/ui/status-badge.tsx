"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, AlertCircle, Circle } from "lucide-react";

interface StatusBadgeProps {
  status: "completed" | "in-progress" | "pending" | "delayed";
  label: string;
  className?: string;
  animated?: boolean;
}

const statusConfig = {
  completed: {
    color: "text-green-600",
    bg: "bg-green-100 dark:bg-green-500/20",
    border: "border-green-200 dark:border-green-500/30",
    icon: CheckCircle2,
    dotColor: "bg-green-500",
  },
  "in-progress": {
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-500/20",
    border: "border-blue-200 dark:border-blue-500/30",
    icon: Clock,
    dotColor: "bg-blue-500",
  },
  pending: {
    color: "text-gray-600",
    bg: "bg-gray-100 dark:bg-gray-500/20",
    border: "border-gray-200 dark:border-gray-500/30",
    icon: Circle,
    dotColor: "bg-gray-500",
  },
  delayed: {
    color: "text-red-600",
    bg: "bg-red-100 dark:bg-red-500/20",
    border: "border-red-200 dark:border-red-500/30",
    icon: AlertCircle,
    dotColor: "bg-red-500",
  },
};

export default function StatusBadge({
  status,
  label,
  className,
  animated = true,
}: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
        config.color,
        config.bg,
        config.border,
        "hover:shadow-sm",
        className
      )}
    >
      <motion.div
        animate={animated ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <Icon className="w-3 h-3" />
        {animated && status === "in-progress" && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={cn("absolute inset-0 rounded-full", config.dotColor)}
          />
        )}
      </motion.div>
      <span>{label}</span>
    </motion.div>
  );
}