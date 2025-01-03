"use client";

import { useState } from "react";
import ActionButton from "@/components/prismui/action-button";

export default function ActionButtonBasic() {
  const [isPending, setIsPending] = useState(false);

  function handleClick() {
    setIsPending(true);
    setTimeout(() => setIsPending(false), 1500);
  }

  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      <ActionButton onClick={handleClick} isPending={isPending}>
        Submit
      </ActionButton>
    </div>
  );
}

export const demoSource = `"use client";

import { useState } from "react";
import ActionButton from "@/components/prismui/action-button";

export default function ActionButtonBasic() {
  const [isPending, setIsPending] = useState(false);

  function handleClick() {
    setIsPending(true);
    setTimeout(() => setIsPending(false), 1500);
  }

  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      <ActionButton onClick={handleClick} isPending={isPending}>
        Submit
      </ActionButton>
    </div>
  );
}`;
