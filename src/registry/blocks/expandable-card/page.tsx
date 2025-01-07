"use client";

import { ProjectStatusCard } from "@/components/prismui/expandable-card";

const DEMO_DATA = [
  {
    title: "Project Analytics Dashboard",
    progress: 75,
    dueDate: "Dec 15, 2023",
    contributors: [
      { name: "Alice", image: "/avatars/alice.jpg" },
      { name: "Bob", image: "/avatars/bob.jpg" },
      { name: "Charlie", image: "/avatars/charlie.jpg" },
    ],
    tasks: [
      { title: "Design System Implementation", completed: true },
      { title: "Data Visualization Components", completed: true },
      { title: "User Authentication Flow", completed: false },
    ],
    githubStars: 128,
    openIssues: 5,
  },
  {
    title: "E-commerce Platform",
    progress: 45,
    dueDate: "Dec 20, 2023",
    contributors: [
      { name: "David", image: "/avatars/david.jpg" },
      { name: "Eve", image: "/avatars/eve.jpg" },
    ],
    tasks: [
      { title: "Shopping Cart Implementation", completed: true },
      { title: "Payment Gateway Integration", completed: false },
      { title: "Product Search Optimization", completed: false },
    ],
    githubStars: 89,
    openIssues: 8,
  },
  {
    title: "Mobile App Backend",
    progress: 90,
    dueDate: "Dec 25, 2023",
    contributors: [
      { name: "Frank", image: "/avatars/frank.jpg" },
      { name: "Grace", image: "/avatars/grace.jpg" },
      { name: "Henry", image: "/avatars/henry.jpg" },
    ],
    tasks: [
      { title: "API Documentation", completed: true },
      { title: "Performance Optimization", completed: true },
      { title: "Push Notifications", completed: true },
    ],
    githubStars: 256,
    openIssues: 2,
  },
];

export default function ExpandableCardBlock() {
  return (
    <div className="grid gap-6">
      {DEMO_DATA.map((project, index) => (
        <ProjectStatusCard key={index} {...project} />
      ))}
    </div>
  );
}
