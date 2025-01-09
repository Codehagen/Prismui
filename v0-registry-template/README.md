# v0 registry template

Use this template to build your own registry of v0-compatible templates. Every template comes with its own `Open in v0` button.

You build templates and open them in v0 for prompting.

## Usage

1. Clone this repository
2. Run `pnpm install`
3. Visit https://v0.dev/chat/keys to get your API key
4. Add your API key to the `V0_API_KEY` environment variable
5. Run `pnpm dev`

This will start a development and templates server on `http://localhost:3000`.

## Adding a template

1. To add a template, create a new folder in the `app/registry` directory e.g `app/registry/app-01`.
2. Build your template. Here's an example template structure:

```
app/registry/app-01
├── app
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components
│   └── post-form.tsx
├── lib
│   └── format-date.ts
└── hooks
    └── use-clipboard.tsx
```

3. Next, define your template in the `app/registry/index.ts` file.

```ts
export const registry = [
  {
    name: "app-01",
    type: "registry:block",
    title: "App 01",
    description: "A simple app with a post form.",
    files: [
      {
        path: "app/page.tsx",
        type: "registry:page",
        target: "app/page.tsx",
      },
      {
        path: "app/layout.tsx",
        type: "registry:page",
        target: "app/layout.tsx",
      },
      {
        path: "components/post-form.tsx",
        type: "registry:component",
      },
      {
        path: "lib/format-date.ts",
        type: "registry:lib",
      },
      {
        path: "hooks/use-clipboard.tsx",
        type: "registry:hook",
      },
    ],
  },
]
```

4. Run `pnpm dev` to start the development server.
5. Visit `http://localhost:3000` to see your template.
6. Use the `Open in v0` button to open your template in v0 for prompting.

## Examples

You can see examples of how to build your own templates in the `app/registry` directory.

- [example-login](app/registry/example-login) - A login form using custom css variables.
- [example-chatbot](app/registry/example-chatbot): A chatbot built with OpenAI and the AI SDK. Uses api routes.
- [example-forms](app/registry/example-forms) - A form with zod validation and form actions.

## Rules

1. Every template must have an `app/page.tsx` and `app/layout.tsx` files.
2. The `app/page.tsx` must be the first entry in `files` array.
3. Remember to set a `target` for each `registry:page` file.
4. For any file that does not fall into a defined type like `registry:page`, `registry:component`, `registry:lib`, `registry:hook`, you can set the `type` to `registry:page` and set the `target` to the file path.

## CSS Variables

You can bring your own `globals.css` file and use CSS variables in your templates.

1. Add a `globals.css` file at `app/registry/TEMPLATE_NAME/app/globals.css` .
2. Place your CSS variables in the `globals.css` file.
3. Import the `globals.css` file in your `app/registry/TEMPLATE_NAME/app/layout.tsx` file.
4. Add the `globals.css` file to the `files` array in your `app/registry/index.ts` file.

```ts
files: [
  {
    path: "example-login/app/globals.css",
    type: "registry:page",
    target: "app/globals.css",
  },
]
```

## API Routes

You can use API routes using [Next.js route handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers).

1. Place your API routes in the `registry/TEMPLATE_NAME/app/api` directory.
2. When you call your API route, use the full `/registry/TEMPLATE_NAME/api/...` path.
3. To make it work in v0, use the `@replacer` transfomer.

Here's an example:

```ts
// @replacer /registry/example-chatbot/api/chat /api/chat
const { messages, input, setInput, append } = useChat({
  api: "/registry/example-chatbot/api/chat",
})
```

The `// @replacer /registry/example-chatbot/api/chat /api/chat` comment transform any `/registry/example-chatbot/api/chat` calls to the correct path.

## Environment Variables

To use environment variables in your templates:

1. Add the environment variable to `.env.local`
2. Use as you would normally in your code.
3. Add the environment variable to the `meta.env` array in your `app/registry/index.ts` file.

```ts
meta: {
  env: [
    {
      name: "OPENAI_API_KEY",
      url: "https://platform.openai.com/api-keys",
    },
  ],
}
```

4. Open in v0
5. Add your chat to a project and add your environment variables to the project.
6. When you visit the chat, you will be prompted to sync the environment variables.
7. Sync and refresh the chat.
