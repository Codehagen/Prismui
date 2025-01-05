"use client";

import * as React from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { getRegistryItem } from "@/registry";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import { CopyButton } from "./copy-button";

interface RegistryFile {
  path: string;
  type: string;
  content: string;
}

interface SectionPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
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

export function SectionPreview({
  name,
  align = "center",
  preview = false,
  height = "md",
  className,
  ...props
}: SectionPreviewProps) {
  const [key, setKey] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState("preview");
  const [formattedCode, setFormattedCode] = React.useState("");
  const [formattedFiles, setFormattedFiles] = React.useState<
    Record<string, string>
  >({});
  const section = getRegistryItem(name);
  const SectionComponent = section?.component;

  React.useEffect(() => {
    if (section?.code) {
      formatCode(section.code).then(setFormattedCode);
    }
    if (section?.files) {
      section.files.forEach((file) => {
        if (typeof file !== "string" && file.content) {
          formatCode(file.content).then((formatted) => {
            setFormattedFiles((prev) => ({
              ...prev,
              [file.path]: formatted,
            }));
          });
        }
      });
    }
  }, [section?.code, section?.files]);

  const getHeight = React.useMemo(() => {
    switch (height) {
      case "sm":
        return "min-h-[350px]";
      case "md":
        return "min-h-[450px]";
      case "lg":
        return "min-h-[550px]";
      case "xl":
        return "min-h-[650px]";
      default:
        return height.startsWith("min-h-") ? height : `min-h-[${height}]`;
    }
  }, [height]);

  if (!section || !SectionComponent) {
    return null;
  }

  return (
    <div
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
      {...props}
    >
      <Tabs
        defaultValue="preview"
        className="relative mr-auto w-full"
        value={activeTab}
        onValueChange={setActiveTab}
      >
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
        <TabsContent
          value="preview"
          className="relative rounded-md border"
          key={key}
        >
          <div
            className={cn("preview flex w-full justify-center p-0", getHeight)}
          >
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
            <div
              className={cn("w-full", {
                "flex justify-center": align === "center",
                "flex justify-start": align === "start",
                "flex justify-end": align === "end",
              })}
            >
              <SectionComponent />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="group relative">
            <div className="absolute right-4 top-4 z-20">
              <CopyButton value={section.code || ""} />
            </div>
            <div className="mb-4">
              <div className="text-sm font-semibold mb-2">
                Section Component
              </div>
              <div
                className="overflow-x-auto rounded-lg [&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:overflow-auto"
                dangerouslySetInnerHTML={{ __html: formattedCode }}
              />
            </div>
            {section.files?.map((file, index) => {
              if (typeof file === "string") return null;
              return (
                <React.Fragment key={file.path}>
                  <div className="text-sm font-semibold mb-2 mt-6">
                    {file.path}
                  </div>
                  <div
                    className="overflow-x-auto rounded-lg [&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:overflow-auto"
                    dangerouslySetInnerHTML={{
                      __html: formattedFiles[file.path] || "",
                    }}
                  />
                </React.Fragment>
              );
            })}
            {section.dependencies && section.dependencies.length > 0 && (
              <div className="mt-6">
                <div className="text-sm font-semibold mb-2">Dependencies</div>
                <div className="text-sm text-muted-foreground">
                  {section.dependencies.join(", ")}
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
