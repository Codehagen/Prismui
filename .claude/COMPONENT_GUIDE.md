# Component Addition Guide

This guide provides step-by-step instructions for adding new components to the PrismUI registry system.

## Overview

Our registry system consists of:
- **Registry.json**: Official shadcn v4 compatible registry
- **Documentation metadata**: Enhanced docs data in `docs-metadata.ts`
- **Auto-generated MDX**: Documentation files generated from metadata
- **Examples**: Discoverable example components

## Step-by-Step Process

### 1. Create the Component

Create your component in the shadcn-compatible location:

```bash
# Create component file
touch registry/default/ui/your-component.tsx
```

Write your component following these patterns:
- Use TypeScript with proper interfaces
- Follow existing shadcn/ui patterns
- Include proper exports and imports
- Use consistent naming conventions

**Example structure:**
```tsx
"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface YourComponentProps {
  className?: string;
  // Add your props here
}

export const YourComponent = forwardRef<
  HTMLDivElement,
  YourComponentProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("your-component-classes", className)}
      {...props}
    >
      {/* Your component content */}
    </div>
  );
});

YourComponent.displayName = "YourComponent";
```

### 2. Add to Registry.json

Add your component to the official registry:

```bash
# Edit the registry file
code registry.json
```

Add a new entry to the `items` array:

```json
{
  "name": "your-component",
  "type": "registry:ui",
  "title": "Your Component",
  "description": "A brief description of what your component does.",
  "files": [
    {
      "path": "registry/default/ui/your-component.tsx",
      "type": "registry:ui"
    }
  ],
  "dependencies": ["framer-motion", "lucide-react"],
  "registryDependencies": ["button", "card"]
}
```

**Important notes:**
- `dependencies`: External npm packages required
- `registryDependencies`: Other shadcn/ui components needed
- `type`: Use `registry:ui` for components, `registry:block` for complex patterns

### 3. Add Documentation Metadata

Add enhanced documentation to the metadata file:

```bash
# Edit the docs metadata
code src/registry/docs-metadata.ts
```

Add your component to the `docsMetadata` object:

```typescript
"your-component": {
  usage: "Perfect for [use case description].",
  features: [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  notes: [
    "Implementation detail 1",
    "Implementation detail 2",
    "Accessibility note"
  ],
  props: [
    {
      name: "propName",
      type: "string",
      description: "Description of the prop",
      required: true
    },
    {
      name: "optionalProp",
      type: "number",
      description: "Optional prop description",
      default: "0"
    }
  ],
  examples: [
    {
      name: "your-component-demo",
      title: "Basic Usage",
      description: "Simple component usage"
    }
  ],
  publishedAt: "2025-01-02",
  author: "PrismUI Team",
  category: "display" // or "animation", "input", etc.
}
```

### 4. Create Examples

Create example components that demonstrate usage:

```bash
# Create example file
touch registry/default/example/your-component-demo.tsx
```

Example files should:
- Be named `{component-name}-{variant}.tsx`
- Show realistic usage patterns
- Include proper imports and exports
- Be self-contained

**Example structure:**
```tsx
import { YourComponent } from "@/registry/default/ui/your-component";

export default function YourComponentDemo() {
  return (
    <div className="space-y-4">
      <YourComponent />
    </div>
  );
}
```

### 5. Build Registry and Generate Documentation

Run the build commands:

```bash
# Build the registry for shadcn CLI
pnpm build:registry

# Generate MDX documentation
pnpm docs:generate
```

This will:
- Create registry files in `public/r/`
- Generate MDX files in `src/content/docs/components/`
- Auto-discover your examples

### 6. Update Navigation (if needed)

If your component should appear in the sidebar navigation:

```bash
# Edit the docs config
code src/config/docs.ts
```

Add your component to the appropriate section:

```typescript
{
  title: "Your Component",
  href: "/docs/components/your-component",
  items: []
}
```

### 7. Test Component Installation

Test that your component can be installed via shadcn CLI:

```bash
# Test local installation
pnpm dlx shadcn@latest add "http://localhost:3000/r/styles/default/your-component.json"

# Test production installation (after deploy)
pnpm dlx shadcn@latest add "https://prismui.com/r/styles/default/your-component.json"
```

### 8. Verify Documentation

Check that your documentation was generated correctly:

1. Start the dev server: `pnpm dev`
2. Navigate to `http://localhost:3000/docs/components/your-component`
3. Verify all sections are present and formatted correctly

## Commands Reference

### Core Commands
```bash
# Development
pnpm dev                    # Start development server
pnpm build                  # Build for production

# Registry
pnpm build:registry         # Build registry for shadcn CLI
pnpm docs:generate          # Generate MDX documentation

# Testing
pnpm lint                   # Lint code
```

### File Structure
```
registry/
├── default/
│   ├── ui/
│   │   └── your-component.tsx     # Main component
│   └── example/
│       └── your-component-demo.tsx # Example usage
├── docs-metadata.ts               # Documentation metadata
└── registry.json                  # Official registry

src/
├── content/
│   └── docs/
│       └── components/
│           └── your-component.mdx # Auto-generated docs
└── config/
    └── docs.ts                   # Navigation config
```

## Best Practices

### Component Development
- Follow existing patterns in the codebase
- Use TypeScript with proper interfaces
- Include proper error handling
- Add accessibility features (ARIA labels, keyboard navigation)
- Test with different screen sizes

### Documentation
- Write clear, concise descriptions
- Include realistic examples
- Document all props with types
- Add usage recommendations
- Include accessibility notes

### Registry Management
- Use semantic versioning concepts
- Keep dependencies minimal
- Test installation on fresh projects
- Verify examples work independently

## Troubleshooting

### Common Issues

**Registry build fails:**
```bash
# Check registry.json syntax
pnpm build:registry
```

**Documentation not generating:**
```bash
# Check metadata syntax
pnpm docs:generate
```

**Component not installing:**
- Verify registry.json structure
- Check file paths are correct
- Ensure dependencies are listed

**Examples not discovered:**
- Check file naming pattern: `{component-name}-{variant}.tsx`
- Verify files are in `registry/default/example/`
- Check imports are correct

### Debug Commands
```bash
# View registry output
ls -la public/r/styles/default/

# Check generated docs
ls -la src/content/docs/components/

# Validate JSON
node -e "console.log(JSON.parse(require('fs').readFileSync('registry.json', 'utf8')))"
```

## Next Steps

After adding your component:
1. Test thoroughly in different environments
2. Add to any relevant templates or sections
3. Update examples if needed
4. Consider adding to the main website showcase
5. Document any breaking changes

---

This guide ensures consistency across all components and maintains compatibility with the shadcn CLI system.