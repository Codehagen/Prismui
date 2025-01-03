"use client";

import DisplayCards from "@/components/prismui/display-cards";

export default function DisplayCardsBasic() {
  return (
    <div className="flex min-h-[600px] w-full items-center justify-center py-20">
      <div className="w-full max-w-3xl">
        <DisplayCards />
      </div>
    </div>
  );
}

export const demoSource = `"use client";

import DisplayCards from "@/components/prismui/display-cards";

export default function DisplayCardsBasic() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center py-20">
      <div className="w-full max-w-3xl">
        <DisplayCards />
      </div>
    </div>
  );
}`;
