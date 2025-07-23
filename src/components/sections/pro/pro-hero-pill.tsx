"use client";

import { motion, useAnimation } from "framer-motion";
import { Icons } from "@/components/icons";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1];

export function ProHeroPill() {
  const controls = useAnimation();

  return (
    <Link href="/pro/docs" className="group">
      <motion.div
        className="inline-flex items-center gap-2 rounded-full bg-purple-50 text-purple-700 ring-1 ring-purple-600/20 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/20 px-4 py-1.5 text-sm font-medium transition-all hover:bg-purple-100 dark:hover:bg-purple-400/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        onHoverStart={() => controls.start({ rotate: -10 })}
        onHoverEnd={() => controls.start({ rotate: 0 })}
      >
        <motion.div
          className="text-purple-600 dark:text-purple-400 transition-colors"
          animate={controls}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <Icons.logo className="h-4 w-4" />
        </motion.div>
        <span>Introducing PrismUI Pro</span>
        <Icons.chevronRight className="h-4 w-4" />
      </motion.div>
    </Link>
  );
}