"use client";

import WordReveal from "@/components/prismui/word-reveal";

export default function WordRevealDemo() {
  return (
    <div className="space-y-12">
      {/* Basic Example */}
      <div className="p-8 rounded-lg bg-gradient-to-br from-background to-muted">
        <WordReveal text="Animate text with style" />
      </div>
    </div>
  );
}

// Export the source code as a string for the registry
export const demoSource = `"use client";

import WordReveal from "@/components/prismui/word-reveal";

export default function WordRevealDemo() {
  return (
    <div className="space-y-12">
      {/* Basic Example */}
      <div className="p-8 rounded-lg bg-gradient-to-br from-background to-muted">
        <WordReveal text="Animate text with style" />
      </div>

      {/* Custom Delay Example */}
      <div className="p-8 rounded-lg bg-gradient-to-br from-primary to-primary/50">
        <WordReveal 
          text="Slower animation with custom delay" 
          delay={0.3}
          className="text-primary-foreground"
        />
      </div>

      {/* Custom Styling Example */}
      <div className="p-8 rounded-lg bg-gradient-to-br from-secondary to-secondary/50">
        <WordReveal 
          text="Custom styled animation" 
          className="text-2xl md:text-4xl font-light text-secondary-foreground"
        />
      </div>
    </div>
  );
}`;
