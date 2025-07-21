import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { isAuthenticated, hasProAccess } from "@/lib/pro/auth/user-actions";

export async function ProHero() {
  const isAuth = await isAuthenticated();
  const hasPro = await hasProAccess();

  return (
    <section className="relative overflow-hidden">
      <div className="py-20 md:py-36">
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <div>
            <Link
              href="/docs"
              className="hover:bg-foreground/5 mx-auto flex w-fit items-center justify-center gap-2 rounded-md py-0.5 pl-1 pr-3 transition-colors duration-150"
            >
              <div
                aria-hidden
                className="border-background bg-gradient-to-b from-primary to-primary/80 relative flex size-5 items-center justify-center rounded border shadow-md shadow-black/20 ring-1 ring-black/10"
              >
                <div className="absolute inset-x-0 inset-y-1.5 border-y border-dotted border-white/25"></div>
                <div className="absolute inset-x-1.5 inset-y-0 border-x border-dotted border-white/25"></div>
                <Sparkles className="size-3 fill-white stroke-white drop-shadow" />
              </div>
              <span className="font-medium">Introducing PrismUI Pro</span>
            </Link>
            <h1 className="mx-auto mt-8 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Build 10x Faster with{" "}
              <span className="text-primary">PrismUI Pro</span>
            </h1>
            <p className="text-muted-foreground mx-auto my-6 max-w-xl text-balance text-xl">
              Premium React components, exclusive templates, and priority support. 
              Ship professional applications faster than ever.
            </p>

            <div className="flex items-center justify-center gap-3">
              {isAuth && hasPro ? (
                <>
                  <Button asChild size="lg">
                    <Link href="/pro/docs">
                      <span className="text-nowrap">Browse Templates</span>
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/pro/components">
                      <span className="text-nowrap">View Components</span>
                    </Link>
                  </Button>
                </>
              ) : isAuth ? (
                <>
                  <Button asChild size="lg">
                    <Link href="/pro/upgrade">
                      <span className="text-nowrap">Upgrade to Pro</span>
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/pro/docs">
                      <span className="text-nowrap">Browse Docs</span>
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg">
                    <Link href="/pro/login">
                      <span className="text-nowrap">Start Free Trial</span>
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/pro/login">
                      <span className="text-nowrap">Sign In</span>
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}