"use client";

export default function ExpandableCardPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Project Status Dashboard</h1>
          <p className="text-muted-foreground">
            Track your project progress with our expandable card component
          </p>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Click the card to expand and see more details</p>
        </div>
      </div>
    </div>
  );
}
