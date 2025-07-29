import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { constructMetadata } from "@/lib/utils"
import { docsConfig } from "@/config/docs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = constructMetadata({
  title: "Page Sections - PrismUI",
  description: "Browse our collection of ready-to-use page sections including hero sections, pricing tables, feature showcases, and more. Perfect for building landing pages and marketing sites.",
  canonical: "https://www.prismui.tech/docs/sections",
})

interface SectionItem {
  title: string
  href: string
  description?: string
  isNew?: boolean
  isPro?: boolean
}

function extractSections(): SectionItem[] {
  const sections: SectionItem[] = []
  
  // Section descriptions mapping
  const descriptions: Record<string, string> = {
    "Hero": "Compelling hero sections with animations and call-to-action buttons for landing pages",
    "Pricing": "Dynamic pricing sections with plan toggles, animations, and conversion optimization",
    "Features": "Feature showcase sections with icons, descriptions, and responsive layouts",
    "Testimonials": "Customer testimonial sections with avatars, quotes, and social proof",
    "FAQ": "Frequently asked questions sections with collapsible content and search",
    "CTA": "Call-to-action sections designed to drive conversions and user engagement",
    "Footer": "Comprehensive footer sections with links, social media, and contact information",
    "Header": "Navigation headers with menus, search, and responsive mobile designs",
  }
  
  docsConfig.sidebarNav.forEach((section) => {
    if (section.title === "Page Sections") {
      section.items.forEach((item) => {
        sections.push({
          title: item.title,
          href: item.href,
          description: descriptions[item.title] || `${item.title} section component for your pages`,
          isNew: item.isNew,
          isPro: item.isPro,
        })
      })
    }
  })
  
  return sections
}

export default function SectionsPage() {
  const sections = extractSections()
  const sectionCount = sections.length
  
  return (
    <div className="py-8 md:py-12">
      <div className="mx-auto max-w-[800px] text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl">
          Page Sections
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          Ready-to-use page sections for building landing pages, marketing sites, and web applications. 
          Each section is fully responsive and customizable.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <Badge variant="secondary">{sectionCount} Sections</Badge>
          <Badge variant="outline">Responsive</Badge>
          <Badge variant="outline">Customizable</Badge>
        </div>
      </div>
      
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.href} className="group hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  Page Section
                </Badge>
                <div className="flex gap-1">
                  {section.isNew && <Badge variant="default" className="text-xs">New</Badge>}
                  {section.isPro && <Badge variant="secondary" className="text-xs">Pro</Badge>}
                </div>
              </div>
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm leading-relaxed">
                {section.description}
              </CardDescription>
              <Link 
                href={section.href}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View section
                <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {sections.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Page sections are coming soon. Check back later for updates.
          </p>
        </div>
      )}
      
      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Looking for individual components?{" "}
          <Link 
            href="/components" 
            className="font-medium text-primary hover:underline"
          >
            Browse all components
          </Link>
        </p>
      </div>
    </div>
  )
}