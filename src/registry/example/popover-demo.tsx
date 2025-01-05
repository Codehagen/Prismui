"use client";

import * as React from "react";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverForm,
  PopoverLabel,
  PopoverTextarea,
  PopoverFooter,
  PopoverCloseButton,
  PopoverSubmitButton,
  PopoverHeader,
  PopoverBody,
  PopoverButton,
} from "@/components/prismui/popover";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Settings,
  MessageSquare,
  Share,
  Search,
  PlusCircle,
  Calendar,
  Bell,
  Command,
  FileText,
  Inbox,
  Users,
  ArrowRight,
  Loader2,
  Clock,
  Star,
  GitBranch,
  CheckCircle2,
  ArrowUpRight,
  Plus,
} from "lucide-react";

export default function PopoverDemo() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(68);

  // Simulate loading state when searching
  React.useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  // Simulate progress increase
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(80);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-8 p-4">
      <div className="grid w-full max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Menu Example */}
        <Card className="flex flex-col items-center justify-center p-8">
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-semibold">Menu Example</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              A simple menu popover with icons and actions
            </p>
            <PopoverRoot>
              <PopoverTrigger variant="outline">More options</PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>Options</PopoverHeader>
                <PopoverBody>
                  <PopoverButton
                    onClick={() => console.log("Settings clicked")}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </PopoverButton>
                  <PopoverButton onClick={() => console.log("Share clicked")}>
                    <Share className="h-4 w-4" />
                    Share
                  </PopoverButton>
                  <PopoverButton onClick={() => console.log("Message clicked")}>
                    <MessageSquare className="h-4 w-4" />
                    Send Message
                  </PopoverButton>
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
          </div>
        </Card>

        {/* Quick Actions Example */}
        <Card className="flex flex-col items-center justify-center p-8">
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Command palette style popover with search and keyboard shortcuts
            </p>
            <PopoverRoot>
              <PopoverTrigger variant="outline">Quick Actions</PopoverTrigger>
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
                      {groupIndex > 0 && <Separator />}
                      <div className="p-2">
                        <h4 className="mb-2 px-2 text-xs font-medium text-muted-foreground">
                          {group.category}
                        </h4>
                        {group.items.map((item) => (
                          <PopoverButton
                            key={item.label}
                            onClick={() =>
                              console.log(`Clicked: ${item.label}`)
                            }
                            className="relative w-full justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <item.icon className="h-4 w-4" />
                              <span>{item.label}</span>
                              {item.badge && (
                                <Badge
                                  variant="secondary"
                                  className="ml-2 h-5 px-1.5"
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
        </Card>

        {/* Note Taking Example */}
        <Card className="flex flex-col items-center justify-center p-8">
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-semibold">Note Taking</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Form popover with textarea and submit functionality
            </p>
            <PopoverRoot>
              <PopoverTrigger>Add Note</PopoverTrigger>
              <PopoverContent className="h-[200px] w-[364px]">
                <PopoverForm
                  onSubmit={(note) => console.log("Note submitted:", note)}
                >
                  <PopoverLabel>Add Note</PopoverLabel>
                  <PopoverTextarea />
                  <PopoverFooter>
                    <PopoverCloseButton />
                    <PopoverSubmitButton>Submit Note</PopoverSubmitButton>
                  </PopoverFooter>
                </PopoverForm>
              </PopoverContent>
            </PopoverRoot>
          </div>
        </Card>

        {/* Project Status Example */}
        <Card className="flex flex-col items-center justify-center p-8">
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-semibold">Project Status</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Rich project status display with progress and team members
            </p>
            <PopoverRoot>
              <PopoverTrigger variant="secondary">
                PrismUI Project
              </PopoverTrigger>
              <PopoverContent className="w-[400px]">
                <PopoverHeader className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Badge
                      variant="secondary"
                      className={
                        progress >= 80
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      }
                    >
                      {progress >= 80 ? "Almost Done" : "In Progress"}
                    </Badge>
                    <h3 className="text-lg font-semibold">PrismUI Project</h3>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Open in GitHub</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </PopoverHeader>
                <PopoverBody className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Sprint Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between rounded-md bg-muted p-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Due Jan 15, 2024</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>123</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitBranch className="h-4 w-4 text-muted-foreground" />
                        <span>12</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        Team Members
                      </h4>
                      <Button variant="ghost" size="sm" className="h-7">
                        <Plus className="h-3 w-3 mr-1" />
                        Invite
                      </Button>
                    </div>
                    <div className="flex -space-x-2">
                      {[
                        { name: "Alex", role: "Lead" },
                        { name: "Brian", role: "Design" },
                        { name: "Carol", role: "Dev" },
                        { name: "David", role: "Dev" },
                      ].map((member, index) => (
                        <TooltipProvider key={index}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Avatar className="border-2 border-background">
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  {member.name[0]}
                                </AvatarFallback>
                              </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {member.role}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Recent Updates</h4>
                    <div className="space-y-2">
                      {[
                        { title: "UI Components", done: true },
                        { title: "Documentation", done: true },
                        { title: "Testing", done: false },
                      ].map((task, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2 text-sm"
                        >
                          <span
                            className={
                              task.done
                                ? "text-muted-foreground line-through"
                                : "text-muted-foreground"
                            }
                          >
                            {task.title}
                          </span>
                          {task.done && (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverBody>
                <PopoverFooter>
                  <PopoverCloseButton />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Discuss
                    </Button>
                    <Button variant="default" size="sm">
                      View Project
                    </Button>
                  </div>
                </PopoverFooter>
              </PopoverContent>
            </PopoverRoot>
          </div>
        </Card>
      </div>
    </div>
  );
}

export const demoSource = `"use client";

// Full source code available in the documentation
// This is a complex example showcasing different use cases of the Popover component
// Including menu popovers, quick action popovers, and project status popovers
`;
