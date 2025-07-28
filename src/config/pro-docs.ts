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
          title: "SaaS Landing",
          href: "/pro/docs/templates/saas-landing",
          isPro: true,
          isNew: true,
        },
        {
          title: "PrismUI Homepage",
          href: "/pro/docs/templates/prismui-homepage",
        },
      ],
    },
  ],
} as const;
