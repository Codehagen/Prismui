"use server";

import { templateSchema } from "@/registry/schema";
import { getRegistryItem } from "@/registry";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";

// Helper to check if we're in production
const isProd = process.env.NODE_ENV === "production";

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

        // In production, we need to read from the public directory
        const fullPath = isProd
          ? path.join(process.cwd(), "public/r/v0", name, target)
          : path.join(process.cwd(), "src/registry/app", name, target);

        try {
          const content = await fs.readFile(fullPath, "utf-8");
          return {
            ...file,
            path: filePath,
            content,
            target,
          };
        } catch (error) {
          console.error(`Error reading file ${fullPath}:`, error);
          // If file not found in production path, try development path as fallback
          if (isProd) {
            const devPath = path.join(
              process.cwd(),
              "src/registry/app",
              name,
              target
            );
            const content = await fs.readFile(devPath, "utf-8");
            return {
              ...file,
              path: filePath,
              content,
              target,
            };
          }
          throw error;
        }
      })
    );

    return {
      ...template,
      files,
    };
  } catch (error) {
    console.error(`Error reading template files for ${name}:`, error);
    return null;
  }
}

export async function openInV0Action(formData: FormData) {
  try {
    // Check if V0_API_KEY is set
    if (!process.env.V0_API_KEY) {
      throw new Error("V0_API_KEY is not set in environment variables");
    }

    // Check if author is set
    if (!process.env.NEXT_PUBLIC_V0_TEMPLATES_AUTHOR) {
      throw new Error(
        "NEXT_PUBLIC_V0_TEMPLATES_AUTHOR is not set in environment variables"
      );
    }

    const name = z.string().parse(formData.get("name"));
    console.log("Template name:", name);

    const template = await getTemplateFiles(name);

    if (!template) {
      throw new Error(`Template ${name} not found or files could not be read.`);
    }

    console.log("Found template:", JSON.stringify(template, null, 2));

    const payload = templateSchema.parse({
      ...template,
      meta: {
        ...template.meta,
        author: process.env.NEXT_PUBLIC_V0_TEMPLATES_AUTHOR,
      },
    });

    console.log("Parsed payload:", JSON.stringify(payload, null, 2));
    console.log(
      "Request payload:",
      JSON.stringify(
        {
          version: 3,
          template: payload,
        },
        null,
        2
      )
    );

    console.log(
      "Sending request to V0 with API key:",
      process.env.V0_API_KEY?.slice(0, 4) + "..."
    );

    const response = await fetch(`https://v0.dev/chat/api/templates/open`, {
      method: "POST",
      body: JSON.stringify({
        version: 3,
        template: payload,
      }),
      headers: {
        "x-v0-edit-secret": process.env.V0_API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error(
          "Invalid V0 API key. Please check your V0_API_KEY environment variable."
        );
      }

      const errorText = await response.text();
      console.error("Error response status:", response.status);
      console.error(
        "Error response headers:",
        Object.fromEntries(response.headers.entries())
      );
      console.error("Error response from V0:", errorText);
      try {
        const errorJson = JSON.parse(errorText);
        console.error(
          "Parsed error response:",
          JSON.stringify(errorJson, null, 2)
        );
      } catch (e) {
        console.error("Could not parse error response as JSON");
      }
      throw new Error(`V0 API error: ${errorText}`);
    }

    const result = await response.json();
    console.log("Success response:", JSON.stringify(result, null, 2));

    const data = z
      .object({
        url: z.string(),
      })
      .parse(result);

    return {
      error: null,
      url: data.url,
    };
  } catch (error) {
    console.error("V0 Action Error:", error);
    if (error instanceof z.ZodError) {
      console.error(
        "Zod validation errors:",
        JSON.stringify(error.errors, null, 2)
      );
      return {
        error: error.errors[0].message,
        url: null,
      };
    }

    if (error instanceof Error) {
      return { error: error.message, url: null };
    }

    return {
      error: "Something went wrong. Please try again later.",
      url: null,
    };
  }
}
