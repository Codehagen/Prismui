"use server";

import { templateSchema } from "@/registry/schema";
import { z } from "zod";

async function getTemplateFromRegistry(name: string) {
  try {
    // Fetch the registry data from public/r/registry.json
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/r/registry.json`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch registry data");
    }

    const registry = await response.json();
    const template = registry.find((item: any) => item.name === name);

    if (!template) {
      throw new Error(`Template ${name} not found in registry`);
    }

    return template;
  } catch (error) {
    console.error("Error fetching template from registry:", error);
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

    const template = await getTemplateFromRegistry(name);

    if (!template) {
      throw new Error(`Template ${name} not found or could not be loaded.`);
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
