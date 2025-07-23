"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1];

const showcaseVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    filter: 'blur(12px)'
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      delay: 0.8,
      ease
    }
  }
};

export function ProProductShowcase() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      variants={showcaseVariants}
      initial="hidden"
      animate="visible"
      className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20"
    >
      {/* Gradient overlay for fade effect */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-gradient-to-b from-transparent from-35% to-background pointer-events-none" 
      />
      
      {/* Main showcase container */}
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border bg-background p-4 shadow-2xl ring-1 ring-border/50 backdrop-blur-sm">
        <div className="relative overflow-hidden rounded-xl bg-muted">
          {/* Loading state */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          )}
          
          {/* Video element */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onLoadedData={() => setIsLoaded(true)}
            className={cn(
              "w-full aspect-video object-cover rounded-xl transition-opacity duration-500",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            poster="/images/prismui-pro-poster.jpg"
            aria-label="PrismUI Pro component demonstration video"
          >
            <source src="/video/prismui-homepage.mp4" type="video/mp4" />
            
            {/* Fallback for browsers that don't support video */}
            <div className="flex items-center justify-center h-full bg-muted">
              <div className="text-center">
                <div className="text-lg font-semibold mb-2">PrismUI Pro Demo</div>
                <div className="text-sm text-muted-foreground">
                  Your browser doesn't support video playback.
                </div>
              </div>
            </div>
          </video>
          
          {/* Optional overlay for branding */}
          { isLoaded && (
            <div className="absolute top-4 left-4">
              <div className="bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm font-medium border">
                PrismUI Pro
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom fade effect */}
      <div 
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" 
      />
    </motion.div>
  );
}