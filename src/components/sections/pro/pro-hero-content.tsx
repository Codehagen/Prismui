"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1];

const textVariants = {
  hidden: { 
    opacity: 0, 
    filter: 'blur(12px)', 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    filter: 'blur(0px)', 
    y: 0,
    transition: {
      duration: 0.8,
      ease
    }
  }
};

const buttonGroupVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease,
      delay: 0.6
    }
  }
};

interface ProHeroContentProps {
  isAuth: boolean;
  hasPro: boolean;
}

export function ProHeroContent({ isAuth, hasPro }: ProHeroContentProps) {
  return (
    <>
      <motion.h1 
        className="mx-auto mt-8 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        Build 10x Faster with{" "}
        <span className="text-primary">PrismUI Pro</span>
      </motion.h1>
      
      <motion.p 
        className="text-muted-foreground mx-auto my-6 max-w-xl text-balance text-xl"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
      >
        Premium React components, exclusive templates, and priority support. 
        Ship professional applications faster than ever.
      </motion.p>

      <motion.div 
        className="flex items-center justify-center gap-3"
        variants={buttonGroupVariants}
        initial="hidden"
        animate="visible"
      >
        {isAuth && hasPro ? (
          <>
            <Button asChild size="lg">
              <Link href="/pro/docs">
                <span className="text-nowrap">Browse Templates</span>
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pro/components">
                <span className="text-nowrap">View Components</span>
              </Link>
            </Button>
          </>
        ) : isAuth ? (
          <>
            <Button asChild size="lg">
              <Link href="/pro/upgrade">
                <span className="text-nowrap">Upgrade to Pro</span>
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pro/docs">
                <span className="text-nowrap">Browse Docs</span>
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Button asChild size="lg">
              <Link href="/pro/login">
                <span className="text-nowrap">Start Free Trial</span>
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pro/login">
                <span className="text-nowrap">Sign In</span>
              </Link>
            </Button>
          </>
        )}
      </motion.div>
    </>
  );
}