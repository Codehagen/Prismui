export interface DocsConfig {
  sidebarNav: {
    title: string;
    items: {
      title: string;
      href: string;
      disabled?: boolean;
      isNew?: boolean;
      isPro?: boolean;
    }[];
  }[];
}

export const docsConfig: DocsConfig = {
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
        {
          title: "Installation",
          href: "/docs/installation",
        },
      ],
    },
    {
      title: "Templates",
      items: [
        {
          title: "Prism Homepage",
          href: "/docs/templates/prismui-homepage",
          isNew: true,
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Expandable Card",
          href: "/docs/components/expandable-card",
        },
        {
          title: "Floating Action Panel",
          href: "/docs/components/floating-action-panel",
        },
        {
          title: "Hero Badge",
          href: "/docs/components/hero-badge",
        },
        {
          title: "Display Cards",
          href: "/docs/components/display-cards",
        },
        {
          title: "Popover",
          href: "/docs/components/popover",
          isNew: true,
        },
        {
          title: "Tweet Card",
          href: "/docs/components/tweet-card",
          isNew: true,
        },
      ],
    },
    {
      title: "Page Sections",
      items: [
        {
          title: "Hero",
          href: "/docs/components/hero",
        },
        {
          title: "Open Source",
          href: "/docs/components/open-source",
        },
        {
          title: "Logo Carousel",
          href: "/docs/components/logo-carousel",
        },
        {
          title: "Pricing",
          href: "/docs/sections/pricing",
        },
        {
          title: "Timeline",
          href: "/docs/components/timeline",
          isNew: true,
        },
      ],
    },
    {
      title: "Buttons",
      items: [
        {
          title: "Action Button",
          href: "/docs/components/action-button",
        },
        {
          title: "Button Group",
          href: "/docs/components/button-group",
        },
      ],
    },

    {
      title: "Text Animations",
      items: [
        {
          title: "Word Reveal",
          href: "/docs/components/word-reveal",
        },
        {
          title: "Number Flow",
          href: "/docs/components/number-flow",
        },
      ],
    },
  ],
} as const;
