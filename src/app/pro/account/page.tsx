import { Suspense } from "react";
import { requireProAccess } from "@/lib/pro/auth/user-actions";
import { constructMetadata } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Calendar, CreditCard, Shield, Mail } from "lucide-react";
import { getUserInitials, getUserDisplayName } from "@/lib/pro/auth/server-utils";

export const metadata = constructMetadata({
  title: "Account - PrismUI Pro",
  description: "Manage your PrismUI Pro account settings and profile information.",
});

function AccountSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 bg-muted animate-pulse rounded" />
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    </div>
  );
}

async function AccountContent() {
  const userProfile = await requireProAccess();

  const subscriptionTier = userProfile.proMembership?.tier || "FREE";
  const subscriptionStatus = userProfile.proMembership?.status || "INACTIVE";
  const isActive = userProfile.proMembership?.isActive || false;
  const purchaseDate = userProfile.proMembership?.purchaseDate;

  const getTierDisplay = (tier: string) => {
    switch (tier) {
      case "PRO_LIFETIME":
        return { label: "Pro Lifetime", variant: "default" as const };
      case "ENTERPRISE_LIFETIME":
        return { label: "Enterprise Lifetime", variant: "secondary" as const };
      default:
        return { label: "Free", variant: "outline" as const };
    }
  };

  const getStatusDisplay = (status: string, isActive: boolean) => {
    if (!isActive) return { label: "Inactive", variant: "destructive" as const };
    switch (status) {
      case "ACTIVE":
        return { label: "Active", variant: "default" as const };
      case "EXPIRED":
        return { label: "Expired", variant: "destructive" as const };
      case "REFUNDED":
        return { label: "Refunded", variant: "outline" as const };
      default:
        return { label: "Unknown", variant: "outline" as const };
    }
  };

  const tierDisplay = getTierDisplay(subscriptionTier);
  const statusDisplay = getStatusDisplay(subscriptionStatus, isActive);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account</h1>
        <p className="text-muted-foreground">
          Manage your account settings and view your subscription details.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Your personal account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={userProfile.image || ""} alt={userProfile.name || ""} />
                <AvatarFallback className="text-lg">
                  {getUserInitials(userProfile)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{getUserDisplayName(userProfile)}</h3>
                <p className="text-sm text-muted-foreground">{userProfile.email}</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                defaultValue={userProfile.name || ""}
                placeholder="Enter your name"
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
            
            <Button disabled className="w-full">
              Update Profile (Coming Soon)
            </Button>
          </CardContent>
        </Card>

        {/* Subscription Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Subscription
            </CardTitle>
            <CardDescription>
              Your current subscription details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Plan</span>
              <Badge variant={tierDisplay.variant}>{tierDisplay.label}</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status</span>
              <Badge variant={statusDisplay.variant}>{statusDisplay.label}</Badge>
            </div>
            
            {purchaseDate && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Purchase Date</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(purchaseDate).toLocaleDateString()}
                </span>
              </div>
            )}
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4" />
                <span>Lifetime access to Pro components</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>Priority email support</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Account Actions
            </CardTitle>
            <CardDescription>
              Manage your account and data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Download Your Data</h4>
              <p className="text-xs text-muted-foreground">
                Export your account data and usage history
              </p>
              <Button variant="outline" size="sm" disabled>
                Export Data (Coming Soon)
              </Button>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-destructive">Danger Zone</h4>
              <p className="text-xs text-muted-foreground">
                Permanently delete your account and all associated data
              </p>
              <Button variant="destructive" size="sm" disabled>
                Delete Account (Coming Soon)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Usage Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Statistics</CardTitle>
            <CardDescription>
              Your PrismUI Pro usage overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                Usage tracking will be available soon
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <div className="container max-w-6xl py-10">
      <Suspense fallback={<AccountSkeleton />}>
        <AccountContent />
      </Suspense>
    </div>
  );
}