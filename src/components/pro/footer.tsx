import Link from "next/link"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const footerSections = {
  resources: {
    title: "Resources",
    links: [
      { href: "/pro/docs", label: "Documentation" },
      { href: "/pro/components", label: "Components" },
      { href: "/pro/templates", label: "Templates" },
      { href: "/pro/examples", label: "Examples" },
      { href: "/pro/changelog", label: "Changelog" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { href: "/pro/help", label: "Help Center" },
      { href: "/pro/contact", label: "Contact Us" },
      { href: "/pro/status", label: "System Status" },
      { href: "mailto:support@prismui.pro", label: "Email Support" },
      { href: "/pro/roadmap", label: "Roadmap" },
    ],
  },
  account: {
    title: "Account",
    links: [
      { href: "/pro/billing", label: "Billing" },
      { href: "/pro/settings", label: "Settings" },
      { href: "/pro/usage", label: "Usage" },
      { href: "/pro/downloads", label: "Downloads" },
      { href: "/pro/api-keys", label: "API Keys" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { href: "/pro/privacy", label: "Privacy Policy" },
      { href: "/pro/terms", label: "Terms of Service" },
      { href: "/pro/license", label: "License" },
      { href: "/pro/security", label: "Security" },
      { href: "/pro/compliance", label: "Compliance" },
    ],
  },
}

export function ProFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/pro" className="flex items-center space-x-2 mb-4">
              <Icons.logo className="h-6 w-6" />
              <span className="font-bold text-lg">PrismUI</span>
              <Badge variant="default" className="text-xs">Pro</Badge>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Professional React components and templates for building exceptional user interfaces faster.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Stay updated</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button size="sm" className="shrink-0">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key} className="space-y-3">
              <h4 className="text-sm font-semibold">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024 PrismUI Pro. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back to main site
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/prismui/prismui"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icons.github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://twitter.com/prismui"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icons.twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="/pro/help"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icons.book className="h-5 w-5" />
                <span className="sr-only">Help</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}