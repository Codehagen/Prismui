"use server"

import { templateSchema } from "@/lib/registry/schema"
import { getTemplate } from "@/lib/templates"
import { z } from "zod"

export async function openInV0Action(formData: FormData) {
  try {
    const name = z.string().parse(formData.get("name"))
    const template = await getTemplate(name)

    if (!template) {
      throw new Error(`Template ${name} not found.`)
    }

    const payload = templateSchema.parse({
      ...template,
      meta: {
        ...template.meta,
        author: process.env.NEXT_PUBLIC_V0_TEMPLATES_AUTHOR,
      },
    })

    const response = await fetch(`https://v0.dev/chat/api/templates/open`, {
      method: "POST",
      body: JSON.stringify({
        version: 3,
        template: payload,
      }),
      headers: {
        "x-v0-edit-secret": process.env.V0_API_KEY!,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Unauthorized")
      }

      console.error("Eror fetching /api/templates/open:", await response.text())

      throw new Error("Something went wrong. Please try again later.")
    }

    const result = await response.json()

    const data = z
      .object({
        url: z.string(),
      })
      .parse(result)

    return {
      error: null,
      url: data.url,
    }
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return {
        error: error.errors[0].message,
        url: null,
      }
    }

    if (error instanceof Error) {
      return { error: error.message, url: null }
    }

    return { error: "Something went wrong. Please try again later.", url: "" }
  }
}
