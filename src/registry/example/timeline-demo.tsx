import { Timeline } from "@/components/prismui/timeline";
import { Card } from "@/components/ui/card";
import { Sparkles, Code, Component } from "lucide-react";

export default function TimelineDemo() {
  const items = [
    {
      date: "2024-01-07",
      title: "Modern Style",
      description: "With gradient dots and hover effects",
      href: "#modern",
      icon: <Sparkles className="text-white" />,
    },
    {
      date: "2024-01-05",
      title: "Minimal Style",
      description: "Clean and simple design",
      href: "#minimal",
      icon: <Code className="text-white" />,
    },
    {
      date: "2024-01-03",
      title: "With Icons",
      description: "Using Lucide icons in the timeline",
      href: "#icons",
      icon: <Component className="text-white" />,
    },
  ];

  return (
    <div className="grid gap-8">
      {/* Modern Style */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Modern Style</h3>
        <Timeline
          items={items}
          initialCount={2}
          dotClassName="bg-gradient-to-tr from-blue-500 to-purple-500 h-3 w-3 group-hover:scale-125 transition-transform"
          lineClassName="border-l-2 border-dashed"
          titleClassName="font-medium text-blue-500 dark:text-blue-400"
          dateClassName="text-purple-500 dark:text-purple-400"
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
        <h3 className="font-semibold mb-4">Minimal Style</h3>
        <Timeline
          items={items.map((item) => ({ ...item, icon: undefined }))}
          initialCount={2}
          dotClassName="bg-foreground/20 group-hover:bg-foreground h-2 w-2"
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
      description: "With gradient dots and hover effects",
      href: "#modern",
      icon: <Sparkles className="text-white" />,
    },
    {
      date: "2024-01-05",
      title: "Minimal Style",
      description: "Clean and simple design",
      href: "#minimal",
      icon: <Code className="text-white" />,
    },
    {
      date: "2024-01-03",
      title: "With Icons",
      description: "Using Lucide icons in the timeline",
      href: "#icons",
      icon: <Component className="text-white" />,
    },
  ]

  return (
    <div className="grid gap-8">
      {/* Modern Style */}
      <Timeline
        items={items}
        dotClassName="bg-gradient-to-tr from-blue-500 to-purple-500 h-3 w-3 group-hover:scale-125 transition-transform"
        lineClassName="border-l-2 border-dashed"
        titleClassName="font-medium text-blue-500 dark:text-blue-400"
        dateClassName="text-purple-500 dark:text-purple-400"
        buttonVariant="outline"
        buttonSize="sm"
        showMoreText="Load More"
        showLessText="Show Less"
      />

      {/* Minimal Style */}
      <Timeline
        items={items.map(item => ({ ...item, icon: undefined }))}
        dotClassName="bg-foreground/20 group-hover:bg-foreground h-2 w-2"
        lineClassName="border-l border-border/50"
        titleClassName="font-normal"
        dateClassName="font-light"
        buttonVariant="ghost"
        buttonSize="sm"
      />
    </div>
  )
}`;
