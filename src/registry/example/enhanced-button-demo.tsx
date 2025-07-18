"use client";

import { useState } from "react";
import EnhancedButton from "@/components/prismui/enhanced-button";
import { Card } from "@/components/ui/card";
import { Heart, Download, Send, Settings, Trash2 } from "lucide-react";

export default function EnhancedButtonDemo() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  function handleClick(id: string) {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  }

  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-6">
        <div className="space-y-8">
          {/* Variants */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Variants</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">Primary</span>
                <EnhancedButton
                  variant="primary"
                  onClick={() => handleClick("primary")}
                  isLoading={loadingStates["primary"]}
                  loadingText="Saving..."
                >
                  Save
                </EnhancedButton>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">Secondary</span>
                <EnhancedButton
                  variant="secondary"
                  onClick={() => handleClick("secondary")}
                  isLoading={loadingStates["secondary"]}
                  loadingText="Loading..."
                >
                  Load Data
                </EnhancedButton>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">Outline</span>
                <EnhancedButton
                  variant="outline"
                  onClick={() => handleClick("outline")}
                  isLoading={loadingStates["outline"]}
                  loadingText="Downloading..."
                >
                  Download
                </EnhancedButton>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">Ghost</span>
                <EnhancedButton
                  variant="ghost"
                  onClick={() => handleClick("ghost")}
                  isLoading={loadingStates["ghost"]}
                  loadingText="Deleting..."
                >
                  Delete
                </EnhancedButton>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <EnhancedButton
                size="sm"
                onClick={() => handleClick("small")}
                isLoading={loadingStates["small"]}
                icon={<Heart className="w-3 h-3" />}
              >
                Small
              </EnhancedButton>
              <EnhancedButton
                size="md"
                onClick={() => handleClick("medium")}
                isLoading={loadingStates["medium"]}
                icon={<Download className="w-4 h-4" />}
              >
                Medium
              </EnhancedButton>
              <EnhancedButton
                size="lg"
                onClick={() => handleClick("large")}
                isLoading={loadingStates["large"]}
                icon={<Send className="w-5 h-5" />}
              >
                Large
              </EnhancedButton>
            </div>
          </div>

          {/* With Icons */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Icons</h3>
            <div className="flex flex-wrap items-center gap-4">
              <EnhancedButton
                onClick={() => handleClick("icon-left")}
                isLoading={loadingStates["icon-left"]}
                icon={<Heart className="w-4 h-4" />}
                iconPosition="left"
              >
                Like
              </EnhancedButton>
              <EnhancedButton
                onClick={() => handleClick("icon-right")}
                isLoading={loadingStates["icon-right"]}
                icon={<Settings className="w-4 h-4" />}
                iconPosition="right"
              >
                Settings
              </EnhancedButton>
              <EnhancedButton
                variant="outline"
                onClick={() => handleClick("icon-outline")}
                isLoading={loadingStates["icon-outline"]}
                icon={<Trash2 className="w-4 h-4" />}
                iconPosition="left"
              >
                Remove
              </EnhancedButton>
            </div>
          </div>

          {/* Loading States */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Loading States</h3>
            <div className="flex flex-wrap items-center gap-4">
              <EnhancedButton
                onClick={() => handleClick("loading-1")}
                isLoading={loadingStates["loading-1"]}
                loadingText="Processing..."
              >
                Process
              </EnhancedButton>
              <EnhancedButton
                variant="outline"
                onClick={() => handleClick("loading-2")}
                isLoading={loadingStates["loading-2"]}
                loadingText="Uploading..."
                icon={<Send className="w-4 h-4" />}
              >
                Upload
              </EnhancedButton>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export const demoSource = `"use client";

import { useState } from "react";
import EnhancedButton from "@/components/prismui/enhanced-button";
import { Card } from "@/components/ui/card";
import { Heart, Download, Send, Settings, Trash2 } from "lucide-react";

export default function EnhancedButtonDemo() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  function handleClick(id: string) {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  }

  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-6">
        <div className="space-y-8">
          {/* Variants */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Variants</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">Primary</span>
                <EnhancedButton
                  variant="primary"
                  onClick={() => handleClick("primary")}
                  isLoading={loadingStates["primary"]}
                  loadingText="Saving..."
                >
                  Save
                </EnhancedButton>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">Secondary</span>
                <EnhancedButton
                  variant="secondary"
                  onClick={() => handleClick("secondary")}
                  isLoading={loadingStates["secondary"]}
                  loadingText="Loading..."
                >
                  Load Data
                </EnhancedButton>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">Outline</span>
                <EnhancedButton
                  variant="outline"
                  onClick={() => handleClick("outline")}
                  isLoading={loadingStates["outline"]}
                  loadingText="Downloading..."
                >
                  Download
                </EnhancedButton>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">Ghost</span>
                <EnhancedButton
                  variant="ghost"
                  onClick={() => handleClick("ghost")}
                  isLoading={loadingStates["ghost"]}
                  loadingText="Deleting..."
                >
                  Delete
                </EnhancedButton>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <EnhancedButton
                size="sm"
                onClick={() => handleClick("small")}
                isLoading={loadingStates["small"]}
                icon={<Heart className="w-3 h-3" />}
              >
                Small
              </EnhancedButton>
              <EnhancedButton
                size="md"
                onClick={() => handleClick("medium")}
                isLoading={loadingStates["medium"]}
                icon={<Download className="w-4 h-4" />}
              >
                Medium
              </EnhancedButton>
              <EnhancedButton
                size="lg"
                onClick={() => handleClick("large")}
                isLoading={loadingStates["large"]}
                icon={<Send className="w-5 h-5" />}
              >
                Large
              </EnhancedButton>
            </div>
          </div>

          {/* With Icons */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Icons</h3>
            <div className="flex flex-wrap items-center gap-4">
              <EnhancedButton
                onClick={() => handleClick("icon-left")}
                isLoading={loadingStates["icon-left"]}
                icon={<Heart className="w-4 h-4" />}
                iconPosition="left"
              >
                Like
              </EnhancedButton>
              <EnhancedButton
                onClick={() => handleClick("icon-right")}
                isLoading={loadingStates["icon-right"]}
                icon={<Settings className="w-4 h-4" />}
                iconPosition="right"
              >
                Settings
              </EnhancedButton>
              <EnhancedButton
                variant="outline"
                onClick={() => handleClick("icon-outline")}
                isLoading={loadingStates["icon-outline"]}
                icon={<Trash2 className="w-4 h-4" />}
                iconPosition="left"
              >
                Remove
              </EnhancedButton>
            </div>
          </div>

          {/* Loading States */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Loading States</h3>
            <div className="flex flex-wrap items-center gap-4">
              <EnhancedButton
                onClick={() => handleClick("loading-1")}
                isLoading={loadingStates["loading-1"]}
                loadingText="Processing..."
              >
                Process
              </EnhancedButton>
              <EnhancedButton
                variant="outline"
                onClick={() => handleClick("loading-2")}
                isLoading={loadingStates["loading-2"]}
                loadingText="Uploading..."
                icon={<Send className="w-4 h-4" />}
              >
                Upload
              </EnhancedButton>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}`;