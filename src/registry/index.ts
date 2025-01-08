// DO NOT REMOVE - Registry Index Guide
/**
 * This is the main registry index for PrismUI.
 * It combines all component types into a single registry.
 *
 * Available Registries:
 * - components: UI components (buttons, inputs, etc.)
 * - sections: Larger page sections (hero, features, etc.)
 * - examples: Example implementations
 * - blocks: Composite components
 * - themes: Theme configurations
 * - hooks: React hooks
 * - utils: Utility functions
 *
 * To add a new component type:
 * 1. Create a new registry file: registry-[type].ts
 * 2. Import and add it to the registry array below
 * 3. Run `pnpm build:registry` to update the registry
 */

import { examples } from "./registry-examples";
import { sections } from "./registry-sections";
import { blocks } from "./registry-blocks";
import { themes } from "./registry-themes";
import { components } from "./registry-components";
import { type Registry } from "./schema";

// Import registries as they are created
// import { hooks } from "./registry-hooks";
// import { utils } from "./registry-utils";

export const registry: Registry = [
  ...examples,
  ...sections,
  ...blocks,
  ...themes,
  ...components,
  // Add other registries as they are created
  // ...hooks,
  // ...utils,
];

// Helper functions
export function getRegistryItem(name: string) {
  return registry.find((item) => item.name === name) ?? null;
}

export function getRegistryItemsByType(type: string) {
  return registry.filter((item) => item.type === type);
}

export function getRegistryItemsByCategory(category: string) {
  return registry.filter((item) => item.categories?.includes(category));
}
