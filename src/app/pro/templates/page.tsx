import { Suspense } from "react";
import { requireProAccess } from "@/lib/pro/auth/user-actions";
import { constructMetadata } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, Eye, Star, Clock, Layers } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = constructMetadata({
  title: "Templates - PrismUI Pro",
  description: "Browse and download premium React templates built with PrismUI Pro components.",
  canonical: "https://www.prismui.tech/pro/templates",
});

function TemplatesSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 bg-muted animate-pulse rounded" />
      <div className="h-16 bg-muted animate-pulse rounded" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    </div>
  );
}

// Template data - in a real app, this would come from a database or API
const templates = [
  {
    id: "portfolio-pro",
    title: "Portfolio Pro",
    description: "A modern portfolio template with smooth animations and responsive design.",
    category: "Portfolio",
    difficulty: "Beginner",
    components: 12,
    lastUpdated: "2025-01-20",
    featured: true,
    preview: "/templates/portfolio-preview.jpg",
    status: "available",
    tags: ["Portfolio", "Personal", "Animation"],
  },
  {
    id: "saas-dashboard",
    title: "SaaS Dashboard",
    description: "Complete dashboard template with charts, tables, and user management.",
    category: "Dashboard",
    difficulty: "Advanced",
    components: 25,
    lastUpdated: "2025-01-18",
    featured: true,
    preview: "/templates/dashboard-preview.jpg",
    status: "coming-soon",
    tags: ["Dashboard", "Analytics", "SaaS"],
  },
  {
    id: "ecommerce-store",
    title: "E-commerce Store",
    description: "Modern e-commerce template with product catalog and checkout flow.",
    category: "E-commerce",
    difficulty: "Intermediate",
    components: 20,
    lastUpdated: "2025-01-15",
    featured: false,
    preview: "/templates/ecommerce-preview.jpg",
    status: "coming-soon",
    tags: ["E-commerce", "Shopping", "Payments"],
  },
  {
    id: "blog-platform",
    title: "Blog Platform",
    description: "Clean blog template with MDX support and dark mode.",
    category: "Blog",
    difficulty: "Beginner",
    components: 8,
    lastUpdated: "2025-01-12",
    featured: false,
    preview: "/templates/blog-preview.jpg",
    status: "coming-soon",
    tags: ["Blog", "Content", "MDX"],
  },
  {
    id: "landing-page",
    title: "SaaS Landing Page",
    description: "High-converting landing page template with pricing and testimonials.",
    category: "Landing",
    difficulty: "Beginner",
    components: 15,
    lastUpdated: "2025-01-10",
    featured: false,
    preview: "/templates/landing-preview.jpg",
    status: "coming-soon",
    tags: ["Landing", "Marketing", "SaaS"],
  },
  {
    id: "admin-panel",
    title: "Admin Panel",
    description: "Comprehensive admin panel with user management and analytics.",
    category: "Admin",
    difficulty: "Advanced",
    components: 30,
    lastUpdated: "2025-01-08",
    featured: false,
    preview: "/templates/admin-preview.jpg",
    status: "coming-soon",
    tags: ["Admin", "Management", "Analytics"],
  },
];

function TemplateCard({ template }: { template: typeof templates[0] }) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <div className="relative overflow-hidden rounded-t-lg bg-muted aspect-video">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <div className="text-6xl opacity-20">🎨</div>
        </div>
        {template.featured && (
          <Badge className="absolute top-2 left-2">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        )}
        {template.status === "coming-soon" && (
          <Badge variant="secondary" className="absolute top-2 right-2">
            Coming Soon
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{template.title}</CardTitle>
          <Badge variant="outline" className={getDifficultyColor(template.difficulty)}>
            {template.difficulty}
          </Badge>
        </div>
        <CardDescription className="text-sm">
          {template.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Layers className="h-4 w-4" />
            {template.components} components
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Updated {new Date(template.lastUpdated).toLocaleDateString()}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {template.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            disabled={template.status === "coming-soon"}
          >
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            disabled={template.status === "coming-soon"}
          >
            <Download className="h-4 w-4 mr-1" />
            {template.status === "coming-soon" ? "Soon" : "Download"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

async function TemplatesContent() {
  const userProfile = await requireProAccess();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
        <p className="text-muted-foreground">
          Premium React templates built with PrismUI Pro components. Download and customize for your projects.
        </p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                className="pl-10"
                disabled
              />
            </div>
            <Select disabled>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="portfolio">Portfolio</SelectItem>
                <SelectItem value="dashboard">Dashboard</SelectItem>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
                <SelectItem value="blog">Blog</SelectItem>
                <SelectItem value="landing">Landing Page</SelectItem>
                <SelectItem value="admin">Admin Panel</SelectItem>
              </SelectContent>
            </Select>
            <Select disabled>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Featured Templates */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Featured Templates</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates
            .filter(template => template.featured)
            .map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
        </div>
      </div>

      {/* All Templates */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">All Templates</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>

      {/* Coming Soon Notice */}
      <Card className="border-dashed">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold mb-2">More Templates Coming Soon</h3>
          <p className="text-sm text-muted-foreground mb-4">
            We're working hard to bring you more high-quality templates. 
            As a Pro member, you'll get access to all new templates at no additional cost.
          </p>
          <Button variant="outline" size="sm" disabled>
            Get Notified (Coming Soon)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <div className="container max-w-7xl py-10">
      <Suspense fallback={<TemplatesSkeleton />}>
        <TemplatesContent />
      </Suspense>
    </div>
  );
}