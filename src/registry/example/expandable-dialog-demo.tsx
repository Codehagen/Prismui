"use client";

import * as React from "react";
import {
  ExpandableDialogRoot,
  ExpandableDialogTrigger,
  ExpandableDialogContent,
  ExpandableDialogHeader,
  ExpandableDialogBody,
  ExpandableDialogFooter,
} from "@/components/prismui/expandable-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Share2,
  User,
} from "lucide-react";

export default function ExpandableDialogDemo() {
  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-8">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Project Details Dialog */}
        <div className="flex flex-col items-center justify-center rounded-lg border p-8">
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-semibold">Project Details</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              An expandable dialog for viewing and editing project details
            </p>
            <ExpandableDialogRoot>
              <ExpandableDialogTrigger>
                <Button variant="outline">View Project</Button>
              </ExpandableDialogTrigger>
              <ExpandableDialogContent className="max-h-[85vh]">
                <ExpandableDialogHeader>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">In Progress</Badge>
                    <h2 className="text-lg font-semibold">
                      PrismUI Development
                    </h2>
                  </div>
                </ExpandableDialogHeader>
                <ExpandableDialogBody>
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-4 lg:col-span-2">
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          className="min-h-[150px] resize-none"
                          placeholder="Enter project description..."
                          defaultValue="PrismUI is a modern React component library built with TypeScript, Tailwind CSS, and Framer Motion. It provides a collection of beautiful, accessible, and customizable components."
                        />
                      </div>
                      <div className="space-y-4">
                        <Label>Team Members</Label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { name: "Alex", role: "Lead" },
                            { name: "Sarah", role: "Design" },
                            { name: "Mike", role: "Dev" },
                          ].map((member, index) => (
                            <div
                              key={member.name}
                              className="flex items-center gap-2 rounded-lg border p-2"
                            >
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {member.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="text-sm">
                                <p className="font-medium">{member.name}</p>
                                <p className="text-muted-foreground">
                                  {member.role}
                                </p>
                              </div>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            className="h-[52px] gap-2"
                            size="sm"
                          >
                            <Plus className="h-4 w-4" />
                            Add Member
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="mb-2 font-medium">Project Stats</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Status
                            </span>
                            <Badge variant="secondary">In Progress</Badge>
                          </div>
                          <Separator />
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Due Date
                            </span>
                            <span>Dec 31, 2024</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Team</span>
                            <span>4 Members</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tasks</span>
                            <span>12 / 20</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Recent Activity</h3>
                          <Button variant="ghost" size="sm">
                            View All
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {[
                            {
                              user: "Alex",
                              action: "updated the project status",
                              time: "2h ago",
                            },
                            {
                              user: "Sarah",
                              action: "added new design files",
                              time: "5h ago",
                            },
                            {
                              user: "Mike",
                              action: "completed 3 tasks",
                              time: "1d ago",
                            },
                          ].map((activity, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm"
                            >
                              <span className="font-medium">
                                {activity.user}
                              </span>
                              <span className="text-muted-foreground">
                                {activity.action}
                              </span>
                              <span className="ml-auto text-xs text-muted-foreground">
                                {activity.time}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ExpandableDialogBody>
                <ExpandableDialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </ExpandableDialogFooter>
              </ExpandableDialogContent>
            </ExpandableDialogRoot>
          </div>
        </div>

        {/* Quick Note Dialog */}
        <div className="flex flex-col items-center justify-center rounded-lg border p-8">
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-semibold">Quick Note</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              A simple dialog for taking quick notes
            </p>
            <ExpandableDialogRoot>
              <ExpandableDialogTrigger>
                <Button>Add Note</Button>
              </ExpandableDialogTrigger>
              <ExpandableDialogContent>
                <ExpandableDialogHeader>
                  <h2 className="text-lg font-semibold">New Note</h2>
                </ExpandableDialogHeader>
                <ExpandableDialogBody>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" placeholder="Enter note title..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        placeholder="Write your note..."
                        className="min-h-[200px]"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Created on {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </ExpandableDialogBody>
                <ExpandableDialogFooter>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Note</Button>
                    </div>
                  </div>
                </ExpandableDialogFooter>
              </ExpandableDialogContent>
            </ExpandableDialogRoot>
          </div>
        </div>
      </div>
    </div>
  );
}

export const demoSource = `"use client";

import {
  ExpandableDialogRoot,
  ExpandableDialogTrigger,
  ExpandableDialogContent,
  ExpandableDialogHeader,
  ExpandableDialogBody,
  ExpandableDialogFooter,
} from "@/components/prismui/expandable-dialog";
import { Button } from "@/components/ui/button";

export default function ExpandableDialogDemo() {
  return (
    <ExpandableDialogRoot>
      <ExpandableDialogTrigger>
        <Button>Open Dialog</Button>
      </ExpandableDialogTrigger>
      <ExpandableDialogContent>
        <ExpandableDialogHeader>
          <h2 className="text-lg font-semibold">Dialog Title</h2>
        </ExpandableDialogHeader>
        <ExpandableDialogBody>
          <p>Dialog content goes here...</p>
        </ExpandableDialogBody>
        <ExpandableDialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </ExpandableDialogFooter>
      </ExpandableDialogContent>
    </ExpandableDialogRoot>
  );
}`;
