"use client";

import ActionButton from "./component/action-button";
import { useState } from "react";

export default function ActionButtonPage() {
  const [isPending, setIsPending] = useState(false);

  const handleClick = () => {
    setIsPending(true);
    setTimeout(() => setIsPending(false), 2000); // Simulate loading
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 gap-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Action Button</h1>
        <p className="text-muted-foreground">
          A button component with loading state and animations.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <ActionButton
          isPending={isPending}
          onClick={handleClick}
          variant="default"
          size="lg"
        >
          Click me
        </ActionButton>

        <ActionButton
          isPending={isPending}
          onClick={handleClick}
          variant="outline"
          size="default"
        >
          Submit Form
        </ActionButton>

        <ActionButton
          isPending={isPending}
          onClick={handleClick}
          variant="secondary"
          size="sm"
        >
          Save Changes
        </ActionButton>
      </div>
    </div>
  );
}