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
          title: "SaaS Landing Page",
          href: "/docs/templates/saas-landing",
          isNew: true,
          isPro: true,
        },
        {
          title: "Prism Homepage",
          href: "/docs/templates/prismui-homepage",
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Display Cards",
          href: "/docs/components/display-cards",
        },
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
          title: "Popover",
          href: "/docs/components/popover",
        },
        {
          title: "Status Badge",
          href: "/docs/components/status-badge",
        },
        {
          title: "Tweet Card",
          href: "/docs/components/tweet-card",
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
        {
          title: "Enhanced Button",
          href: "/docs/components/enhanced-button",
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
