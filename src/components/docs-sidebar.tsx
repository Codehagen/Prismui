"use client";

import * as React from "react";
import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DocsNav } from "@/components/docs-nav";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";

export function DocsSidebar() {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 md:hidden"
        >
          <Book className="h-4 w-4" />
          <span className="sr-only">Toggle Documentation Menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-background/90 h-[calc(100vh-4rem)] w-[calc(100vw-2rem)] overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100"
        align="end"
        side="bottom"
        alignOffset={-16}
        sideOffset={14}
      >
        <div className="flex flex-col gap-6 overflow-auto px-6 py-6">
          <div className="flex flex-col gap-4">
            <div className="text-lg font-semibold">Documentation</div>
            <div className="text-muted-foreground text-sm">
              Browse components and guides
            </div>
          </div>
          <div className="docs-sidebar-scroll overflow-y-auto">
            <DocsNav config={docsConfig} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
