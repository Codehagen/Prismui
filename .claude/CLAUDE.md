# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Prism UI is a modern, accessible React component library built on top of shadcn/ui. It extends shadcn/ui with additional components, page sections, and complex UI patterns for faster web application development.

**Tech Stack:**
- Next.js 14 with App Router
- React 18 with TypeScript
- Tailwind CSS with custom design system
- shadcn/ui components as foundation
- MDX for documentation and blog content
- Radix UI primitives for accessibility

## Development Commands

### Core Development
```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Build registry (component exports)
pnpm build:registry

# Build with shadcn CLI
pnpm shadcn build
```

### Component Development
```bash
# Build component registry after changes
pnpm build:registry

# Add new shadcn components
npx shadcn@latest add [component-name]
```

## Architecture Overview

### Registry System
The project uses a custom registry system to manage and distribute components:

- **Registry Builder**: `src/lib/scripts/build-registry.mts` - Automated script that processes all components and creates registry files
- **Registry Types**: Components are categorized as `registry:ui`, `registry:block`, `registry:theme`, `registry:section`
- **Registry Files**: Located in `src/registry/` with automatic generation to `public/r/`

### Component Structure
```
src/
├── components/
│   ├── ui/              # Base shadcn/ui components
│   ├── prismui/         # Custom Prism UI components
│   ├── sections/        # Pre-built page sections
│   ├── blog/            # Blog-specific components
│   └── docs/            # Documentation components
├── registry/            # Component registry definitions
└── content/             # MDX content for docs/blog
```

### Key Files
- `src/config/docs.ts` - Documentation navigation configuration
- `src/lib/config.tsx` - Site configuration and constants
- `src/registry/index.ts` - Main registry combining all component types
- `tailwind.config.ts` - Tailwind configuration with custom theme
- `content-collections.config.ts` - MDX content processing

### Component Categories
1. **UI Components** (`components/ui/`): Base shadcn/ui components
2. **Prism UI Components** (`components/prismui/`): Custom enhanced components
3. **Page Sections** (`components/sections/`): Complete page sections (Hero, Features, etc.)
4. **Registry Items** (`registry/`): Component definitions for distribution

### Development Workflow
1. Create components in appropriate directory (`components/prismui/` for custom components)
2. Add component to registry in `src/registry/registry-components.ts` or appropriate registry file
3. Run `pnpm build:registry` to update registry files
4. Components are automatically available in documentation

### Content Management
- **Blog Posts**: `src/content/blog/` - MDX files for blog content
- **Documentation**: `src/content/docs/` - MDX files for component documentation
- **Navigation**: Updated via `src/config/docs.ts` for sidebar navigation

### Styling System
- Uses Tailwind CSS with custom design tokens
- CSS variables for theming (`--background`, `--foreground`, etc.)
- Multiple theme variations supported (slate, gray, zinc, neutral, stone)
- Dark mode support via `next-themes`

### Key Patterns
- All components follow shadcn/ui patterns with Radix UI primitives
- TypeScript interfaces for component props
- Framer Motion for animations
- Custom hooks in `src/hooks/` for common functionality
- Utility functions in `src/lib/utils.ts`

## Component Development Guidelines

### Adding New Components
1. Create component in `src/components/prismui/[component-name].tsx`
2. Add to registry in `src/registry/registry-components.ts`
3. Create examples in `src/registry/example/[component-name]-*.tsx`
4. Add documentation in `src/content/docs/components/[component-name].mdx`
5. Update navigation in `src/config/docs.ts`
6. Run `pnpm build:registry`

### Registry Entry Format
Components must be registered with specific metadata including name, type, files, dependencies, and categories for proper distribution and documentation.