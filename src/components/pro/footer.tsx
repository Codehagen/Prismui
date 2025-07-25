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
    ],
  },
  support: {
    title: "Support",
    links: [
      { href: "mailto:support@prismui.pro", label: "Email Support" },
      { href: "https://github.com/prismui/prismui/issues", label: "GitHub Issues" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
}

export function ProFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="col-span-2">
            <Link href="/pro" className="flex items-center space-x-2 mb-4">
              <Icons.logo className="h-6 w-6" />
              <span className="font-bold text-lg">PrismUI</span>
              <Badge variant="default" className="text-xs">Pro</Badge>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Professional React components and templates for building exceptional user interfaces faster.
            </p>
            
            <div className="flex items-center gap-4 mt-6">
              <Button asChild size="sm">
                <Link href="/pro/upgrade">
                  Upgrade to Pro
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href="/pro/docs">
                  View Docs
                </Link>
              </Button>
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
                href="/pro/docs"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icons.book className="h-5 w-5" />
                <span className="sr-only">Documentation</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}