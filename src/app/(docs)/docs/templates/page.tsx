import Link from "next/link"
import { ArrowRight, Star, Crown } from "lucide-react"

import { constructMetadata } from "@/lib/utils"
import { docsConfig } from "@/config/docs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata = constructMetadata({
  title: "Templates - PrismUI",
  description: "Browse our collection of complete page templates and layouts. From landing pages to dashboards, get started quickly with our pre-built templates using PrismUI components.",
  canonical: "https://www.prismui.tech/docs/templates",
})

interface TemplateItem {
  title: string
  href: string
  description?: string
  isNew?: boolean
  isPro?: boolean
}

function extractTemplates(): TemplateItem[] {
  const templates: TemplateItem[] = []
  
  // Template descriptions mapping
  const descriptions: Record<string, string> = {
    "SaaS Landing": "Complete SaaS landing page with hero, features, pricing, and testimonials sections",
    "PrismUI Homepage": "Modern homepage template showcasing the PrismUI design system and components",
    "Dashboard": "Admin dashboard template with sidebar navigation, charts, and data tables",
    "Portfolio": "Personal portfolio template with project showcases and contact sections",
    "Blog": "Clean blog template with article listings, tags, and responsive design",
    "E-commerce": "Online store template with product grids, shopping cart, and checkout flow",
  }
  
  docsConfig.sidebarNav.forEach((section) => {
    if (section.title === "Templates") {
      section.items.forEach((item) => {
        templates.push({
          title: item.title,
          href: item.href,
          description: descriptions[item.title] || `${item.title} template with modern design and functionality`,
          isNew: item.isNew,
          isPro: item.isPro,
        })
      })
    }
  })
  
  return templates
}

export default function TemplatesPage() {
  const templates = extractTemplates()
  const templateCount = templates.length
  
  return (
    <div className="py-8 md:py-12">
      <div className="mx-auto max-w-[800px] text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl">
          Templates
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          Complete page templates and layouts built with PrismUI components. 
          Get started quickly with our pre-designed templates for various use cases.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <Badge variant="secondary">{templateCount} Templates</Badge>
          <Badge variant="outline">Production Ready</Badge>
          <Badge variant="outline">Responsive</Badge>
        </div>
      </div>

      {/* Pro Templates CTA */}
      <div className="mt-8 mx-auto max-w-3xl">
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Crown className="h-5 w-5 text-primary" />
              <Badge variant="default">PrismUI Pro</Badge>
            </div>
            <CardTitle>Premium Templates Available</CardTitle>
            <CardDescription>
              Get access to premium templates with advanced features, animations, and comprehensive layouts.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild>
              <Link href="/pro/templates">
                <Star className="h-4 w-4 mr-2" />
                Browse Pro Templates
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.href} className="group hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  Template
                </Badge>
                <div className="flex gap-1">
                  {template.isNew && <Badge variant="default" className="text-xs">New</Badge>}
                  {template.isPro && <Badge variant="secondary" className="text-xs">Pro</Badge>}
                </div>
              </div>
              <CardTitle className="text-lg">{template.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm leading-relaxed">
                {template.description}
              </CardDescription>
              <Link 
                href={template.href}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View template
                <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {templates.length === 0 && (
        <div className="mt-12 text-center space-y-4">
          <p className="text-muted-foreground">
            Free templates are coming soon. In the meantime, check out our Pro templates.
          </p>
          <Button variant="outline" asChild>
            <Link href="/pro/templates">Browse Pro Templates</Link>
          </Button>
        </div>
      )}
      
      <div className="mt-16 text-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Build Your Own Templates</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Use our components and sections to create your own custom templates. 
            Start with our building blocks and create something unique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link href="/components">Browse Components</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/sections">View Sections</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}