#!/usr/bin/env node

/**
 * Generate MDX documentation files from registry and documentation metadata
 * 
 * This script combines:
 * 1. Registry information from registry.json
 * 2. Documentation metadata from docs-metadata.ts
 * 3. Auto-discovered examples from registry/example/
 * 
 * Usage: pnpm docs:generate
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '../../..');

// Types
interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  files?: Array<{ path: string; type: string }>;
  dependencies?: string[];
  registryDependencies?: string[];
}

interface Registry {
  name: string;
  homepage: string;
  items: RegistryItem[];
}

interface DocsMetadata {
  usage?: string;
  features?: string[];
  notes?: string[];
  props?: Array<{
    name: string;
    type: string;
    description: string;
    required?: boolean;
    default?: string;
  }>;
  examples?: Array<{
    name: string;
    title: string;
    description: string;
  }>;
  customization?: string[];
  publishedAt?: string;
  author?: string;
  category?: string;
}

// Load registry.json
async function loadRegistry(): Promise<Registry> {
  const registryPath = path.join(projectRoot, 'registry.json');
  const content = await fs.readFile(registryPath, 'utf-8');
  return JSON.parse(content);
}

// Load documentation metadata
async function loadDocsMetadata(): Promise<Record<string, DocsMetadata>> {
  try {
    const { docsMetadata } = await import('../../registry/docs-metadata.js');
    return docsMetadata;
  } catch (error) {
    console.warn('Could not load docs metadata:', error);
    return {};
  }
}

// Auto-discover examples from registry/example/
async function discoverExamples(componentName: string): Promise<string[]> {
  const exampleDir = path.join(projectRoot, 'registry/default/example');
  
  try {
    const files = await fs.readdir(exampleDir);
    const examples = files
      .filter(file => file.startsWith(`${componentName}-`) && file.endsWith('.tsx'))
      .map(file => path.basename(file, '.tsx'));
    
    return examples;
  } catch (error) {
    console.warn(`Could not discover examples for ${componentName}:`, error);
    return [];
  }
}

// Generate props table
function generatePropsTable(props: DocsMetadata['props'] = []): string {
  if (props.length === 0) return '';
  
  const header = '| Prop | Type | Description | Required | Default |\n|------|------|-------------|----------|---------|';
  const rows = props.map(prop => {
    const required = prop.required ? '✓' : '';
    const defaultValue = prop.default || '';
    return `| ${prop.name} | \`${prop.type}\` | ${prop.description} | ${required} | ${defaultValue} |`;
  });
  
  return [header, ...rows].join('\n');
}

// Generate features list
function generateFeaturesList(features: string[] = []): string {
  if (features.length === 0) return '';
  
  return features.map(feature => `- ${feature}`).join('\n');
}

// Generate examples section
function generateExamplesSection(examples: string[]): string {
  if (examples.length === 0) return '<ComponentPreview name="component-demo" />';
  
  return examples.map(example => `<ComponentPreview name="${example}" />`).join('\n\n');
}

// Generate MDX template
function generateMDX(registryItem: RegistryItem, docsMetadata: DocsMetadata, examples: string[]): string {
  const {
    name,
    title,
    description,
    dependencies = [],
    registryDependencies = []
  } = registryItem;
  
  const {
    usage,
    features = [],
    notes = [],
    props = [],
    publishedAt = new Date().toISOString().split('T')[0],
    author = 'PrismUI Team',
    category = 'components'
  } = docsMetadata;

  const allDependencies = [...dependencies, ...registryDependencies];
  
  return `---
title: ${title}
publishedAt: ${publishedAt}
summary: ${description}
author: ${author}
slug: components/${name}
category: ${category}
related: ["introduction"]
---

${generateExamplesSection(examples)}

${usage ? `<Note variant="info">
  ${usage}
</Note>` : ''}

## Installation

<Tabs defaultValue="cli">
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>
  <TabsContent value="cli">
    <ComponentSource name="${name}" isCli />
  </TabsContent>
  <TabsContent value="manual">
    <Steps>
      <Step>Copy and paste the following code into your project.</Step>
      <ComponentSource name="${name}" />
      <Step>Update the import paths to match your project setup.</Step>
    </Steps>
  </TabsContent>
</Tabs>

${allDependencies.length > 0 ? `## Dependencies

This component requires the following dependencies:

\`\`\`bash
pnpm add ${dependencies.join(' ')}
\`\`\`

${registryDependencies.length > 0 ? `### Registry Dependencies

This component also depends on the following registry components:

${registryDependencies.map(dep => `- [\`${dep}\`](/docs/components/${dep})`).join('\n')}` : ''}` : ''}

## Usage

### Basic Usage

\`\`\`tsx
import { ${title.replace(/\s+/g, '')} } from "@/components/ui/${name}"

export default function Example() {
  return (
    <${title.replace(/\s+/g, '')} />
  )
}
\`\`\`

${features.length > 0 ? `## Features

${generateFeaturesList(features)}` : ''}

${props.length > 0 ? `## Props

${generatePropsTable(props)}` : ''}

${notes.length > 0 ? `## Notes

${notes.map(note => `- ${note}`).join('\n')}` : ''}

## Customization

The component can be customized using the \`className\` prop and supports all standard HTML attributes.

\`\`\`tsx
<${title.replace(/\s+/g, '')} className="custom-class" />
\`\`\`
`;
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting documentation generation...');
    
    const registry = await loadRegistry();
    const docsMetadata = await loadDocsMetadata();
    
    const outputDir = path.join(projectRoot, 'src/content/docs/components');
    
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });
    
    let generatedCount = 0;
    
    for (const item of registry.items) {
      if (item.type === 'registry:ui' || item.type === 'registry:block') {
        const outputPath = path.join(outputDir, `${item.name}.mdx`);
        
        // Check if file already exists
        try {
          await fs.access(outputPath);
          console.log(`⚠️  Skipped: ${item.name}.mdx (already exists)`);
          continue;
        } catch {
          // File doesn't exist, safe to create
          const metadata = docsMetadata[item.name] || {};
          const examples = await discoverExamples(item.name);
          
          const mdxContent = generateMDX(item, metadata, examples);
          
          await fs.writeFile(outputPath, mdxContent);
          generatedCount++;
          
          console.log(`✅ Generated: ${item.name}.mdx`);
        }
      }
    }
    
    console.log(`🎉 Successfully generated ${generatedCount} documentation files!`);
    
  } catch (error) {
    console.error('❌ Error generating documentation:', error);
    process.exit(1);
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}