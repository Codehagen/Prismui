"use client";

import { useState } from "react";
import EnhancedButton from "@/components/prismui/enhanced-button";

export default function EnhancedButtonBasic() {
  const [isLoading, setIsLoading] = useState(false);

  function handleClick() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }

  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      <EnhancedButton
        onClick={handleClick}
        isLoading={isLoading}
        loadingText="Processing..."
      >
        Click Me
      </EnhancedButton>
    </div>
  );
}

export const demoSource = `"use client";

import { useState } from "react";
import EnhancedButton from "@/components/prismui/enhanced-button";

export default function EnhancedButtonBasic() {
  const [isLoading, setIsLoading] = useState(false);

  function handleClick() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }

  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      <EnhancedButton
        onClick={handleClick}
        isLoading={isLoading}
        loadingText="Processing..."
      >
        Click Me
      </EnhancedButton>
    </div>
  );
}`;