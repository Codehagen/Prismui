export interface ProDocsConfig {
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

export const proDocsConfig: ProDocsConfig = {
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/pro/docs",
          isPro: true,
        },
        {
          title: "Installation",
          href: "/pro/docs/installation",
          isPro: true,
        },
      ],
    },
    {
      title: "Pro Templates",
      items: [
        {
          title: "Portfolio",
          href: "/pro/docs/templates/portfolio",
          isPro: true,
          isNew: true,
        },
      ],
    },
    {
      title: "Pro Components",
      items: [
        {
          title: "Advanced Data Table",
          href: "/pro/docs/components/advanced-data-table",
          isPro: true,
        },
      ],
    },
  ],
} as const;