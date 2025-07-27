import { Suspense } from "react";
import { requireProAccess } from "@/lib/pro/auth/user-actions";
import { constructMetadata } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Download, Receipt, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const metadata = constructMetadata({
  title: "Billing - PrismUI Pro",
  description: "Manage your PrismUI Pro billing and subscription details.",
});

function BillingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 bg-muted animate-pulse rounded" />
      <div className="grid gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    </div>
  );
}

async function BillingContent() {
  const userProfile = await requireProAccess();

  const subscriptionTier = userProfile.proMembership?.tier || "FREE";
  const subscriptionStatus = userProfile.proMembership?.status || "INACTIVE";
  const isActive = userProfile.proMembership?.isActive || false;
  const purchaseDate = userProfile.proMembership?.purchaseDate;

  const getTierDisplay = (tier: string) => {
    switch (tier) {
      case "PRO_LIFETIME":
        return { label: "Pro Lifetime", variant: "default" as const, price: "$299" };
      case "ENTERPRISE_LIFETIME":
        return { label: "Enterprise Lifetime", variant: "secondary" as const, price: "$599" };
      default:
        return { label: "Free", variant: "outline" as const, price: "$0" };
    }
  };

  const tierDisplay = getTierDisplay(subscriptionTier);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground">
          Manage your subscription, view invoices, and update payment methods.
        </p>
      </div>

      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Current Subscription
          </CardTitle>
          <CardDescription>
            Your active PrismUI Pro subscription details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{tierDisplay.label}</h3>
              <p className="text-sm text-muted-foreground">
                {subscriptionTier === "PRO_LIFETIME" || subscriptionTier === "ENTERPRISE_LIFETIME"
                  ? "One-time payment • Lifetime access"
                  : "Free tier"}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{tierDisplay.price}</div>
              <Badge variant={tierDisplay.variant} className="mt-1">
                {isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>

          {purchaseDate && (
            <>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Purchase Date</span>
                <span>{new Date(purchaseDate).toLocaleDateString()}</span>
              </div>
            </>
          )}

          <Separator />

          <div className="space-y-2">
            <h4 className="font-medium">What's included:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Unlimited Pro component access</li>
              <li>• All future updates included</li>
              <li>• Priority email support</li>
              <li>• Commercial license for unlimited projects</li>
              {subscriptionTier === "ENTERPRISE_LIFETIME" && (
                <>
                  <li>• Advanced analytics components</li>
                  <li>• Enterprise-grade templates</li>
                  <li>• Dedicated support channel</li>
                </>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Billing Information
          </CardTitle>
          <CardDescription>
            Your payment history and invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isActive ? (
            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Your Pro subscription is a lifetime purchase. No recurring billing required.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <h4 className="font-medium">Payment History</h4>
                <div className="rounded-lg border">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{tierDisplay.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {purchaseDate ? new Date(purchaseDate).toLocaleDateString() : "N/A"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{tierDisplay.price}</p>
                        <Badge variant="outline" className="text-xs">
                          Completed
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice (Coming Soon)
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No billing history available</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>
            Manage your saved payment methods
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Since Pro is a lifetime purchase, no payment method is stored.
            </p>
            <p className="text-sm text-muted-foreground">
              For future purchases or upgrades, you'll be able to add payment methods here.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>
            Get support with billing questions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            If you have any questions about your subscription or billing, our support team is here to help.
          </p>
          <Button variant="outline" size="sm" disabled>
            Contact Support (Coming Soon)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function BillingPage() {
  return (
    <div className="container max-w-4xl py-10">
      <Suspense fallback={<BillingSkeleton />}>
        <BillingContent />
      </Suspense>
    </div>
  );
}