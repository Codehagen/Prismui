"use client";

import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverButton,
} from "@/components/prismui/popover";
import { Settings, Share, MessageSquare } from "lucide-react";

export default function PopoverMenu() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      <PopoverRoot>
        <PopoverTrigger variant="outline">More options</PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>Options</PopoverHeader>
          <PopoverBody>
            <PopoverButton onClick={() => console.log("Settings clicked")}>
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
  );
}

export const demoSource = `"use client";

import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverButton,
} from "@/components/prismui/popover";
import { Settings, Share, MessageSquare } from "lucide-react";

export default function PopoverMenu() {
  return (
    <PopoverRoot>
      <PopoverTrigger variant="outline">More options</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Options</PopoverHeader>
        <PopoverBody>
          <PopoverButton onClick={() => console.log("Settings clicked")}>
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
  );
}`;
