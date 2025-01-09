import { Registry } from "@/lib/registry/schema"

export const registry = [
  {
    name: "example-forms",
    type: "registry:block",
    title: "Next.js + Forms",
    description: "Server actions and Zod validation.",
    files: [
      {
        path: "example-forms/app/page.tsx",
        type: "registry:page",
        target: "app/page.tsx",
      },
      {
        path: "example-forms/app/layout.tsx",
        type: "registry:page",
        target: "app/layout.tsx",
      },
      {
        path: "example-forms/components/contact-form.tsx",
        type: "registry:component",
      },
      {
        path: "example-forms/lib/actions.ts",
        type: "registry:lib",
      },
      {
        path: "example-forms/lib/schema.ts",
        type: "registry:lib",
      },
    ],
  },
  {
    name: "example-login",
    type: "registry:block",
    title: "Login form with Apple and Google auth",
    description: "A single-page login form made with shadcn/ui.",
    registryDependencies: ["button", "input"],
    files: [
      {
        path: "example-login/app/page.tsx",
        type: "registry:page",
        target: "app/page.tsx",
      },
      {
        path: "example-login/app/layout.tsx",
        type: "registry:page",
        target: "app/layout.tsx",
      },
      {
        path: "example-login/app/globals.css",
        type: "registry:page",
        target: "app/globals.css",
      },
      {
        path: "example-login/components/login-form.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "example-chatbot",
    type: "registry:block",
    title: "OpenAI and AI SDK Chatbot",
    description: "Chatbot built using the AI SDK and gpt-4o-mini.",
    dependencies: ["openai", "ai"],
    files: [
      {
        path: "example-chatbot/page.tsx",
        type: "registry:page",
        target: "app/page.tsx",
      },
      {
        path: "example-chatbot/layout.tsx",
        type: "registry:page",
        target: "app/layout.tsx",
      },
      {
        path: "example-chatbot/components/chat-form.tsx",
        type: "registry:component",
      },
      {
        path: "example-chatbot/components/autoresize-textarea.tsx",
        type: "registry:component",
      },
      {
        path: "example-chatbot/api/chat/route.ts",
        type: "registry:page",
        target: "app/api/chat/route.ts",
      },
    ],
    meta: {
      env: [
        {
          name: "OPENAI_API_KEY",
          url: "https://platform.openai.com/api-keys",
        },
      ],
    },
  },
] satisfies Registry
