import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ProCTA() {
  return (
    <section>
      <div className="py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="space-y-6 text-center">
            <h2 className="text-foreground text-balance text-3xl font-semibold lg:text-4xl">
              Ship Faster with PrismUI Pro
            </h2>
            <div className="flex justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/pro/auth/signup?plan=lifetime">Get Lifetime Access</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pro/docs">Browse Components</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}