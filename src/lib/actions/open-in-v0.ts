"use server";

import { templateSchema } from "@/registry/schema";
import { getRegistryItem } from "@/registry";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";

async function getTemplateFiles(name: string) {
  const template = getRegistryItem(name);
  if (!template || !template.files) return null;

  try {
    const files = await Promise.all(
      template.files.map(async (file) => {
        const filePath = typeof file === "string" ? file : file.path;
        const target = typeof file === "string" ? file : file.target;

        if (!target) {
          throw new Error(`Missing target for file in template ${name}`);
        }

        // Try multiple possible paths for the template files
        const possiblePaths = [
          // Development path
          path.join(process.cwd(), "src/registry/app", name, target),
          // Production path
          path.join(process.cwd(), "public/r/v0", name, target),
          // Alternative production path
          path.join(process.cwd(), ".next/server/app/r/v0", name, target),
        ];

        let content = "";
        let foundPath = "";

        // Try each path until we find one that exists
        for (const tryPath of possiblePaths) {
          try {
            content = await fs.readFile(tryPath, "utf-8");
            foundPath = tryPath;
            break;
          } catch (e) {
            // Continue to next path
            continue;
          }
        }

        if (!content) {
          throw new Error(
            `Could not find template file at any of the expected locations for ${name}/${target}`
          );
        }

        return {
          ...file,
          path: filePath,
          content,
          target,
        };
      })
    );

    return {
      ...template,
      files,
    };
  } catch (error) {
    console.error(`Error reading template files for ${name}:`, error);
    throw error;
  }
}

const formSchema = z.object({
  name: z.string(),
});

export async function openInV0Action(formData: FormData) {
  try {
    const { name } = formSchema.parse(Object.fromEntries(formData));

    const template = await getTemplateFiles(name);
    if (!template) {
      return {
        error: `Template ${name} not found`,
      };
    }

    const payload = templateSchema.parse(template);

    const response = await fetch("https://v0.dev/api/templates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.V0_API_KEY}`,
      },
      body: JSON.stringify({
        version: 3,
        template: payload,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return {
        error: `Failed to open template in v0: ${error}`,
      };
    }

    const data = await response.json();

    return {
      url: data.url,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
    return {
      error: "An unknown error occurred",
    };
  }
}
