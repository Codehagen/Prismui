"use client";

import { ArrowRight, ChevronRight, Component } from "lucide-react";
import Hero from "./component/hero";
import { ProjectStatusCard } from "./component/expandable-card";

export default function HeroPage() {
  return (
    <div className="min-h-screen w-full">
      <Hero
        pill={{
          text: "✨ New Components",
          href: "/docs",
          endIcon: <ChevronRight className="h-4 w-4" />,
        }}
        content={{
          title: "Beautiful UI",
          titleHighlight: "Components",
          description:
            "A collection of beautiful and accessible UI components built with Tailwind CSS and Radix UI.",
          primaryAction: {
            href: "/docs",
            text: "Get Started",
            icon: <ArrowRight className="h-4 w-4" />,
          },
          secondaryAction: {
            href: "/docs/components",
            text: "Components",
            icon: <Component className="h-4 w-4" />,
          },
        }}
        preview={
          <ProjectStatusCard
            title="Project Status"
            progress={75}
            dueDate="2024-12-31"
            contributors={[
              { name: "John Doe", image: "/placeholder.svg" },
              { name: "Jane Smith", image: "/placeholder.svg" },
              { name: "Alex Johnson", image: "/placeholder.svg" },
            ]}
            tasks={[
              { title: "Design System", completed: true },
              { title: "Component Library", completed: true },
              { title: "Documentation", completed: false },
            ]}
            githubStars={1234}
            openIssues={5}
          />
        }
      />
    </div>
  );
}
