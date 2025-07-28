import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { constructMetadata } from "@/lib/utils";
import { getCurrentUser, getUserProfile } from "@/lib/pro/auth/user-actions";
import { stripe } from "@/lib/payments/stripe";
import { redirect } from "next/navigation";

export const metadata = constructMetadata({
  title: "Payment Successful - Welcome to PrismUI Individual License!",
  description: "Your payment was successful. Welcome to PrismUI Individual License!",
});

interface SuccessPageProps {
  searchParams: {
    session_id?: string;
  };
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/pro/login");
  }

  // Get user profile with pro membership information
  const userProfile = await getUserProfile();
  
  let sessionDetails = null;
  
  if (searchParams.session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(
        searchParams.session_id
      );
      sessionDetails = session;
    } catch (error) {
      console.error("Failed to retrieve session:", error);
    }
  }

  // Check if user has pro access based on ProMembership table
  const hasProMembership = userProfile?.hasProAccess || false;
  const membershipTier = userProfile?.proMembership?.tier;
  const membershipType = hasProMembership ? "Pro License" : "Free";

  // Debug logging
  console.log("Success page debug:", {
    userId: user.id,
    userEmail: user.email,
    hasProMembership,
    membershipTier,
    membershipType,
    sessionId: searchParams.session_id,
    proMembership: userProfile?.proMembership
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          {/* Success Icon */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>

          <Card className="border-2 border-green-200 bg-white shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex items-center gap-2 text-green-600">
                <Sparkles className="h-6 w-6" />
                <span className="text-lg font-semibold">Payment Successful!</span>
              </div>
              <CardTitle className="text-3xl font-bold">
                Welcome to PrismUI {membershipType}! 🎉
              </CardTitle>
              <CardDescription className="text-lg">
                Hi {user.name}! Your payment has been processed successfully.
                You now have lifetime access to all premium features.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {sessionDetails && (
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="font-semibold text-gray-900">Payment Details</h3>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p>Amount: ${(sessionDetails.amount_total! / 100).toFixed(2)}</p>
                    <p>Payment ID: {sessionDetails.payment_intent}</p>
                    <p>Date: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">What's next?</h3>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Access all premium components immediately</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Download component source code</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Get priority support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Receive all future updates</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="flex-1">
                  <Link href="/docs/components">
                    Browse Components
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/">
                    Back to Home
                  </Link>
                </Button>
              </div>

              <div className="mt-6 rounded-lg bg-blue-50 p-4">
                <p className="text-sm text-blue-800">
                  <strong>Need help?</strong> Check out our{" "}
                  <Link href="/docs" className="underline">
                    documentation
                  </Link>{" "}
                  or contact our support team.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}