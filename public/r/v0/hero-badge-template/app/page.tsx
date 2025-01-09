"use client";

import { Github, ArrowRight } from "lucide-react";
import HeroBadge from "./component/hero-badge";

export default function HeroBadgePage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 gap-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Hero Badge</h1>
        <p className="text-muted-foreground">
          A beautiful animated badge component for hero sections.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <HeroBadge
          href="#"
          text="Star on GitHub"
          icon={<Github className="h-4 w-4" />}
          variant="default"
          size="md"
        />

        <HeroBadge
          href="#"
          text="Get Started"
          endIcon={<ArrowRight className="h-4 w-4" />}
          variant="outline"
          size="lg"
        />

        <HeroBadge text="New Release" variant="ghost" size="sm" />
      </div>
    </div>
  );
}
