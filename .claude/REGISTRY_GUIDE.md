# PrismUI Registry Guide

## Overview
This guide explains how to add new components to the PrismUI registry so they can be installed via the shadcn CLI.

## Prerequisites
- Component must be created and tested
- Follow shadcn/ui conventions and patterns
- Use TypeScript with proper interfaces

## Step-by-Step Process

### 1. Create the Component File

**Location**: `registry/default/ui/[component-name].tsx`

**Template**:
```typescript
"use client";

import { cn } from "@/lib/utils";
// Add other imports as needed

interface ComponentNameProps {
  className?: string;
  // Add other props with proper TypeScript types
}

export default function ComponentName({ 
  className,
  // other props
}: ComponentNameProps) {
  return (
    <div className={cn("base-styles", className)}>
      {/* Component implementation */}
    </div>
  );
}
```

**Requirements**:
- Must use `"use client"` directive if using client-side features
- Must import `cn` from `@/lib/utils` for className merging
- Must have proper TypeScript interfaces
- Must use `export default` for the main component
- Follow existing naming conventions (PascalCase for component, kebab-case for file)

### 2. Add Entry to Registry.json

**Location**: `registry.json`

**Template**:
```json
{
  "name": "component-name",
  "type": "registry:ui",
  "title": "Component Name",
  "description": "Clear, concise description of what the component does and when to use it.",
  "files": [
    {
      "path": "registry/default/ui/component-name.tsx",
      "type": "registry:ui"
    }
  ],
  "dependencies": [
    "dependency1",
    "dependency2"
  ],
  "registryDependencies": [
    "button",
    "card"
  ]
}
```

**Field Descriptions**:
- `name`: Unique identifier (kebab-case)
- `type`: Component type (`registry:ui` for UI components, `registry:block` for larger blocks)
- `title`: Human-readable name (Title Case)
- `description`: Brief explanation of component purpose
- `files`: Array of component files
- `dependencies`: npm packages required
- `registryDependencies`: Other registry components this depends on

### 3. Build the Registry

Run the build command to generate registry files:

```bash
pnpm registry:build
```

This will:
- Generate `public/r/[component-name].json` files
- Include component source code in the JSON
- Add proper schema validation
- Create installable registry items

### 4. Test Installation

Test that the component can be installed via shadcn CLI:

```bash
npx shadcn@latest add ./public/r/component-name.json
```

**Expected Result**:
- Component installed to `src/components/ui/component-name.tsx`
- Dependencies automatically installed
- No errors during installation

## Component Types

### UI Components
- **Location**: `registry/default/ui/`
- **Type**: `registry:ui`
- **Purpose**: Reusable UI components

### Block Components
- **Location**: `registry/default/block/`
- **Type**: `registry:block`
- **Purpose**: Larger, more complex components or page sections

### Examples
- **Location**: `registry/default/example/`
- **Type**: `registry:example`
- **Purpose**: Usage examples and demos

## Dependencies

### npm Dependencies
List all external packages the component requires:
```json
"dependencies": [
  "framer-motion",
  "lucide-react",
  "class-variance-authority"
]
```

### Registry Dependencies
List other registry components this component uses:
```json
"registryDependencies": [
  "button",
  "card",
  "dialog"
]
```

## Best Practices

### Code Quality
- Use TypeScript with proper interfaces
- Follow existing code patterns
- Include proper error handling
- Add JSDoc comments for complex logic

### Styling
- Use Tailwind CSS classes
- Follow design system tokens
- Use `cn()` for conditional classes
- Support dark mode via CSS variables

### Props
- Use descriptive prop names
- Provide sensible defaults
- Include `className` prop for customization
- Use proper TypeScript types

### Testing
- Test component in isolation
- Test installation via shadcn CLI
- Verify dependencies are installed
- Check component renders correctly

## Common Patterns

### Animation Component
```typescript
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedComponentProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

export default function AnimatedComponent({ 
  className, 
  children, 
  delay = 0 
}: AnimatedComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className={cn("base-styles", className)}
    >
      {children}
    </motion.div>
  );
}
```

### Form Component
```typescript
"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FormComponentProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const FormComponent = forwardRef<HTMLInputElement, FormComponentProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <input
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2",
            error && "border-destructive",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

FormComponent.displayName = "FormComponent";

export default FormComponent;
```

## Troubleshooting

### Build Errors
- Check TypeScript syntax
- Verify all imports are correct
- Ensure registry.json is valid JSON

### Installation Errors
- Run `pnpm registry:build` after changes
- Check file paths in registry.json
- Verify component exports properly

### Missing Dependencies
- Add to `dependencies` array in registry.json
- Test installation in clean environment

## File Structure

```
registry/
├── default/
│   ├── ui/
│   │   ├── component-name.tsx
│   │   └── another-component.tsx
│   ├── block/
│   │   └── complex-section.tsx
│   └── example/
│       ├── component-name-demo.tsx
│       └── component-name-advanced.tsx
├── registry.json
└── README.md
```

## Commands Reference

```bash
# Build registry
pnpm registry:build

# Test component installation
npx shadcn@latest add ./public/r/component-name.json

# Install from URL (when hosted)
npx shadcn@latest add https://prismui.com/r/component-name.json

# Development server
pnpm dev

# Build project
pnpm build
```

## Checklist for New Components

- [ ] Component created in correct directory
- [ ] TypeScript interfaces defined
- [ ] Component follows existing patterns
- [ ] Entry added to registry.json
- [ ] Dependencies listed correctly
- [ ] Registry built successfully
- [ ] Component installs via shadcn CLI
- [ ] Component renders without errors
- [ ] Documentation updated (if needed)

## LLM Instructions

When adding a new component to the registry:

1. **Create the component file** in `registry/default/ui/[component-name].tsx`
2. **Add registry entry** to `registry.json` with proper metadata
3. **Run build command** `pnpm registry:build`
4. **Test installation** with `npx shadcn@latest add ./public/r/component-name.json`
5. **Verify** the component works correctly

Always follow the templates and patterns shown in this guide. Ensure proper TypeScript types and include all necessary dependencies.