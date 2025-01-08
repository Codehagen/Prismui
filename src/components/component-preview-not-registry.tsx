"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";
import { PreviewRegistryKeys, previewRegistry } from "@/lib/preview-registry";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { MdxCodeBlock } from "@/components/mdx-code-block";

interface ComponentPreviewNotRegistryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The name of the component in the preview registry
   */
  name: PreviewRegistryKeys;
  /**
   * Whether to align the component in the center
   */
  align?: "center" | "start" | "end";
}

export function ComponentPreviewNotRegistry({
  name,
  align = "center",
  className,
  ...props
}: ComponentPreviewNotRegistryProps) {
  const [key, setKey] = React.useState(0);
  const preview = previewRegistry[name];
  const Component = preview.component;
  const source = preview.source;

  return (
    <div
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" className="relative rounded-md border">
          <div
            className={cn(
              "preview flex min-h-[350px] w-full justify-center p-10",
              {
                "items-center": align === "center",
                "items-start": align === "start",
                "items-end": align === "end",
              }
            )}
          >
            <Component key={key} />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setKey((k) => k + 1)}
            className="absolute right-4 top-4 size-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/50"
          >
            <RefreshCw className="size-4" />
          </Button>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
              <div className="flex items-center justify-between px-4 py-2">
                <div className="space-x-1">
                  <div className="text-sm text-muted-foreground">tsx</div>
                </div>
                <CopyButton value={source} />
              </div>
              <MdxCodeBlock code={source} language="tsx" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
