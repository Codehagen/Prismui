import { Suspense } from "react";
import { requireProAccess } from "@/lib/pro/auth/user-actions";
import { constructMetadata } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Bell, Palette, Shield, Globe } from "lucide-react";

export const metadata = constructMetadata({
  title: "Settings - PrismUI Pro",
  description: "Manage your PrismUI Pro preferences and account settings.",
});

function SettingsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 bg-muted animate-pulse rounded" />
      <div className="grid gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    </div>
  );
}

async function SettingsContent() {
  const userProfile = await requireProAccess();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and application settings.
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Profile Settings
          </CardTitle>
          <CardDescription>
            Update your personal information and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="display-name">Display Name</Label>
              <Input
                id="display-name"
                defaultValue={userProfile.name || ""}
                placeholder="Enter your display name"
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                defaultValue={userProfile.email || ""}
                disabled
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              placeholder="Tell us about yourself"
              disabled
            />
          </div>

          <Button disabled>
            Save Profile Changes (Coming Soon)
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>
            Configure how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about product updates and announcements
              </p>
            </div>
            <Switch disabled />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about new features and promotions
              </p>
            </div>
            <Switch disabled />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Component Updates</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when new components are released
              </p>
            </div>
            <Switch disabled defaultChecked />
          </div>

          <Button disabled>
            Save Notification Settings (Coming Soon)
          </Button>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>
            Customize your interface appearance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Theme</Label>
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Language</Label>
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Compact Mode</Label>
              <p className="text-sm text-muted-foreground">
                Use a more compact interface layout
              </p>
            </div>
            <Switch disabled />
          </div>

          <Button disabled>
            Save Appearance Settings (Coming Soon)
          </Button>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Security
          </CardTitle>
          <CardDescription>
            Manage your privacy preferences and security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Usage Analytics</Label>
              <p className="text-sm text-muted-foreground">
                Help improve PrismUI by sharing anonymous usage data
              </p>
            </div>
            <Switch disabled defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Public Profile</Label>
              <p className="text-sm text-muted-foreground">
                Allow others to view your public profile information
              </p>
            </div>
            <Switch disabled />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Data Export</Label>
            <p className="text-sm text-muted-foreground">
              Download a copy of your data and usage history
            </p>
            <Button variant="outline" size="sm" disabled>
              Request Data Export (Coming Soon)
            </Button>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label className="text-destructive">Delete Account</Label>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data
            </p>
            <Button variant="destructive" size="sm" disabled>
              Delete Account (Coming Soon)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* API Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            API & Integrations
          </CardTitle>
          <CardDescription>
            Manage API keys and third-party integrations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>API Key</Label>
            <p className="text-sm text-muted-foreground">
              Use this key to access PrismUI Pro components via our CLI
            </p>
            <div className="flex gap-2">
              <Input
                type="password"
                value="pk_••••••••••••••••"
                disabled
                className="font-mono"
              />
              <Button variant="outline" size="sm" disabled>
                Regenerate
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Connected Services</Label>
            <p className="text-sm text-muted-foreground">
              No external services connected
            </p>
            <Button variant="outline" size="sm" disabled>
              Connect Services (Coming Soon)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="container max-w-4xl py-10">
      <Suspense fallback={<SettingsSkeleton />}>
        <SettingsContent />
      </Suspense>
    </div>
  );
}