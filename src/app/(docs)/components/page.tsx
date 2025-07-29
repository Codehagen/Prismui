import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { constructMetadata } from "@/lib/utils"
import { docsConfig } from "@/config/docs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = constructMetadata({
  title: "Components - PrismUI",
  description: "Browse our collection of 13+ React components including buttons, cards, animations, and page sections. Copy and paste into your apps.",
  keywords: ["React components", "UI library", "PrismUI", "Tailwind CSS components", "shadcn/ui", "component library"],
  canonical: "https://www.prismui.tech/components",
})

interface ComponentItem {
  title: string
  href: string
  description?: string
  category: string
  isNew?: boolean
  isPro?: boolean
}

function extractComponents(): ComponentItem[] {
  const components: ComponentItem[] = []
  
  // Component descriptions mapping
  const descriptions: Record<string, string> = {
    "Display Cards": "Versatile cards for displaying content with various layouts and styles",
    "Expandable Card": "Interactive cards that expand to reveal additional content",
    "Floating Action Panel": "Floating panels with action buttons for quick access",
    "Hero Badge": "Eye-catching badges for hero sections and announcements",
    "Popover": "Contextual pop-up content triggered by user interactions",
    "Status Badge": "Colored badges to indicate status, priority, or category",
    "Tweet Card": "Social media card component for displaying tweet-like content",
    "Action Button": "Interactive buttons with various states and animations",
    "Button Group": "Grouped buttons for related actions and selections",
    "Enhanced Button": "Advanced button component with loading states and animations",
    "Word Reveal": "Animated text reveal effects for engaging content",
    "Number Flow": "Smooth number animations and counting effects",
    "Hero": "Landing page hero sections with compelling layouts",
    "Open Source": "Components for showcasing open source projects",
    "Logo Carousel": "Rotating logo displays for partners and clients",
    "Pricing": "Pricing table components for subscription plans",
    "Timeline": "Visual timeline components for process flows",
    "Prism Homepage": "Complete homepage template with modern design",
  }
  
  docsConfig.sidebarNav.forEach((section) => {
    if (["Components", "Buttons", "Text Animations", "Page Sections", "Templates"].includes(section.title)) {
      section.items.forEach((item) => {
        components.push({
          title: item.title,
          href: item.href,
          description: descriptions[item.title] || `${item.title} component for your React applications`,
          category: section.title,
          isNew: item.isNew,
          isPro: item.isPro,
        })
      })
    }
  })
  
  return components
}

export default function ComponentsPage() {
  const components = extractComponents()
  const componentCount = components.length
  
  return (
    <div className="py-8 md:py-12">
      <div className="mx-auto max-w-[800px] text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl">
          Components
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          Beautifully designed components that you can copy and paste into your apps. 
          Accessible. Customizable. Open Source.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <Badge variant="secondary">{componentCount} Components</Badge>
          <Badge variant="outline">React</Badge>
          <Badge variant="outline">Tailwind CSS</Badge>
        </div>
      </div>
      
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {components.map((component) => (
          <Card key={component.href} className="group hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {component.category}
                </Badge>
                <div className="flex gap-1">
                  {component.isNew && <Badge variant="default" className="text-xs">New</Badge>}
                  {component.isPro && <Badge variant="secondary" className="text-xs">Pro</Badge>}
                </div>
              </div>
              <CardTitle className="text-lg">{component.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm leading-relaxed">
                {component.description}
              </CardDescription>
              <Link 
                href={component.href}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View component
                <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Looking for more components?{" "}
          <Link 
            href="/docs" 
            className="font-medium text-primary hover:underline"
          >
            Browse the full documentation
          </Link>
        </p>
      </div>
    </div>
  )
}