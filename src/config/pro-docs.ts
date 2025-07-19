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
      title: "Pro Components",
      items: [
        {
          title: "Advanced Data Table",
          href: "/pro/docs/components/advanced-data-table",
          isPro: true,
          isNew: true,
        },
        {
          title: "Data Grid",
          href: "/pro/docs/components/data-grid",
          isPro: true,
        },
        {
          title: "Rich Text Editor",
          href: "/pro/docs/components/rich-text-editor",
          isPro: true,
        },
        {
          title: "Form Builder",
          href: "/pro/docs/components/form-builder",
          isPro: true,
        },
        {
          title: "File Upload",
          href: "/pro/docs/components/file-upload",
          isPro: true,
        },
        {
          title: "Date Range Picker",
          href: "/pro/docs/components/date-range-picker",
          isPro: true,
        },
      ],
    },
    {
      title: "Pro Templates",
      items: [
        {
          title: "Admin Dashboard",
          href: "/pro/docs/templates/admin-dashboard",
          isPro: true,
          isNew: true,
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
      title: "Advanced Features",
      items: [
        {
          title: "Real-time Sync",
          href: "/pro/docs/features/realtime-sync",
          isPro: true,
        },
        {
          title: "Export & Import",
          href: "/pro/docs/features/export-import",
          isPro: true,
        },
        {
          title: "Advanced Theming",
          href: "/pro/docs/features/advanced-theming",
          isPro: true,
        },
        {
          title: "Performance Optimization",
          href: "/pro/docs/features/performance-optimization",
          isPro: true,
        },
      ],
    },
  ],
} as const;