"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ComponentDate {
  name: string;
  publishedAt: string;
}

interface RepoStats {
  openPRs: number;
  mergedPRs: number;
  openIssues: number;
  closedIssues: number;
  lastUpdate: string;
}

interface ShippingVelocityProps {
  stats: RepoStats;
  componentDates: ComponentDate[];
}

function DesktopTimelineEntry({ component }: { component: ComponentDate }) {
  return (
    <Link
      href={`/docs/components/${component.name
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
      className="group hidden grid-cols-9 items-center md:grid"
    >
      <dl className="col-span-2">
        <dt className="sr-only">Published on</dt>
        <dd className="text-base font-medium text-muted-foreground transition-colors group-hover:text-foreground">
          <time dateTime={component.publishedAt}>
            {new Date(component.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </dd>
      </dl>
      <div className="col-span-7 flex items-center">
        <div className="relative ml-4">
          <div className="h-16 border-l border-border pr-8" />
          <div className="absolute -left-1 top-[1.6875rem] h-2.5 w-2.5 rounded-full bg-primary/60 transition-colors group-hover:bg-primary" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-medium tracking-tight text-muted-foreground transition-colors group-hover:text-foreground">
            {component.name}
          </h3>
          <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80">
            New component added to the library
          </p>
        </div>
      </div>
    </Link>
  );
}

function MobileTimelineEntry({ component }: { component: ComponentDate }) {
  return (
    <Link
      href={`/docs/components/${component.name
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
      className="flex items-center space-x-4 rounded-lg px-4 py-3 transition-colors hover:bg-muted active:bg-muted/80 md:hidden"
    >
      <div className="relative">
        <div className="h-16 border-l border-border" />
        <div className="absolute -left-1 top-5 h-2.5 w-2.5 rounded-full bg-primary/60" />
      </div>
      <div>
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-sm font-medium text-muted-foreground">
            <time dateTime={component.publishedAt}>
              {new Date(component.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </dd>
        </dl>
        <h3 className="text-lg font-medium tracking-tight text-foreground">
          {component.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          New component added to the library
        </p>
      </div>
    </Link>
  );
}

function ComponentTimeline({
  componentDates,
}: {
  componentDates: ComponentDate[];
}) {
  return (
    <div className="mx-5 max-w-2xl md:mx-auto md:translate-x-28">
      <ul className="space-y-8">
        {componentDates
          .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
          .slice(0, 10)
          .map((component) => (
            <li key={component.name}>
              <DesktopTimelineEntry component={component} />
              <MobileTimelineEntry component={component} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export function ShippingVelocityContent({
  stats,
  componentDates,
}: ShippingVelocityProps) {
  return (
    <section className="container relative py-20">
      <div className="mx-auto max-w-md text-center sm:max-w-xl mb-16">
        <h2 className="font-display text-4xl font-extrabold leading-tight sm:text-6xl sm:leading-tight">
          Wanna see some{" "}
          <span className="bg-gradient-to-br from-primary to-primary/60 bg-clip-text italic text-transparent">
            real speed?
          </span>
        </h2>
        <p className="mt-5 text-muted-foreground sm:text-lg">
          Track our journey as we build and ship new components, features, and
          improvements.
        </p>
      </div>

      <ComponentTimeline componentDates={componentDates} />

      <div className="mt-10 flex justify-center">
        <Button
          variant="outline"
          size="lg"
          className="gap-2 rounded-full border-border"
          asChild
        >
          <Link href="/docs/components">View all components</Link>
        </Button>
      </div>
    </section>
  );
}
