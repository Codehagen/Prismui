import { Timeline } from "@/components/prismui/timeline";
import { Sparkles, Code, Component } from "lucide-react";

export default function TimelineModern() {
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
  );
}
