"use server";

import { templateSchema } from "@/registry/schema";
import { getRegistryItem } from "@/registry";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";

// Helper to check if we're in production
const isProd = process.env.NODE_ENV === "production";

async function getTemplateFiles(name: string) {
  console.log(`[v0] Getting template files for: ${name}`);
  console.log(`[v0] Environment: ${isProd ? "production" : "development"}`);
  console.log(`[v0] Current working directory: ${process.cwd()}`);

  const template = getRegistryItem(name);
  if (!template || !template.files) {
    console.error(`[v0] Template not found or has no files: ${name}`);
    return null;
  }

  console.log(`[v0] Found template with ${template.files.length} files`);

  try {
    const files = await Promise.all(
      template.files.map(async (file) => {
        const filePath = typeof file === "string" ? file : file.path;
        const target = typeof file === "string" ? file : file.target;

        if (!target) {
          throw new Error(`Missing target for file in template ${name}`);
        }

        // In production, read from public/r/v0 directory
        const prodPath = path.join(process.cwd(), "public/r/v0", name, target);
        console.log(
          `[v0] Attempting to read file from production path: ${prodPath}`
        );

        try {
          // Check if file exists before reading
          try {
            await fs.access(prodPath);
            console.log(`[v0] File exists at production path: ${prodPath}`);
          } catch (accessError) {
            console.log(
              `[v0] File does not exist at production path: ${prodPath}`
            );
          }

          const content = await fs.readFile(prodPath, "utf-8");
          console.log(
            `[v0] Successfully read file from production path: ${prodPath}`
          );
          return {
            ...file,
            path: filePath,
            content,
            target,
          };
        } catch (error) {
          console.error(`[v0] Error reading file ${prodPath}:`, error);
          console.log(`[v0] Directory contents for ${path.dirname(prodPath)}:`);
          try {
            const dirContents = await fs.readdir(path.dirname(prodPath));
            console.log(dirContents);
          } catch (dirError) {
            console.error(`[v0] Could not read directory:`, dirError);
          }

          // If in production, try development path as fallback
          if (isProd) {
            const devPath = path.join(
              process.cwd(),
              "src/registry/app",
              name,
              target
            );
            console.log(
              `[v0] Attempting to read file from development path: ${devPath}`
            );

            try {
              // Check if file exists before reading
              try {
                await fs.access(devPath);
                console.log(`[v0] File exists at development path: ${devPath}`);
              } catch (accessError) {
                console.log(
                  `[v0] File does not exist at development path: ${devPath}`
                );
              }

              const content = await fs.readFile(devPath, "utf-8");
              console.log(
                `[v0] Successfully read file from development path: ${devPath}`
              );
              return {
                ...file,
                path: filePath,
                content,
                target,
              };
            } catch (devError) {
              console.error(
                `[v0] Error reading from development path ${devPath}:`,
                devError
              );
              console.log(
                `[v0] Directory contents for ${path.dirname(devPath)}:`
              );
              try {
                const dirContents = await fs.readdir(path.dirname(devPath));
                console.log(dirContents);
              } catch (dirError) {
                console.error(`[v0] Could not read directory:`, dirError);
              }
              throw error;
            }
          } else {
            // In development, read from src/registry/app
            const devPath = path.join(
              process.cwd(),
              "src/registry/app",
              name,
              target
            );
            console.log(`[v0] Development mode: reading from ${devPath}`);
            const content = await fs.readFile(devPath, "utf-8");
            console.log(
              `[v0] Successfully read file in development mode: ${devPath}`
            );
            return {
              ...file,
              path: filePath,
              content,
              target,
            };
          }
        }
      })
    );

    console.log(`[v0] Successfully processed all files for template: ${name}`);
    return {
      ...template,
      files,
    };
  } catch (error) {
    console.error(`[v0] Error reading template files for ${name}:`, error);
    console.error(
      `[v0] Stack trace:`,
      error instanceof Error ? error.stack : "No stack trace"
    );
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
