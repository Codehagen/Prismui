import { Timeline } from "@/components/prismui/timeline";

export default function TimelineBasic() {
  return (
    <div className="w-full place-items-center grid">
      <Timeline
        items={[
          {
            date: "2024-01-07",
            title: "Tweet Card",
            description: "New component added to the library",
            href: "/docs/components/tweet-card",
          },
          {
            date: "2024-01-05",
            title: "Popover",
            description: "New component added to the library",
            href: "/docs/components/popover",
          },
          {
            date: "2024-01-03",
            title: "NumberFlow",
            description: "New component added to the library",
            href: "/docs/components/number-flow",
          },
          {
            date: "2024-01-02",
            title: "Action Button",
            description: "New component added to the library",
            href: "/docs/components/action-button",
          },
          {
            date: "2024-01-02",
            title: "Button Group",
            description: "New component added to the library",
            href: "/docs/components/button-group",
          },
          {
            date: "2024-01-01",
            title: "Display Cards",
            description: "New component added to the library",
            href: "/docs/components/display-cards",
          },
          {
            date: "2024-01-01",
            title: "Hero Badge",
            description: "New component added to the library",
            href: "/docs/components/hero-badge",
          },
          {
            date: "2023-12-31",
            title: "Logo Carousel",
            description: "New component added to the library",
            href: "/docs/components/logo-carousel",
          },
        ]}
        initialCount={3}
        showMoreText="Show More Components"
        showLessText="Show Less Components"
        className="max-w-3xl"
      />
    </div>
  );
}

export const demoSource = `import { Timeline } from "@/components/prismui/timeline"

export default function TimelineBasic() {
  return (
    <Timeline
      items={[
        {
          date: "2024-01-07",
          title: "Tweet Card",
          description: "New component added to the library",
          href: "/docs/components/tweet-card"
        },
        {
          date: "2024-01-05",
          title: "Popover",
          description: "New component added to the library",
          href: "/docs/components/popover"
        },
        {
          date: "2024-01-03",
          title: "NumberFlow",
          description: "New component added to the library",
          href: "/docs/components/number-flow"
        }
      ]}
      initialCount={3}
      showMoreText="Show More Components"
      showLessText="Show Less Components"
      className="max-w-3xl"
    />
  )
}`;
