"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface PaymentButtonProps {
  planType: "INDIVIDUAL_LIFETIME" | "INDIVIDUAL_PREMIUM";
  className?: string;
  variant?: "default" | "outline";
  children: React.ReactNode;
}

export function PaymentButton({
  planType,
  className,
  variant = "default",
  children,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planType }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const { url } = await response.json();
      
      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to start payment process. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading}
      className={className}
      variant={variant}
      size="lg"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        children
      )}
    </Button>
  );
}