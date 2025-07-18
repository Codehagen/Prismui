"use client";

import StatusBadge from "@/components/prismui/status-badge";
import { Card } from "@/components/ui/card";

export default function StatusBadgeDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-4">
      <Card className="w-full max-w-3xl p-6">
        <div className="space-y-8">
          {/* All Status Types */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Status Types</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">Completed</span>
                <StatusBadge status="completed" label="Task Complete" />
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">In Progress</span>
                <StatusBadge status="in-progress" label="Working on it" />
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">Pending</span>
                <StatusBadge status="pending" label="Waiting" />
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">Delayed</span>
                <StatusBadge status="delayed" label="Behind Schedule" />
              </div>
            </div>
          </div>

          {/* Animation States */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Animation Control</h3>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">Animated</span>
                <StatusBadge status="in-progress" label="Processing" animated={true} />
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">Static</span>
                <StatusBadge status="in-progress" label="Processing" animated={false} />
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Common Use Cases</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex flex-col">
                  <span className="font-medium">Database Migration</span>
                  <span className="text-sm text-muted-foreground">Migrating user data to new schema</span>
                </div>
                <StatusBadge status="in-progress" label="Running" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex flex-col">
                  <span className="font-medium">API Integration</span>
                  <span className="text-sm text-muted-foreground">Third-party service integration</span>
                </div>
                <StatusBadge status="completed" label="Live" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex flex-col">
                  <span className="font-medium">Security Audit</span>
                  <span className="text-sm text-muted-foreground">Quarterly security review</span>
                </div>
                <StatusBadge status="delayed" label="Overdue" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex flex-col">
                  <span className="font-medium">Feature Release</span>
                  <span className="text-sm text-muted-foreground">New dashboard components</span>
                </div>
                <StatusBadge status="pending" label="Scheduled" />
              </div>
            </div>
          </div>

          {/* Custom Styling */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Custom Styling</h3>
            <div className="flex flex-wrap items-center gap-4">
              <StatusBadge 
                status="completed" 
                label="Success" 
                className="shadow-lg"
              />
              <StatusBadge 
                status="in-progress" 
                label="Loading" 
                className="border-2 border-blue-300"
              />
              <StatusBadge 
                status="delayed" 
                label="Alert" 
                className="ring-2 ring-red-200"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export const demoSource = `"use client";

import StatusBadge from "@/components/prismui/status-badge";
import { Card } from "@/components/ui/card";

export default function StatusBadgeDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-4">
      <Card className="w-full max-w-3xl p-6">
        <div className="space-y-8">
          {/* All Status Types */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Status Types</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">Completed</span>
                <StatusBadge status="completed" label="Task Complete" />
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">In Progress</span>
                <StatusBadge status="in-progress" label="Working on it" />
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">Pending</span>
                <StatusBadge status="pending" label="Waiting" />
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">Delayed</span>
                <StatusBadge status="delayed" label="Behind Schedule" />
              </div>
            </div>
          </div>

          {/* Animation States */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Animation Control</h3>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">Animated</span>
                <StatusBadge status="in-progress" label="Processing" animated={true} />
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">Static</span>
                <StatusBadge status="in-progress" label="Processing" animated={false} />
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Common Use Cases</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex flex-col">
                  <span className="font-medium">Database Migration</span>
                  <span className="text-sm text-muted-foreground">Migrating user data to new schema</span>
                </div>
                <StatusBadge status="in-progress" label="Running" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex flex-col">
                  <span className="font-medium">API Integration</span>
                  <span className="text-sm text-muted-foreground">Third-party service integration</span>
                </div>
                <StatusBadge status="completed" label="Live" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex flex-col">
                  <span className="font-medium">Security Audit</span>
                  <span className="text-sm text-muted-foreground">Quarterly security review</span>
                </div>
                <StatusBadge status="delayed" label="Overdue" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex flex-col">
                  <span className="font-medium">Feature Release</span>
                  <span className="text-sm text-muted-foreground">New dashboard components</span>
                </div>
                <StatusBadge status="pending" label="Scheduled" />
              </div>
            </div>
          </div>

          {/* Custom Styling */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Custom Styling</h3>
            <div className="flex flex-wrap items-center gap-4">
              <StatusBadge 
                status="completed" 
                label="Success" 
                className="shadow-lg"
              />
              <StatusBadge 
                status="in-progress" 
                label="Loading" 
                className="border-2 border-blue-300"
              />
              <StatusBadge 
                status="delayed" 
                label="Alert" 
                className="ring-2 ring-red-200"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}`;