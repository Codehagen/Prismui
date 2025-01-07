"use client";

import { OpenInV0Form } from "@/components/open-in-v0-form";

export default function ExpandableCardBlockTest() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Expandable Card Block Test</h1>
        <OpenInV0Form name="expandable-card-block" />
      </div>
      <div className="border rounded-lg p-4">
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Project Status</h2>
            <p className="text-muted-foreground">
              Track your project progress with our expandable card component.
            </p>
          </div>
          <div className="grid gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="expandable-card group relative overflow-hidden rounded-lg border bg-background p-6 shadow-md transition-all hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-semibold">Project {i + 1}</h3>
                    <p className="text-sm text-muted-foreground">
                      Project description and details go here. Click to expand
                      and see more information.
                    </p>
                  </div>
                  <button className="rounded-full p-2 hover:bg-accent">
                    <svg
                      className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>
                <div className="mt-4 grid gap-4">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{
                            width: `${(i + 1) * 25}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {(i + 1) * 25}%
                      </span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Tasks</span>
                      <span className="text-sm text-muted-foreground">
                        {(i + 1) * 5}/20
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Due Date</span>
                      <span className="text-sm text-muted-foreground">
                        Dec {15 + i}, 2023
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
