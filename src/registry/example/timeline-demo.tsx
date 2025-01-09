import { Timeline } from "@/components/prismui/timeline";
import { Card } from "@/components/ui/card";
import { Sparkles, Code, Component } from "lucide-react";

export default function TimelineDemo() {
  const items = [
    {
      date: "2024-01-07",
      title: "Modern Style",
      description: "With subtle gradients and hover effects",
      href: "#modern",
      icon: <Sparkles className="h-3 w-3" />,
    },
    {
      date: "2024-01-05",
      title: "Minimal Style",
      description: "Clean and simple design",
      href: "#minimal",
      icon: <Code className="h-3 w-3" />,
    },
    {
      date: "2024-01-03",
      title: "With Icons",
      description: "Using Lucide icons in the timeline",
      href: "#icons",
      icon: <Component className="h-3 w-3" />,
    },
  ];

  return (
    <div className="grid gap-8">
      {/* Modern Style */}
      <Card className="p-6">
        <h3 className="mb-4 font-semibold">Modern Style</h3>
        <Timeline
          items={items}
          initialCount={2}
          dotClassName="bg-gradient-to-b from-background to-muted ring-1 ring-border group-hover:ring-primary group-hover:bg-gradient-to-b group-hover:from-muted group-hover:to-muted/50 transition-all duration-300"
          lineClassName="border-l border-border"
          titleClassName="font-medium text-foreground/90 group-hover:text-primary transition-colors duration-300"
          dateClassName="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300"
          descriptionClassName="text-muted-foreground/80"
          buttonVariant="outline"
          buttonSize="sm"
          showMoreText="Load More"
          showLessText="Show Less"
          animationDuration={0.4}
          animationDelay={0.15}
        />
      </Card>

      {/* Minimal Style */}
      <Card className="p-6">
        <h3 className="mb-4 font-semibold">Minimal Style</h3>
        <Timeline
          items={items.map((item) => ({ ...item, icon: undefined }))}
          initialCount={2}
          dotClassName="bg-muted-foreground/20 group-hover:bg-muted-foreground/40 h-2 w-2 transition-colors duration-300"
          lineClassName="border-l border-border/50"
          titleClassName="font-normal"
          dateClassName="font-light"
          buttonVariant="ghost"
          buttonSize="sm"
          showMoreText="View More"
          showLessText="View Less"
          animationDuration={0.3}
          animationDelay={0.1}
        />
      </Card>
    </div>
  );
}

export const demoSource = `import { Timeline } from "@/components/prismui/timeline"
import { Sparkles, Code, Component } from "lucide-react"

export default function TimelineDemo() {
  const items = [
    {
      date: "2024-01-07",
      title: "Modern Style",
      description: "With subtle gradients and hover effects",
      href: "#modern",
      icon: <Sparkles className="h-3 w-3" />,
    },
    {
      date: "2024-01-05",
      title: "Minimal Style",
      description: "Clean and simple design",
      href: "#minimal",
      icon: <Code className="h-3 w-3" />,
    },
    {
      date: "2024-01-03",
      title: "With Icons",
      description: "Using Lucide icons in the timeline",
      href: "#icons",
      icon: <Component className="h-3 w-3" />,
    },
  ]

  return (
    <div className="grid gap-8">
      {/* Modern Style */}
      <Timeline
        items={items}
        dotClassName="bg-gradient-to-b from-background to-muted ring-1 ring-border group-hover:ring-primary group-hover:bg-gradient-to-b group-hover:from-muted group-hover:to-muted/50 transition-all duration-300"
        lineClassName="border-l border-border"
        titleClassName="font-medium text-foreground/90 group-hover:text-primary transition-colors duration-300"
        dateClassName="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300"
        descriptionClassName="text-muted-foreground/80"
        buttonVariant="outline"
        buttonSize="sm"
      />

      {/* Minimal Style */}
      <Timeline
        items={items.map(item => ({ ...item, icon: undefined }))}
        dotClassName="bg-muted-foreground/20 group-hover:bg-muted-foreground/40 h-2 w-2 transition-colors duration-300"
        lineClassName="border-l border-border/50"
        titleClassName="font-normal"
        dateClassName="font-light"
        buttonVariant="ghost"
        buttonSize="sm"
      />
    </div>
  )
}`;
