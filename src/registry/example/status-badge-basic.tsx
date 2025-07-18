"use client";

import StatusBadge from "@/components/prismui/status-badge";

export default function StatusBadgeBasic() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      <StatusBadge status="completed" label="Project Complete" />
    </div>
  );
}

export const demoSource = `"use client";

import StatusBadge from "@/components/prismui/status-badge";

export default function StatusBadgeBasic() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      <StatusBadge status="completed" label="Project Complete" />
    </div>
  );
}`;