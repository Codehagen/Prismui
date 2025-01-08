"use client";

import { MessageSquare } from "lucide-react";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverButton,
  PopoverFooter,
  PopoverCloseButton,
} from "./component/popover";

export default function PopoverPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 gap-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Popover</h1>
        <p className="text-muted-foreground">
          A beautiful animated popover component with smooth transitions.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <PopoverRoot>
          <PopoverTrigger>
            <MessageSquare className="h-4 w-4 mr-2" />
            Open Popover
          </PopoverTrigger>
          <PopoverContent className="w-[300px]">
            <PopoverHeader>Messages</PopoverHeader>
            <PopoverBody>
              <PopoverButton>
                <MessageSquare className="h-4 w-4" />
                New Message
              </PopoverButton>
              <PopoverButton>
                <MessageSquare className="h-4 w-4" />
                View All
              </PopoverButton>
            </PopoverBody>
            <PopoverFooter>
              <span className="text-sm text-muted-foreground">
                2 unread messages
              </span>
              <PopoverCloseButton />
            </PopoverFooter>
          </PopoverContent>
        </PopoverRoot>
      </div>
    </div>
  );
}
