import { ProjectStatusCard } from "@/components/prismui/expandable-card";

export default function ExpandableCardDemo() {
  return (
    <div className="grid place-items-center gap-4 md:grid-cols-2">
      <ProjectStatusCard
        title="Design System"
        progress={100}
        dueDate="Dec 31, 2023"
        contributors={[
          { name: "Emma" },
          { name: "John" },
          { name: "Lisa" },
          { name: "David" },
        ]}
        tasks={[
          { title: "Create Component Library", completed: true },
          { title: "Implement Design Tokens", completed: true },
          { title: "Write Style Guide", completed: true },
          { title: "Set up Documentation", completed: true },
        ]}
        githubStars={256}
        openIssues={0}
      />

      <ProjectStatusCard
        title="Analytics Dashboard"
        progress={45}
        dueDate="Mar 1, 2024"
        contributors={[
          { name: "Michael" },
          { name: "Sophie" },
          { name: "James" },
        ]}
        tasks={[
          { title: "Design Dashboard Layout", completed: true },
          { title: "Implement Data Fetching", completed: true },
          { title: "Create Visualization Components", completed: false },
          { title: "Add Export Features", completed: false },
          { title: "User Testing", completed: false },
        ]}
        githubStars={89}
        openIssues={8}
      />
    </div>
  );
}

export const demoSource = `import { ProjectStatusCard } from "@/components/prismui/expandable-card"

export default function ExpandableCardDemo() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ProjectStatusCard
        title="Design System"
        progress={100}
        dueDate="Dec 31, 2023"
        contributors={[
          { name: "Emma" },
          { name: "John" },
          { name: "Lisa" },
          { name: "David" }
        ]}
        tasks={[
          { title: "Create Component Library", completed: true },
          { title: "Implement Design Tokens", completed: true },
          { title: "Write Style Guide", completed: true },
          { title: "Set up Documentation", completed: true }
        ]}
        githubStars={256}
        openIssues={0}
      />

      <ProjectStatusCard
        title="Analytics Dashboard"
        progress={45}
        dueDate="Mar 1, 2024"
        contributors={[
          { name: "Michael" },
          { name: "Sophie" },
          { name: "James" }
        ]}
        tasks={[
          { title: "Design Dashboard Layout", completed: true },
          { title: "Implement Data Fetching", completed: true },
          { title: "Create Visualization Components", completed: false },
          { title: "Add Export Features", completed: false },
          { title: "User Testing", completed: false }
        ]}
        githubStars={89}
        openIssues={8}
      />
    </div>
  )
}`;
