/**
 * Documentation metadata for registry components
 * This file contains enhanced documentation that can't be stored in registry.json
 * due to shadcn CLI schema constraints
 */

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  default?: string;
}

export interface ExampleDefinition {
  name: string;
  title: string;
  description: string;
}

export interface DocsMetadata {
  usage?: string;
  features?: string[];
  notes?: string[];
  props?: PropDefinition[];
  examples?: ExampleDefinition[];
  customization?: string[];
  publishedAt?: string;
  author?: string;
  category?: string;
}

export const docsMetadata: Record<string, DocsMetadata> = {
  "word-reveal": {
    usage: "Perfect for hero sections, headings, and attention-grabbing text elements.",
    features: [
      "Staggered word animation",
      "Customizable timing",
      "Responsive design",
      "Blur and motion effects"
    ],
    notes: [
      "Uses Framer Motion for animations",
      "Each word is animated independently",
      "Includes opacity, blur, and vertical movement",
      "Component is responsive and adjusts text size"
    ],
    props: [
      {
        name: "text",
        type: "string",
        description: "The text content to animate",
        required: true
      },
      {
        name: "delay",
        type: "number",
        description: "Delay between each word animation (in seconds)",
        default: "0.15"
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes"
      }
    ],
    examples: [
      {
        name: "word-reveal-demo",
        title: "Basic Usage",
        description: "Simple word reveal animation"
      },
      {
        name: "word-reveal-hero",
        title: "Hero Section",
        description: "Word reveal in a hero layout"
      },
      {
        name: "word-reveal-custom",
        title: "Custom Styling",
        description: "Word reveal with custom styling"
      }
    ],
    publishedAt: "2025-01-02",
    author: "PrismUI Team",
    category: "animation"
  },
  "expandable-card": {
    usage: "Perfect for project dashboards, task management, and GitHub repository overviews.",
    features: [
      "Smooth expand/collapse animations",
      "Progress tracking",
      "Contributor avatars with tooltips",
      "Task completion status",
      "GitHub integration display",
      "Interactive buttons and badges",
      "Responsive layout"
    ],
    notes: [
      "Built with Framer Motion for smooth animations",
      "Uses Lucide React for consistent iconography",
      "Responsive design with mobile-first approach",
      "TypeScript support with proper types",
      "Integrates with Shadcn UI components"
    ],
    props: [
      {
        name: "title",
        type: "string",
        description: "Project title",
        required: true
      },
      {
        name: "progress",
        type: "number",
        description: "Progress percentage (0-100)",
        required: true
      },
      {
        name: "dueDate",
        type: "string",
        description: "Project due date",
        required: true
      },
      {
        name: "contributors",
        type: "Array<{ name: string; image?: string }>",
        description: "Array of project contributors",
        required: true
      },
      {
        name: "tasks",
        type: "Array<{ title: string; completed: boolean }>",
        description: "Array of project tasks",
        required: true
      },
      {
        name: "githubStars",
        type: "number",
        description: "Number of GitHub stars",
        required: true
      },
      {
        name: "openIssues",
        type: "number",
        description: "Number of open issues",
        required: true
      }
    ],
    examples: [
      {
        name: "expandable-card-basic",
        title: "Basic Usage",
        description: "Simple expandable card"
      },
      {
        name: "expandable-card-demo",
        title: "Full Demo",
        description: "Complete expandable card with all features"
      }
    ],
    publishedAt: "2025-01-02",
    author: "PrismUI Team",
    category: "display"
  },
  "hero-badge": {
    usage: "Perfect for hero sections and call-to-action elements with icon support.",
    features: [
      "Animated hover effects",
      "Icon support",
      "Multiple variants and sizes",
      "Link and button modes",
      "Responsive design"
    ],
    notes: [
      "Uses Framer Motion for animations",
      "Supports both Link and button wrapper",
      "Configurable animation timing",
      "Follows design system patterns"
    ],
    props: [
      {
        name: "text",
        type: "string",
        description: "The badge text content",
        required: true
      },
      {
        name: "href",
        type: "string",
        description: "Optional link URL (creates Link wrapper)"
      },
      {
        name: "icon",
        type: "React.ReactNode",
        description: "Optional icon element"
      },
      {
        name: "endIcon",
        type: "React.ReactNode",
        description: "Optional end icon element"
      },
      {
        name: "variant",
        type: "'default' | 'outline' | 'ghost'",
        description: "Badge visual variant",
        default: "'default'"
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        description: "Badge size",
        default: "'md'"
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes"
      },
      {
        name: "onClick",
        type: "() => void",
        description: "Click handler (when not using href)"
      }
    ],
    examples: [
      {
        name: "hero-badge-basic",
        title: "Basic Usage",
        description: "Simple hero badge"
      },
      {
        name: "hero-badge-demo",
        title: "Advanced Demo",
        description: "Hero badge with icons and variants"
      }
    ],
    publishedAt: "2025-01-02",
    author: "PrismUI Team",
    category: "display"
  },
  "display-cards": {
    usage: "Perfect for showcasing featured content, testimonials, or product highlights with engaging animations.",
    features: [
      "Stacked card layout",
      "Hover animations",
      "Customizable content",
      "Responsive design"
    ],
    notes: [
      "Cards are stacked using CSS Grid",
      "Includes grayscale and color transition effects",
      "Supports custom icons and content",
      "Transform animations on hover"
    ],
    props: [
      {
        name: "cards",
        type: "DisplayCardProps[]",
        description: "Array of card configurations",
        default: "Default cards with sample content"
      }
    ],
    examples: [
      {
        name: "display-cards-demo",
        title: "Basic Usage",
        description: "Default display cards"
      },
      {
        name: "display-cards-basic",
        title: "Custom Content",
        description: "Cards with custom content"
      }
    ],
    publishedAt: "2025-01-16",
    author: "PrismUI Team",
    category: "display"
  },
  "hero": {
    usage: "Ideal for landing page hero sections with compelling headlines and call-to-action buttons.",
    features: [
      "Animated entrance effects",
      "Customizable content",
      "Button integration",
      "Responsive layout"
    ],
    notes: [
      "Uses Framer Motion for animations",
      "Integrates with button components",
      "Supports custom styling",
      "Mobile-first responsive design"
    ],
    examples: [
      {
        name: "hero-demo",
        title: "Full Hero",
        description: "Complete hero section"
      },
      {
        name: "hero-basic",
        title: "Simple Hero",
        description: "Basic hero layout"
      }
    ],
    publishedAt: "2025-01-16",
    author: "PrismUI Team",
    category: "layout"
  },
  "logo-carousel": {
    usage: "Perfect for displaying client logos, partner brands, or technology stacks in an animated carousel.",
    features: [
      "Infinite scrolling animation",
      "Customizable logos",
      "Responsive design",
      "Smooth transitions"
    ],
    notes: [
      "Uses Framer Motion for smooth animations",
      "Automatically handles overflow",
      "Supports various logo formats",
      "Pauseable on hover"
    ],
    examples: [
      {
        name: "logo-carousel-demo",
        title: "Brand Showcase",
        description: "Carousel with brand logos"
      },
      {
        name: "logo-carousel-basic",
        title: "Simple Carousel",
        description: "Basic logo carousel"
      }
    ],
    publishedAt: "2025-01-16",
    author: "PrismUI Team",
    category: "display"
  },
  "number-flow": {
    usage: "Great for displaying animated counters, statistics, or any numeric data with smooth transitions.",
    features: [
      "Smooth number transitions",
      "Multiple formats supported",
      "Customizable animations",
      "Performance optimized"
    ],
    notes: [
      "Built on @number-flow/react library",
      "Supports currency, percentage, and custom formats",
      "Hardware accelerated animations",
      "Accessible screen reader support"
    ],
    examples: [
      {
        name: "number-flow-demo",
        title: "Statistics Counter",
        description: "Animated statistics display"
      },
      {
        name: "number-flow-basic",
        title: "Simple Counter",
        description: "Basic number animation"
      }
    ],
    publishedAt: "2025-01-16",
    author: "PrismUI Team",
    category: "animation"
  },
  "open-source": {
    usage: "Ideal for showcasing open source projects, GitHub repositories, or developer portfolios.",
    features: [
      "Project showcase layout",
      "Interactive animations",
      "Call-to-action buttons",
      "Responsive grid"
    ],
    notes: [
      "Includes GitHub-style design elements",
      "Supports project descriptions and links",
      "Animated on scroll/hover",
      "Integrates with button and separator components"
    ],
    examples: [
      {
        name: "open-source-demo",
        title: "Project Showcase",
        description: "Complete open source section"
      },
      {
        name: "open-source-basic",
        title: "Simple Layout",
        description: "Basic project display"
      }
    ],
    publishedAt: "2025-01-16",
    author: "PrismUI Team",
    category: "layout"
  },
  "popover": {
    usage: "Enhanced popover component for tooltips, menus, or interactive content overlays.",
    features: [
      "Smooth animations",
      "Flexible positioning",
      "Click and hover triggers",
      "Customizable content"
    ],
    notes: [
      "Built with Framer Motion animations",
      "Supports various trigger methods",
      "Includes close button functionality",
      "Accessible keyboard navigation"
    ],
    examples: [
      {
        name: "popover-demo",
        title: "Interactive Popover",
        description: "Full-featured popover"
      },
      {
        name: "popover-basic",
        title: "Simple Popover",
        description: "Basic popover usage"
      },
      {
        name: "popover-menu",
        title: "Menu Popover",
        description: "Popover as dropdown menu"
      }
    ],
    publishedAt: "2025-01-16",
    author: "PrismUI Team",
    category: "overlay"
  },
  "tweet-card": {
    usage: "Perfect for displaying Twitter/X posts, testimonials, or social media content.",
    features: [
      "Rich tweet content display",
      "Interactive elements",
      "Loading states",
      "Multiple variants"
    ],
    notes: [
      "Integrates with react-tweet library",
      "Supports various tweet formats",
      "Includes skeleton loading states",
      "Handles images and media content"
    ],
    props: [
      {
        name: "tweetId",
        type: "string",
        description: "Twitter/X tweet ID to display",
        required: true
      },
      {
        name: "variant",
        type: "string",
        description: "Display variant (default, compact, etc.)",
        default: "default"
      }
    ],
    examples: [
      {
        name: "tweet-card-demo",
        title: "Full Tweet",
        description: "Complete tweet display"
      },
      {
        name: "tweet-card-basic",
        title: "Simple Tweet",
        description: "Basic tweet card"
      },
      {
        name: "tweet-card-compact",
        title: "Compact View",
        description: "Compact tweet layout"
      }
    ],
    publishedAt: "2025-01-16",
    author: "PrismUI Team",
    category: "display"
  }
};

export function getDocsMetadata(componentName: string): DocsMetadata | undefined {
  return docsMetadata[componentName];
}

export function getAllDocsMetadata(): Record<string, DocsMetadata> {
  return docsMetadata;
}