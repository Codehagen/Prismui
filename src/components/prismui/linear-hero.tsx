"use client";

import { cn } from "@/lib/utils";
import LinearHeroText from "./linear-hero-text";
import LinearHeroCTA from "./linear-hero-cta";
import LinearHeroVisual from "./linear-hero-visual";

interface LinearHeroProps {
  className?: string;
  headline?: string;
  subheadline?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
}

export default function LinearHero({
  className,
  headline = "Linear is a purpose-built tool for planning and building products",
  subheadline = "Meet the system for modern software development. Streamline issues, projects, and product roadmaps.",
  primaryCTA = "Start building",
  secondaryCTA = "Learn more",
}: LinearHeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center overflow-hidden pb-12",
        className
      )}
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            <LinearHeroText 
              headline={headline}
              subheadline={subheadline}
            />
            <LinearHeroCTA 
              primaryCTA={primaryCTA}
              secondaryCTA={secondaryCTA}
            />
          </div>

          {/* Right side - Visual */}
          <LinearHeroVisual showSocialProof={false} />
        </div>
        
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent pointer-events-none" />
    </section>
  );
}