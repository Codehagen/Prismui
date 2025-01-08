"use client";

import { Sparkles } from "lucide-react";
import DisplayCards from "./component/display-cards";

export default function DisplayCardsPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 gap-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Display Cards</h1>
        <p className="text-muted-foreground">
          A collection of animated display cards with hover effects.
        </p>
      </div>

      <div className="w-full flex justify-center items-center pt-20">
        <DisplayCards
          cards={[
            {
              icon: <Sparkles className="size-4 text-blue-300" />,
              title: "Featured",
              description: "Discover amazing content",
              date: "Just now",
              iconClassName: "text-blue-500",
              titleClassName: "text-blue-500",
              className:
                "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
            },
            {
              icon: <Sparkles className="size-4 text-blue-300" />,
              title: "Popular",
              description: "Trending this week",
              date: "2 days ago",
              iconClassName: "text-blue-500",
              titleClassName: "text-blue-500",
              className:
                "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
            },
            {
              icon: <Sparkles className="size-4 text-blue-300" />,
              title: "New",
              description: "Latest updates and features",
              date: "Today",
              iconClassName: "text-blue-500",
              titleClassName: "text-blue-500",
              className:
                "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
            },
          ]}
        />
      </div>
    </div>
  );
}
