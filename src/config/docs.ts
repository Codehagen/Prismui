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
          title: "Portfolio",
          href: "/docs/templates/portfolio",
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Expandable Card",
          href: "/docs/components/expandable-card",
          isNew: true,
        },
        {
          title: "Floating Action Panel",
          href: "/docs/components/floating-action-panel",
        },
        {
          title: "Hero Badge",
          href: "/docs/components/hero-badge",
        },
      ],
    },
    {
      title: "Page Sections",
      items: [
        {
          title: "Hero",
          href: "/docs/sections/hero",
        },
        {
          title: "Logo Carousel",
          href: "/docs/components/logo-carousel",
        },
        {
          title: "Pricing",
          href: "/docs/sections/pricing",
          isNew: true,
          isPro: true,
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
