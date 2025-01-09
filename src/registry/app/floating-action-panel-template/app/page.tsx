"use client";

import {
  FloatingActionPanelRoot,
  FloatingActionPanelTrigger,
  FloatingActionPanelContent,
  FloatingActionPanelButton,
} from "./component/floating-action-panel";
import { Plus, Upload, Palette, Share2, BookMarked } from "lucide-react";

export default function FloatingActionPanelPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 gap-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Floating Action Panel
        </h1>
        <p className="text-muted-foreground">
          A floating panel component for contextual actions and menus.
        </p>
      </div>

      <div className="w-full max-w-md flex justify-center">
        <FloatingActionPanelRoot>
          {() => (
            <>
              <FloatingActionPanelTrigger title="Actions" mode="actions">
                <Plus className="mr-2 h-4 w-4" />
                <span>Actions</span>
              </FloatingActionPanelTrigger>

              <FloatingActionPanelContent className="w-[200px] p-2">
                <FloatingActionPanelButton>
                  <Upload className="h-4 w-4" />
                  <span>Upload</span>
                </FloatingActionPanelButton>
                <FloatingActionPanelButton>
                  <Palette className="h-4 w-4" />
                  <span>Theme</span>
                </FloatingActionPanelButton>
                <FloatingActionPanelButton>
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </FloatingActionPanelButton>
                <FloatingActionPanelButton>
                  <BookMarked className="h-4 w-4" />
                  <span>Bookmark</span>
                </FloatingActionPanelButton>
              </FloatingActionPanelContent>
            </>
          )}
        </FloatingActionPanelRoot>
      </div>
    </div>
  );
}
