"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { DocsConfig } from "@/config/docs";
import { SidebarNavItem } from "@/types/nav";
import { Badge } from "@/components/ui/badge";

export function DocsNav({ config }: { config: DocsConfig }) {
  const pathname = usePathname();

  const items = config.sidebarNav;

  return items.length ? (
    <div className="flex flex-col gap-6">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-1">
          <h4 className="rounded-md px-1 py-1 text-sm font-semibold">
            {item.title}
          </h4>
          {item?.items?.length && (
            <DocsNavItems items={item.items} pathname={pathname} />
          )}
        </div>
      ))}
    </div>
  ) : null;
}

function DocsNavItems({
  items,
  pathname,
}: {
  items: SidebarNavItem[];
  pathname: string | null;
}) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max gap-0.5 text-sm">
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "group flex h-8 w-full items-center justify-between rounded-lg px-1 font-normal text-foreground underline-offset-2 hover:bg-accent hover:text-accent-foreground",
              item.disabled && "cursor-not-allowed opacity-60",
              pathname === item.href &&
                "bg-accent font-medium text-accent-foreground"
            )}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            <span>{item.title}</span>
            <div className="flex items-center gap-1.5">
              {item.isNew && <Badge variant="new">New</Badge>}
              {item.isPro && <Badge variant="pro">Pro</Badge>}
            </div>
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              "flex w-full cursor-not-allowed items-center rounded-md px-1 py-2 text-muted-foreground hover:underline",
              item.disabled && "cursor-not-allowed opacity-60"
            )}
          >
            <span>{item.title}</span>
            <div className="flex items-center gap-1.5">
              {item.isNew && <Badge variant="new">New</Badge>}
              {item.isPro && <Badge variant="pro">Pro</Badge>}
            </div>
          </span>
        )
      )}
    </div>
  ) : null;
}
