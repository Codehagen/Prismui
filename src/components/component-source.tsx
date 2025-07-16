"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getRegistryItem } from "@/registry";
import rehypePrettyCode from "rehype-pretty-code";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { CopyButton } from "./copy-button";
import { CopyCliButton } from "./copy-cli-button";
import { CodeBlockWrapper } from "./code-block-wrapper";
import { prettyCodeOptions } from "@/lib/content-collections/pretty-code-options";

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  isCli?: boolean;
}

async function formatCode(code: string, language = "tsx") {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, prettyCodeOptions)
    .use(rehypeStringify)
    .process(`\`\`\`${language}\n${code}\n\`\`\``);

  return String(file);
}

export function ComponentSource({
  name,
  className,
  isCli = false,
  ...props
}: ComponentSourceProps) {
  const [formattedCode, setFormattedCode] = useState("");
  const registryItem = getRegistryItem(name);

  useEffect(() => {
    if (registryItem) {
      const code = isCli
        ? typeof registryItem.cli === "string"
          ? registryItem.cli
          : registryItem.cli?.npm
        : registryItem.code;
      if (code) {
        formatCode(code, isCli ? "shell" : "tsx").then(setFormattedCode);
      }
    }
  }, [registryItem, isCli]);

  if (!registryItem) {
    return (
      <p className="text-sm text-muted-foreground">
        Component {name} not found in registry.
      </p>
    );
  }

  const codeToDisplay = isCli ? registryItem.cli : registryItem.code;

  if (!codeToDisplay) {
    return (
      <p className="text-sm text-muted-foreground">
        No {isCli ? "CLI command" : "code"} available for {name}.
      </p>
    );
  }

  if (isCli) {
    return (
      <div className={cn("group relative", className)} {...props}>
        <div className="absolute right-4 top-4 z-20">
          <CopyCliButton commands={codeToDisplay} />
        </div>
        <div
          className="overflow-x-auto rounded-lg [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto"
          dangerouslySetInnerHTML={{ __html: formattedCode }}
        />
      </div>
    );
  }

  return (
    <CodeBlockWrapper className={cn("group relative", className)} {...props}>
      <div className="absolute right-4 top-4 z-20">
        <CopyButton value={codeToDisplay as string} />
      </div>
      <div
        className="overflow-x-auto rounded-lg [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto"
        dangerouslySetInnerHTML={{ __html: formattedCode }}
      />
    </CodeBlockWrapper>
  );
}
