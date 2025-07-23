import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function ProCTA() {
  return (
    <section>
      <div className="py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-base font-semibold text-primary">Get Started</span>
            </div>
            <h2 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
              Ship Faster with <span className="text-muted-foreground">PrismUI Pro</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
              Join thousands of developers building production applications faster. 
              Start your journey with PrismUI Pro today.
            </p>
          </div>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/pro/auth/signup?plan=lifetime">Get Lifetime Access</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pro/docs">Browse Components</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}