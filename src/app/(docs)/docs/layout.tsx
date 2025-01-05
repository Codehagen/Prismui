import { DocsNav } from "@/components/docs-nav";
import { docsConfig } from "@/config/docs";
import { DocsSidebar } from "@/components/docs-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div>
      <div className="container lg:border-x flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="border-grid fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r md:sticky md:block">
          <ScrollArea className="h-full py-6 pr-4 lg:py-8">
            <DocsNav config={docsConfig} />
          </ScrollArea>
        </aside>
        {children}
      </div>
    </div>
  );
}
