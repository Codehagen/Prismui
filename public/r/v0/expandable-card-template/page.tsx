"use client";

import { ProjectStatusCard } from "./component/expandable-card";

export default function ExpandableCardPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 gap-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Project Status Card
        </h1>
        <p className="text-muted-foreground">
          An expandable card component for displaying project information.
        </p>
      </div>

      <div className="w-full max-w-md">
        <ProjectStatusCard
          title="Project 1"
          progress={50}
          dueDate="2025-01-01"
          contributors={[
            { name: "John Doe", image: "/placeholder.svg" },
            { name: "Jane Smith", image: "/placeholder.svg" },
          ]}
          tasks={[
            { title: "Setup project structure", completed: true },
            { title: "Implement core features", completed: false },
            { title: "Write documentation", completed: false },
          ]}
          githubStars={100}
          openIssues={5}
        />
      </div>
    </div>
  );
}
