import { Timeline } from "@/components/prismui/timeline";

export default function TimelineBasic() {
  return (
    <div className="w-full space-y-8">
      <div className="text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Wanna see some{" "}
          <span className="bg-gradient-to-br from-primary to-primary/60 bg-clip-text italic text-transparent">
            real speed?
          </span>
        </h2>
        <p className="mt-2 text-muted-foreground">
          Here&apos;s what we&apos;ve shipped recently
        </p>
      </div>
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
        className="max-w-3xl mx-auto"
        dotClassName="bg-primary/60 group-hover:bg-primary"
        titleClassName="group-hover:text-primary"
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
