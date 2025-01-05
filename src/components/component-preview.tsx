"use client";

import * as React from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { getRegistryItem } from "@/registry";
import rehypePrettyCode from "rehype-pretty-code";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { CopyButton } from "./copy-button";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  align?: "center" | "start" | "end";
  preview?: boolean;
  height?: "sm" | "md" | "lg" | "xl" | string;
}

async function formatCode(code: string, language = "tsx") {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      keepBackground: true,
      onVisitLine(node) {
        if (node.children.length === 0) {
          node.children = [{ type: "text", value: " " }];
        }
      },
      onVisitHighlightedLine(node) {
        if (!node.properties.className) {
          node.properties.className = [];
        }
        node.properties.className.push("line--highlighted");
      },
      onVisitHighlightedChars(node) {
        if (!node.properties.className) {
          node.properties.className = [];
        }
        node.properties.className = ["word--highlighted"];
      },
    })
    .use(rehypeStringify)
    .process(`\`\`\`${language}\n${code}\n\`\`\``);

  return String(file);
}

export function ComponentPreview({
  name,
  children,
  className,
  align = "center",
  preview = false,
  height = "md",
  ...props
}: ComponentPreviewProps) {
  const [key, setKey] = React.useState(0);
  const [formattedCode, setFormattedCode] = React.useState("");

  // Get the component from registry
  const registryItem = getRegistryItem(name);
  const Component = registryItem?.component;

  React.useEffect(() => {
    if (registryItem?.code) {
      formatCode(registryItem.code).then(setFormattedCode);
    }
  }, [registryItem?.code]);

  const getHeight = React.useMemo(() => {
    switch (height) {
      case "sm":
        return "min-h-[250px]";
      case "md":
        return "min-h-[350px]";
      case "lg":
        return "min-h-[450px]";
      case "xl":
        return "min-h-[550px]";
      default:
        return height.startsWith("min-h-") ? height : `min-h-[${height}]`;
    }
  }, [height]);

  return (
    <div
      className={cn("relative my-4 flex flex-col space-y-2", className)}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        {!preview && (
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
        )}
        <TabsContent value="preview" className="relative" key={key}>
          <div className="relative rounded-lg border bg-background">
            <div className="absolute right-4 top-4 z-10">
              <Button
                onClick={() => setKey((prev) => prev + 1)}
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-background shadow-md"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            <div className="overflow-hidden rounded-lg p-8">
              <div
                className={cn("flex w-full", getHeight, {
                  "justify-center": align === "center",
                  "justify-start": align === "start",
                  "justify-end": align === "end",
                })}
              >
                {Component ? <Component /> : children}
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="group relative">
            <div className="absolute right-4 top-4 z-20">
              <CopyButton value={registryItem?.code || ""} />
            </div>
            <div
              className="overflow-x-auto rounded-lg [&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:overflow-auto"
              dangerouslySetInnerHTML={{ __html: formattedCode }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
