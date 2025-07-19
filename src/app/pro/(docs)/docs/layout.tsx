import { DocsNav } from "@/components/docs-nav";
import { docsConfig } from "@/config/docs";
import { DocsSidebar } from "@/components/docs-sidebar";
import { SiteHeader } from "@/components/site-header";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div>
      <SiteHeader />
      
      {/* Mobile docs header - only visible on mobile */}
      <div className="md:hidden border-b bg-background/95 backdrop-blur sticky top-14 z-20">
        <div className="container flex h-12 items-center gap-2">
          <DocsSidebar />
          <span className="text-sm font-medium text-muted-foreground">Documentation</span>
        </div>
      </div>
      
      <div className="container lg:border-x flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="border-grid fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r md:sticky md:block">
          <div className="docs-sidebar-scroll h-full overflow-y-auto py-6 pr-4 lg:py-8">
            <DocsNav config={docsConfig} />
          </div>
        </aside>
        {children}
      </div>
    </div>
  );
}
