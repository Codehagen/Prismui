import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  BarChart3,
  ShoppingCart,
  Palette,
  Grid3X3,
  TrendingUp,
  Package,
  Image,
  FileText
} from "lucide-react";

const DashboardIllustration = () => {
  return (
    <Card className="p-4 transition-transform duration-200 group-hover:translate-y-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-sm font-medium">Analytics Dashboard</span>
        </div>
        <Badge variant="outline" className="text-xs">Live</Badge>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: "Revenue", value: "$45.2k", icon: TrendingUp },
          { label: "Users", value: "2,340", icon: Grid3X3 },
          { label: "Growth", value: "+12%", icon: BarChart3 },
        ].map((stat, i) => (
          <div key={i} className="bg-muted/50 rounded-lg p-3">
            <stat.icon className="h-4 w-4 text-muted-foreground mb-1" />
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-sm font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
      
      {/* Chart Preview */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex gap-1 items-end justify-center h-20">
          {[40, 65, 45, 70, 55, 80, 60].map((height, i) => (
            <div
              key={i}
              className="bg-primary/60 rounded-t w-4 transition-all duration-300 hover:bg-primary"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

const EcommerceIllustration = () => {
  return (
    <Card className="p-4">
      {/* Mini Product Grid */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-muted/50 rounded-lg p-3">
            <div className="bg-muted aspect-square rounded mb-2 flex items-center justify-center">
              <Package className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-xs font-medium line-clamp-1">Product {i}</p>
            <p className="text-xs text-muted-foreground">${(i * 29).toFixed(2)}</p>
          </div>
        ))}
      </div>
      
      {/* Cart Button */}
      <Button className="w-full" size="sm">
        <ShoppingCart className="h-4 w-4 mr-2" />
        View Cart (4)
      </Button>
    </Card>
  );
};

const PortfolioIllustration = () => {
  return (
    <Card className="p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-primary/10 rounded-full p-2">
          <Palette className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h4 className="text-sm font-semibold">John Designer</h4>
          <p className="text-xs text-muted-foreground">Creative Portfolio</p>
        </div>
      </div>
      
      {/* Project Grid */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-muted/50 aspect-video rounded flex items-center justify-center">
            <Image className="h-4 w-4 text-muted-foreground" />
          </div>
        ))}
      </div>
      
      {/* Navigation */}
      <div className="flex gap-2 text-xs">
        <Button variant="ghost" size="sm" className="h-7 text-xs">About</Button>
        <Button variant="ghost" size="sm" className="h-7 text-xs">Work</Button>
        <Button variant="ghost" size="sm" className="h-7 text-xs">Contact</Button>
      </div>
    </Card>
  );
};

export function ProTemplateShowcase() {
  return (
    <section>
      <div className="py-24">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Grid3X3 className="h-5 w-5 text-primary" />
              <span className="text-base font-semibold text-primary">Templates</span>
            </div>
            <h2 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
              Empowering Developers with <span className="text-muted-foreground">Premium Templates</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
              Production-ready templates and layouts that accelerate your development workflow. 
              From dashboards to e-commerce, start with proven designs that scale.
            </p>
          </div>
          <div className="mt-16 grid gap-12 sm:grid-cols-2 sm:mt-20">
            {/* Dashboard Template - Featured */}
            <div className="col-span-full space-y-4">
              <Card className="overflow-hidden bg-muted/30 px-6 sm:col-span-2">
                <div className="mx-auto -mt-2 max-w-sm px-2 pt-8 pb-4">
                  <DashboardIllustration />
                </div>
              </Card>
              <div className="max-w-md sm:col-span-3">
                <h3 className="text-foreground text-lg font-semibold">Complete SaaS Dashboard</h3>
                <p className="text-muted-foreground mt-3 text-balance">
                  Production-ready dashboard with charts, analytics, and data visualization components. 
                  Perfect for building modern SaaS applications.
                </p>
              </div>
            </div>

            {/* E-commerce Template */}
            <div className="grid grid-rows-[1fr_auto] space-y-4">
              <Card className="bg-muted/30 p-6">
                <EcommerceIllustration />
              </Card>
              <div>
                <h3 className="text-foreground text-lg font-semibold">E-commerce Platform</h3>
                <p className="text-muted-foreground mt-3 text-balance">
                  Complete online store with product catalog, shopping cart, and checkout flow.
                </p>
              </div>
            </div>

            {/* Portfolio Template */}
            <div className="grid grid-rows-[1fr_auto] space-y-4">
              <Card className="overflow-hidden bg-muted/30 p-6">
                <PortfolioIllustration />
              </Card>
              <div>
                <h3 className="text-foreground text-lg font-semibold">Portfolio & Resume</h3>
                <p className="text-muted-foreground mt-3 text-balance">
                  Showcase your work with a professional portfolio template designed for creatives.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 flex items-center justify-center">
            <Button asChild size="lg">
              <Link href="/pro/login">
                Explore All Templates
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}