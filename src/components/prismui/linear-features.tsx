"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface FeatureCard {
  title: string;
  visual: React.ReactNode;
  description?: string;
}

interface LinearFeaturesProps {
  className?: string;
  headline?: string;
  description?: string;
  ctaText?: string;
  features?: FeatureCard[];
}

const defaultFeatures: FeatureCard[] = [
  {
    title: "Purpose-built for product development",
    visual: (
      <div className="w-full h-64 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center">
        <div className="text-muted-foreground">Product Interface</div>
      </div>
    ),
  },
  {
    title: "Designed to move fast",
    visual: (
      <div className="w-full h-64 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center relative">
        <div className="text-muted-foreground">50ms</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-foreground to-transparent opacity-20"></div>
        </div>
      </div>
    ),
  },
  {
    title: "Crafted to perfection",
    visual: (
      <div className="w-full h-64 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center">
        <div className="text-muted-foreground">Create</div>
      </div>
    ),
  },
];

export default function LinearFeatures({
  className,
  headline = "Made for modern product teams",
  description = "Linear is shaped by the practices and principles that distinguish world-class product teams from the rest: relentless focus, fast execution, and a commitment to the quality of craft.",
  ctaText = "Make the switch",
  features = defaultFeatures,
}: LinearFeaturesProps) {
  return (
    <section className={cn("relative py-24 bg-gradient-to-b from-muted/20 to-background overflow-hidden", className)}>
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              {headline}
            </h2>
          </motion.div>

          {/* Right side - Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
            <button className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors">
              <span className="font-medium">{ctaText}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <div className="relative bg-muted/50 rounded-2xl p-6 border border-border hover:border-border/80 transition-all duration-300 h-full flex flex-col">
                {/* Visual */}
                <div className="mb-6 flex-1">
                  {feature.visual}
                </div>

                {/* Title and Plus Icon */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                    {feature.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-border/80 transition-colors">
                    <Plus className="w-4 h-4 text-muted-foreground group-hover:text-muted-foreground/80" />
                  </div>
                </div>

                {feature.description && (
                  <p className="mt-4 text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}