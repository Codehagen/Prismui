import { Timeline } from "@/components/prismui/timeline";
import { Sparkles, Code, Component } from "lucide-react";

export default function TimelineMinimal() {
  const items = [
    {
      date: "2024-01-07",
      title: "Modern Style",
      description: "With subtle gradients and hover effects",
      href: "#modern",
    },
    {
      date: "2024-01-05",
      title: "Minimal Style",
      description: "Clean and simple design",
      href: "#minimal",
    },
    {
      date: "2024-01-03",
      title: "With Icons",
      description: "Using Lucide icons in the timeline",
      href: "#icons",
    },
  ];

  return (
    <Timeline
      items={items}
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
  );
}
