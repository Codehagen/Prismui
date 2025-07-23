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
        {
          title: "Admin Dashboard",
          href: "/pro/docs/templates/admin-dashboard",
          isPro: true,
        },
        {
          title: "Analytics Platform",
          href: "/pro/docs/templates/analytics-platform",
          isPro: true,
        },
        {
          title: "E-commerce Backend",
          href: "/pro/docs/templates/ecommerce-backend",
          isPro: true,
        },
        {
          title: "SaaS Application",
          href: "/pro/docs/templates/saas-application",
          isPro: true,
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