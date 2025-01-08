import { ProjectStatusCard } from "@/components/prismui/expandable-card";

export default function ExpandableCardBasic() {
  return (
    <div className=" w-full place-items-center grid">
      <ProjectStatusCard
      title="UI Component Library"
      progress={75}
      dueDate="Jan 15, 2024"
      contributors={[{ name: "Sarah" }, { name: "Mike" }, { name: "Alex" }]}
      tasks={[
        { title: "Update Button Components", completed: true },
        { title: "Add Dark Mode Support", completed: true },
        { title: "Write Documentation", completed: false },
      ]}
      githubStars={128}
      openIssues={5}
    />
    </div>
  );
}

export const demoSource = `import { ProjectStatusCard } from "@/components/prismui/expandable-card"

export default function ExpandableCardBasic() {
  return (
    <ProjectStatusCard
      title="UI Component Library"
      progress={75}
      dueDate="Jan 15, 2024"
      contributors={[
        { name: "Sarah" },
        { name: "Mike" },
        { name: "Alex" }
      ]}
      tasks={[
        { title: "Update Button Components", completed: true },
        { title: "Add Dark Mode Support", completed: true },
        { title: "Write Documentation", completed: false }
      ]}
      githubStars={128}
      openIssues={5}
    />
  )
}`;
