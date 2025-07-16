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
  }
};

export function getDocsMetadata(componentName: string): DocsMetadata | undefined {
  return docsMetadata[componentName];
}

export function getAllDocsMetadata(): Record<string, DocsMetadata> {
  return docsMetadata;
}