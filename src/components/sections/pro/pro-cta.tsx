import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ProCTA() {
  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to upgrade your development workflow?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of developers building better UIs with PrismUI Pro.
          </p>
          <div className="mt-10">
            <Button asChild size="lg">
              <Link href="/pro/login">Start your free trial</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}