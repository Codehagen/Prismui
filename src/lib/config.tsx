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
      href: "/pro",
      title: "Templates",
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
      href: "/pro",
      label: "Templates",
    },
    {
      href: "/blog",
      label: "Blog",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
