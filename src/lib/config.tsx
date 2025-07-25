export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "Prism UI",
  description: "Build better apps faster with Prism UI - Modern React component library with pre-built sections and advanced UI patterns",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: [
    "React Components",
    "UI Library", 
    "Tailwind CSS",
    "Next.js",
    "shadcn/ui",
    "Component Library",
    "UI Kit",
    "Design System",
    "Web Development",
    "Frontend Framework"
  ],
  links: {
    email: "support@prism.ui",
    twitter: "https://twitter.com/prismui",
    discord: "https://discord.gg/",
    github: "https://github.com/Codehagen/Prismui",
    instagram: "https://instagram.com/prismui/",
  },
  navItems: [
    {
      href: "/docs",
      title: "Docs",
    },
    {
      href: "/components",
      title: "Components",
    },
    {
      href: "/blog",
      title: "Blog",
    },
  ],
  header: [
    {
      href: "/docs",
      label: "Docs",
    },
    {
      href: "/components",
      label: "Components",
    },
    {
      href: "/blog",
      label: "Blog",
    },
  ],
  pricing: [
    {
      name: "BASIC",
      href: "#",
      price: "$19",
      period: "month",
      yearlyPrice: "$16",
      features: [
        "1 User",
        "5GB Storage",
        "Basic Support",
        "Limited API Access",
        "Standard Analytics",
      ],
      description: "Perfect for individuals and small projects",
      buttonText: "Subscribe",
      isPopular: false,
    },
    {
      name: "PRO",
      href: "#",
      price: "$49",
      period: "month",
      yearlyPrice: "$40",
      features: [
        "5 Users",
        "50GB Storage",
        "Priority Support",
        "Full API Access",
        "Advanced Analytics",
      ],
      description: "Ideal for growing businesses and teams",
      buttonText: "Subscribe",
      isPopular: true,
    },
    {
      name: "ENTERPRISE",
      href: "#",
      price: "$99",
      period: "month",
      yearlyPrice: "$82",
      features: [
        "Unlimited Users",
        "500GB Storage",
        "24/7 Premium Support",
        "Custom Integrations",
        "AI-Powered Insights",
      ],
      description: "For large-scale operations and high-volume users",
      buttonText: "Subscribe",
      isPopular: false,
    },
  ],
};

export type SiteConfig = typeof siteConfig;
