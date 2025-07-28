import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Payment Cancelled - PrismUI Individual License",
  description: "Your payment was cancelled. You can try again anytime.",
});

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red/5 to-red/10">
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          {/* Cancel Icon */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>

          <Card className="border-2 border-red-200 bg-white shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-red-600">
                Payment Cancelled
              </CardTitle>
              <CardDescription className="text-lg">
                Your payment was cancelled. No charges were made to your account.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">What happened?</h3>
                <p className="text-muted-foreground">
                  You cancelled the payment process before completing your purchase.
                  Your card was not charged and no subscription was created.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Want to try again?</h3>
                <p className="text-muted-foreground">
                  You can return to the upgrade page and complete your purchase anytime.
                  Your lifetime access is just one click away!
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="flex-1">
                  <Link href="/pro/upgrade">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>

              <div className="mt-6 rounded-lg bg-blue-50 p-4">
                <p className="text-sm text-blue-800">
                  <strong>Questions about pricing?</strong> Check out our{" "}
                  <Link href="/pro/upgrade#faq" className="underline">
                    FAQ section
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