"use server";

import { templateSchema } from "@/registry/schema";
import { getRegistryItem } from "@/registry";
import { z } from "zod";

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
    const template = await getRegistryItem(name);

    if (!template) {
      throw new Error(`Template ${name} not found.`);
    }

    const payload = templateSchema.parse({
      ...template,
      meta: {
        ...template.meta,
        author: process.env.NEXT_PUBLIC_V0_TEMPLATES_AUTHOR,
      },
    });

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
      console.error("Error response from V0:", errorText);
      throw new Error(`V0 API error: ${errorText}`);
    }

    const result = await response.json();

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
