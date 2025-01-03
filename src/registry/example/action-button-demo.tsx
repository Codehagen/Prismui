"use client";

import { useState } from "react";
import ActionButton from "@/components/prismui/action-button";
import { Card } from "@/components/ui/card";

export default function ActionButtonDemo() {
  const [isPending, setIsPending] = useState<Record<string, boolean>>({});

  function handleClick(id: string) {
    setIsPending((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setIsPending((prev) => ({ ...prev, [id]: false }));
    }, 1500);
  }

  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-4">
      <Card className="w-full max-w-3xl p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium">Default</span>
            <ActionButton
              onClick={() => handleClick("default")}
              isPending={isPending["default"]}
            >
              Submit
            </ActionButton>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium">Secondary</span>
            <ActionButton
              variant="secondary"
              onClick={() => handleClick("secondary")}
              isPending={isPending["secondary"]}
            >
              Save Changes
            </ActionButton>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium">Destructive</span>
            <ActionButton
              variant="destructive"
              onClick={() => handleClick("destructive")}
              isPending={isPending["destructive"]}
            >
              Delete
            </ActionButton>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium">Outline</span>
            <ActionButton
              variant="outline"
              onClick={() => handleClick("outline")}
              isPending={isPending["outline"]}
            >
              Export
            </ActionButton>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium">Ghost</span>
            <ActionButton
              variant="ghost"
              onClick={() => handleClick("ghost")}
              isPending={isPending["ghost"]}
            >
              Cancel
            </ActionButton>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium">Link</span>
            <ActionButton
              variant="link"
              onClick={() => handleClick("link")}
              isPending={isPending["link"]}
            >
              Learn More
            </ActionButton>
          </div>
        </div>
      </Card>
    </div>
  );
}

export const demoSource = `"use client";

import { useState } from "react";
import ActionButton from "@/components/prismui/action-button";
import { Card } from "@/components/ui/card";

export default function ActionButtonDemo() {
  const [isPending, setIsPending] = useState<Record<string, boolean>>({});

  function handleClick(id: string) {
    setIsPending((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setIsPending((prev) => ({ ...prev, [id]: false }));
    }, 1500);
  }

  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-4">
      <Card className="w-full max-w-3xl p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium">Default</span>
            <ActionButton
              onClick={() => handleClick("default")}
              isPending={isPending["default"]}
            >
              Submit
            </ActionButton>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium">Secondary</span>
            <ActionButton
              variant="secondary"
              onClick={() => handleClick("secondary")}
              isPending={isPending["secondary"]}
            >
              Save Changes
            </ActionButton>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium">Destructive</span>
            <ActionButton
              variant="destructive"
              onClick={() => handleClick("destructive")}
              isPending={isPending["destructive"]}
            >
              Delete
            </ActionButton>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium">Outline</span>
            <ActionButton
              variant="outline"
              onClick={() => handleClick("outline")}
              isPending={isPending["outline"]}
            >
              Export
            </ActionButton>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium">Ghost</span>
            <ActionButton
              variant="ghost"
              onClick={() => handleClick("ghost")}
              isPending={isPending["ghost"]}
            >
              Cancel
            </ActionButton>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium">Link</span>
            <ActionButton
              variant="link"
              onClick={() => handleClick("link")}
              isPending={isPending["link"]}
            >
              Learn More
            </ActionButton>
          </div>
        </div>
      </Card>
    </div>
  );
}`;
