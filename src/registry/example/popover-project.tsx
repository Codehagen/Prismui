"use client";

import * as React from "react";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
} from "@/components/prismui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  MessageSquare,
  Clock,
  Star,
  GitBranch,
  CheckCircle2,
  ArrowUpRight,
  Plus,
  Users,
} from "lucide-react";

export default function PopoverProject() {
  const [progress, setProgress] = React.useState(68);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(80);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      <PopoverRoot>
        <PopoverTrigger variant="secondary">PrismUI Project</PopoverTrigger>
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
  );
}

export const demoSource = `"use client";

import * as React from "react";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
} from "@/components/prismui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  MessageSquare,
  Clock,
  Star,
  GitBranch,
  CheckCircle2,
  ArrowUpRight,
  Plus,
  Users,
} from "lucide-react";

export default function PopoverProject() {
  const [progress, setProgress] = React.useState(68);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(80);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PopoverRoot>
      <PopoverTrigger variant="secondary">PrismUI Project</PopoverTrigger>
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
  );
}`;
