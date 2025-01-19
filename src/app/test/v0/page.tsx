import { OpenInV0Button } from "@/components/open-in-v0-button";
import { HelloWorld } from "../../../../registry/hello-world/hello-world";
import { HeroBadgeDemo } from "../../../../registry/hero-badge/demo";

export default function TestV0Page() {
  return (
    <div className="container mx-auto py-12 space-y-12">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-bold">Test V0 Integration</h1>
        <p className="text-muted-foreground">
          Click the buttons below to open components in v0.dev
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Hello World Component</h2>
            <OpenInV0Button url="http://localhost:3000/r/hello-world.json" />
          </div>
          <div className="border rounded-lg p-6 bg-background">
            <HelloWorld />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Hero Badge Component</h2>
            <OpenInV0Button url="http://localhost:3000/r/hero-badge.json" />
          </div>
          <div className="border rounded-lg p-6 bg-background">
            <HeroBadgeDemo />
          </div>
        </div>
      </div>
    </div>
  );
}
