"use client";

import * as React from "react";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverButton,
} from "@/components/prismui/popover";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  PlusCircle,
  Calendar,
  Bell,
  Command,
  FileText,
  Users,
  Inbox,
  ArrowRight,
  Loader2,
} from "lucide-react";

export default function PopoverCommand() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  const quickActions = [
    {
      category: "Common Actions",
      items: [
        { icon: PlusCircle, label: "New Document", shortcut: "⌘N" },
        { icon: Calendar, label: "Schedule Meeting", shortcut: "⌘K S" },
        { icon: Bell, label: "Notifications", shortcut: "⌘K N", badge: "3" },
      ],
    },
    {
      category: "Tools",
      items: [
        { icon: FileText, label: "All Documents", shortcut: "⌘D" },
        { icon: Users, label: "Team Members", shortcut: "⌘T" },
        { icon: Inbox, label: "Inbox", shortcut: "⌘I", badge: "5" },
      ],
    },
  ];

  return (
    <div className="flex min-h-[350px] w-full items-center justify-center bg-background">
      <PopoverRoot>
        <PopoverTrigger variant="outline" className="min-w-[180px]">
          <div className="flex items-center justify-between gap-2">
            <span>Quick Actions</span>
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              ⌘K
            </kbd>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[440px] p-0">
          <div className="flex items-center gap-2 border-b px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              className="h-8 border-0 bg-transparent p-0 focus-visible:ring-0"
              placeholder="Search actions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          </div>
          <PopoverBody className="p-0">
            {quickActions.map((group, groupIndex) => (
              <div key={group.category}>
                {groupIndex > 0 && <Separator className="my-2" />}
                <div className="p-2">
                  <h4 className="mb-2 px-2 text-sm font-medium text-muted-foreground">
                    {group.category}
                  </h4>
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <PopoverButton
                        key={item.label}
                        onClick={() => console.log(`Clicked: ${item.label}`)}
                        className="relative w-full justify-between px-2 py-1.5 text-sm font-normal"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-4 w-4 text-muted-foreground" />
                          <span>{item.label}</span>
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className="ml-auto h-5 px-1.5 text-xs"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                            {item.shortcut}
                          </kbd>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </PopoverButton>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </PopoverBody>
          <div className="border-t p-2">
            <div className="flex items-center gap-2 rounded-sm bg-muted px-2 py-1.5">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Command className="h-3 w-3" />
                <span>Command Menu</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  ⌘
                </kbd>
                <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  K
                </kbd>
              </div>
            </div>
          </div>
        </PopoverContent>
      </PopoverRoot>
    </div>
  );
}

export const demoSource = `"use client";

import * as React from "react";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverButton,
} from "@/components/prismui/popover";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  PlusCircle,
  Calendar,
  Bell,
  Command,
  FileText,
  Users,
  Inbox,
  ArrowRight,
  Loader2,
} from "lucide-react";

export default function PopoverCommand() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  const quickActions = [
    {
      category: "Common Actions",
      items: [
        { icon: PlusCircle, label: "New Document", shortcut: "⌘N" },
        { icon: Calendar, label: "Schedule Meeting", shortcut: "⌘K S" },
        { icon: Bell, label: "Notifications", shortcut: "⌘K N", badge: "3" },
      ],
    },
    {
      category: "Tools",
      items: [
        { icon: FileText, label: "All Documents", shortcut: "⌘D" },
        { icon: Users, label: "Team Members", shortcut: "⌘T" },
        { icon: Inbox, label: "Inbox", shortcut: "⌘I", badge: "5" },
      ],
    },
  ];

  return (
    <PopoverRoot>
      <PopoverTrigger variant="outline" className="min-w-[180px]">
        <div className="flex items-center justify-between gap-2">
          <span>Quick Actions</span>
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            ⌘K
          </kbd>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[440px] p-0">
        <div className="flex items-center gap-2 border-b px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            className="h-8 border-0 bg-transparent p-0 focus-visible:ring-0"
            placeholder="Search actions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        </div>
        <PopoverBody className="p-0">
          {quickActions.map((group, groupIndex) => (
            <div key={group.category}>
              {groupIndex > 0 && <Separator className="my-2" />}
              <div className="p-2">
                <h4 className="mb-2 px-2 text-sm font-medium text-muted-foreground">
                  {group.category}
                </h4>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <PopoverButton
                      key={item.label}
                      onClick={() => console.log(\`Clicked: \${item.label}\`)}
                      className="relative w-full justify-between px-2 py-1.5 text-sm font-normal"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="ml-auto h-5 px-1.5 text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                          {item.shortcut}
                        </kbd>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </PopoverButton>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </PopoverBody>
        <div className="border-t p-2">
          <div className="flex items-center gap-2 rounded-sm bg-muted px-2 py-1.5">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Command className="h-3 w-3" />
              <span>Command Menu</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1">
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                ⌘
              </kbd>
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                K
              </kbd>
            </div>
          </div>
        </div>
      </PopoverContent>
    </PopoverRoot>
  );
}`;
