import { bundleMDX } from "mdx-bundler";

export async function getMDXContent(content: string) {
  const result = await bundleMDX({ source: content });
  return result;
}
