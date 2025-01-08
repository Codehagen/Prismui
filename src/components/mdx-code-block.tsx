"use client";

import { useEffect, useState } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import { CodeBlockWrapper } from "./code-block-wrapper";
import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";
import { rehypePrettyCodeConfig } from "@/lib/rehype-pretty-code-config";

interface MdxCodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  notBlur?: boolean;
}

export function MdxCodeBlock({
  code,
  language = "tsx",
  className,
  notBlur = false,
}: MdxCodeBlockProps) {
  const [formattedCode, setFormattedCode] = useState("");

  useEffect(() => {
    unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypePrettyCode, rehypePrettyCodeConfig as any)
      .use(rehypeStringify)
      .process(`\`\`\`${language}\n${code}\n\`\`\``)
      .then((file) => setFormattedCode(String(file)));
  }, [code, language]);

  return (
    <CodeBlockWrapper
      className={cn("group relative", className)}
      notBlur={notBlur}
    >
      <div className="absolute right-4 top-4 z-20">
        <CopyButton value={code} />
      </div>
      <div
        className="overflow-x-auto rounded-lg [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto"
        dangerouslySetInnerHTML={{ __html: formattedCode }}
      />
    </CodeBlockWrapper>
  );
}
